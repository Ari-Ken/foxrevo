import { NextResponse } from 'next/server';
import { createClient } from '../../../utils/supabase/server';
import { supabaseAdmin } from '../../../utils/supabaseAdmin';

export async function POST(req) {
  try {
    let email = '';
    let full_name = '';
    let type = 'exam'; // default

    // Check if the request has a payload (JSON body)
    try {
      const body = await req.json();
      email = body?.email?.toLowerCase()?.trim();
      full_name = body?.fullName?.trim();
      type = body?.type || 'exam';
    } catch (e) {
      // Body is empty or not JSON, which is normal for standard session flow
    }

    if (!email) {
      const supabase = createClient();
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        return NextResponse.json(
          { error: 'You must be logged in to proceed to payment.' },
          { status: 401 }
        );
      }
      email = user.email.toLowerCase();
      full_name = user.user_metadata?.full_name || 'Candidate';
    }

    // Fetch candidate details
    const { data: existing } = await supabaseAdmin
      .from('candidates')
      .select('*')
      .eq('email', email)
      .single();

    // Guard checks based on payment type
    let amount = 3000;
    let title = 'FoxRevo Entrance Examination Fee';
    let description = 'Non-refundable fee for The Wealth Revolution entrance exam';
    let txRefPrefix = 'foxrevo_exam';

    if (type === 'certificate') {
      const isQualified = 
        existing && 
        existing.passed_exam && 
        existing.part1_passed && 
        existing.part2_passed && 
        existing.part3_passed;

      if (!isQualified) {
        return NextResponse.json(
          { error: 'You must pass all academy assessments before paying for the certificate.' },
          { status: 400 }
        );
      }

      if (existing?.cert_paid === true) {
        return NextResponse.json(
          { error: 'Your certificate fee has already been paid.' },
          { status: 400 }
        );
      }

      amount = 1000;
      title = 'FoxRevo Certificate Processing Fee';
      description = 'Processing fee to print and download your graduation certificate';
      txRefPrefix = 'foxrevo_cert';
    } else {
      // Default: 'exam' (entrance or retake)
      const isFailedAttempts = existing && existing.exam_attempts >= 2 && !existing.passed_exam;
      
      if (existing?.payment_status === true && !isFailedAttempts) {
        return NextResponse.json(
          { error: 'Your examination fee has already been paid.' },
          { status: 400 }
        );
      }
    }

    // Ensure candidate row exists (upsert is safe — won't overwrite payment_status if already set)
    await supabaseAdmin
      .from('candidates')
      .upsert({ email, full_name }, { onConflict: 'email' });

    // Build Flutterwave link
    const SECRET_KEY = process.env.FLUTTERWAVE_SECRET_KEY;
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://foxrevo.com';

    if (!SECRET_KEY) {
      // Dev/simulation mode
      return NextResponse.json({ paymentUrl: `${BASE_URL}/dashboard` });
    }

    const cleanEmailForRef = email.replace(/[^a-zA-Z0-9]/g, '_');
    const payload = {
      tx_ref: `${txRefPrefix}_${cleanEmailForRef}_${Date.now()}`,
      amount: amount,
      currency: 'NGN',
      redirect_url: `${BASE_URL}/dashboard`,
      customer: { email, name: full_name },
      customizations: {
        title: title,
        description: description,
      },
    };

    const fwRes = await fetch('https://api.flutterwave.com/v3/payments', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const rawText = await fwRes.text();

    let fwData;
    try {
      fwData = JSON.parse(rawText);
    } catch {
      console.error('Flutterwave unparseable response:', rawText);
      return NextResponse.json(
        { error: 'Payment gateway returned an invalid response. Please try again.' },
        { status: 502 }
      );
    }

    if (fwData.status === 'success' && fwData.data?.link) {
      return NextResponse.json({ paymentUrl: fwData.data.link });
    }

    console.error('Flutterwave error response:', fwData);
    return NextResponse.json(
      { error: fwData.message || 'Could not create a payment link. Please try again.' },
      { status: 500 }
    );

  } catch (err) {
    console.error('Checkout API error:', err);
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}
