import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../utils/supabaseAdmin';
import { createClient } from '../../../utils/supabase/server';

export async function POST(req) {
  try {
    // 1. Get authenticated user from session — no body needed from frontend
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'You must be logged in to proceed.' }, { status: 401 });
    }

    const email = user.email.trim().toLowerCase();
    const full_name = user.user_metadata?.full_name || 'Candidate';

    // 2. Check if already paid
    const { data: candidate } = await supabaseAdmin
      .from('candidates')
      .select('payment_status')
      .eq('email', email)
      .single();

    if (candidate?.payment_status) {
      return NextResponse.json({ error: 'Your clearance fee has already been paid.' }, { status: 400 });
    }

    // 3. Ensure candidate row exists
    await supabaseAdmin
      .from('candidates')
      .upsert({ email, full_name }, { onConflict: 'email' });

    // 4. Generate Flutterwave Payment Link
    const FLUTTERWAVE_SECRET_KEY = process.env.FLUTTERWAVE_SECRET_KEY;
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://foxrevo.com';

    if (!FLUTTERWAVE_SECRET_KEY) {
      console.warn('FLUTTERWAVE_SECRET_KEY missing — simulation mode');
      return NextResponse.json({ paymentUrl: `${BASE_URL}/dashboard?simulated=true` });
    }

    const tx_ref = `foxrevo_${email}_${Date.now()}`;

    const payload = {
      tx_ref,
      amount: 100, // Test amount — change to 5000 for live
      currency: 'NGN',
      redirect_url: `${BASE_URL}/dashboard`,
      customer: { email, name: full_name },
      customizations: {
        title: 'FoxRevo Entrance Examination Fee',
        description: 'Clearance fee for The Wealth Revolution entrance exam',
      },
    };

    const fwResponse = await fetch('https://api.flutterwave.com/v3/payments', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const responseText = await fwResponse.text();
    let fwData;
    try {
      fwData = JSON.parse(responseText);
    } catch {
      console.error('Flutterwave raw response:', responseText);
      return NextResponse.json(
        { error: 'Payment gateway returned an unreadable response. Please try again.' },
        { status: 502 }
      );
    }

    if (fwData.status === 'success' && fwData.data?.link) {
      return NextResponse.json({ paymentUrl: fwData.data.link });
    }

    console.error('Flutterwave Error:', fwData);
    return NextResponse.json(
      { error: fwData.message || 'Failed to generate payment link. Please try again.' },
      { status: 500 }
    );

  } catch (err) {
    console.error('Checkout API Error:', err);
    return NextResponse.json({ error: 'Internal Server Error.' }, { status: 500 });
  }
}
