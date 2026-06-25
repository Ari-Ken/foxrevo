import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../utils/supabaseAdmin';

export async function POST(req) {
  try {
    const { email, full_name } = await req.json();

    if (!email || !full_name) {
      return NextResponse.json({ error: 'Email and Full Name are required.' }, { status: 400 });
    }

    const formattedEmail = email.trim().toLowerCase();

    // 1. Create or update candidate record in Supabase
    // We use upsert to handle if they registered before but abandoned payment
    const { error: dbError } = await supabaseAdmin
      .from('candidates')
      .upsert({
        email: formattedEmail,
        full_name: full_name.trim(),
        // We do not set payment_status to true here, that is the webhook's job
      }, { onConflict: 'email' });

    if (dbError) {
      console.error('Database Error:', dbError);
      return NextResponse.json({ error: 'Failed to initialize candidate record.' }, { status: 500 });
    }

    // 2. Generate Flutterwave Payment Link
    const FLUTTERWAVE_SECRET_KEY = process.env.FLUTTERWAVE_SECRET_KEY;
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    if (!FLUTTERWAVE_SECRET_KEY) {
      // For local development without keys, just simulate success
      console.warn("FLUTTERWAVE_SECRET_KEY is missing. Simulating payment link.");
      return NextResponse.json({ 
        paymentUrl: `${BASE_URL}/confirmation?simulated=true`,
        message: 'Running in simulation mode due to missing API keys.'
      });
    }

    const tx_ref = `foxrevo_${formattedEmail}_${Date.now()}`;
    const amount = 100; // TEMPORARILY REDUCED FOR TESTING (Original: 3000)

    const payload = {
      tx_ref: tx_ref,
      amount: amount,
      currency: "NGN",
      redirect_url: `${BASE_URL}/confirmation`,
      customer: {
        email: formattedEmail,
        name: full_name.trim(),
      },
      customizations: {
        title: "FoxRevo Entrance Clearance",
        description: "Registration and Examination Fee for The Wealth Revolution",
        logo: `${BASE_URL}/logo.png`, // Placeholder for actual logo
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
      return NextResponse.json({ error: 'Failed to generate payment link with Flutterwave.' }, { status: 500 });
    }

  } catch (error) {
    console.error("Checkout API Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
