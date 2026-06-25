import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../utils/supabaseAdmin';

export async function POST(req) {
  try {
    const { email, full_name } = await req.json();

    if (!email || !full_name) {
      return NextResponse.json({ error: 'Email and Full Name are required.' }, { status: 400 });
    }

    const formattedEmail = email.trim().toLowerCase();

    // 1. Check if they already have a record
    const { data: candidate, error: fetchError } = await supabaseAdmin
      .from('candidates')
      .select('payment_status')
      .eq('email', formattedEmail)
      .single();

    if (candidate && candidate.payment_status) {
      // Already paid! Redirect them directly to registration
      const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      return NextResponse.json({ 
        alreadyPaid: true,
        redirectUrl: `${origin}/register?email=${encodeURIComponent(formattedEmail)}`
      });
    }

    // 2. Initialize or Update record (Upsert)
    const { error: dbError } = await supabaseAdmin
      .from('candidates')
      .upsert({
        email: formattedEmail,
        full_name: full_name.trim(),
      }, { onConflict: 'email' });

    if (dbError) {
      console.error('Database Error:', dbError);
      return NextResponse.json({ error: 'Failed to initialize system record.' }, { status: 500 });
    }

    // 3. Generate Flutterwave Payment Link
    const FLUTTERWAVE_SECRET_KEY = process.env.FLUTTERWAVE_SECRET_KEY;
    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    if (!FLUTTERWAVE_SECRET_KEY) {
      console.warn("FLUTTERWAVE_SECRET_KEY is missing. Simulating payment link.");
      return NextResponse.json({ 
        paymentUrl: `${origin}/register?email=${encodeURIComponent(formattedEmail)}&simulated=true`,
        message: 'Simulation mode'
      });
    }

    const tx_ref = `foxrevo_${formattedEmail}_${Date.now()}`;
    const amount = 100; // Testing amount (UI will say ₦5,000)

    const payload = {
      tx_ref: tx_ref,
      amount: amount,
      currency: "NGN",
      redirect_url: `${origin}/register?email=${encodeURIComponent(formattedEmail)}`,
      customer: {
        email: formattedEmail,
        name: full_name.trim(),
      },
      customizations: {
        title: "FoxRevo Entrance Clearance",
        description: "Registration and Examination Fee for The Wealth Revolution",
        logo: `${origin}/logo.png`, // Placeholder
      }
    };

    const response = await fetch("https://api.flutterwave.com/v3/payments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const fwData = await response.json();

    if (fwData.status === "success" && fwData.data && fwData.data.link) {
      return NextResponse.json({ paymentUrl: fwData.data.link });
    } else {
      console.error("Flutterwave Error:", fwData);
      return NextResponse.json({ error: 'Failed to generate payment link with gateway.' }, { status: 500 });
    }

  } catch (error) {
    console.error("Checkout API Error:", error);
    return NextResponse.json({ error: `Internal Server Error: ${error.message}` }, { status: 500 });
  }
}
