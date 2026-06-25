import { NextResponse } from 'next/server';
import { createClient } from '../../../utils/supabase/server';
import { supabaseAdmin } from '../../../utils/supabaseAdmin';

export async function POST() {
  try {
    // Authenticate via session cookie — the client sends NO body
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'You must be logged in to proceed to payment.' },
        { status: 401 }
      );
    }

    const email = user.email.toLowerCase();
    const full_name = user.user_metadata?.full_name || 'Candidate';

    // Guard: prevent double payment
    const { data: existing } = await supabaseAdmin
      .from('candidates')
      .select('payment_status')
      .eq('email', email)
      .single();

    if (existing?.payment_status === true) {
      return NextResponse.json(
        { error: 'Your examination fee has already been paid.' },
        { status: 400 }
      );
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
      tx_ref: `foxrevo_${cleanEmailForRef}_${Date.now()}`,
      amount: 3000,
      currency: 'NGN',
      redirect_url: `${BASE_URL}/dashboard`,
      customer: { email, name: full_name },
      customizations: {
        title: 'FoxRevo Entrance Examination Fee',
        description: 'Non-refundable fee for The Wealth Revolution entrance exam',
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
