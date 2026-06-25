import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../utils/supabaseAdmin';
import { createClient } from '../../../utils/supabase/server';

export async function POST(req) {
  try {
    const supabase = createClient();
    
    // 1. Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized access.' }, { status: 401 });
    }

    const email = user.email;
    const full_name = user.user_metadata?.full_name || 'Candidate';

    // 2. Double check candidate record in public table exists
    const { data: candidate, error: dbError } = await supabaseAdmin
      .from('candidates')
      .select('payment_status')
      .eq('email', email)
      .single();

    if (dbError) {
      console.error('Database Error:', dbError);
      return NextResponse.json({ error: 'Candidate record missing or corrupted.' }, { status: 500 });
    }

    if (candidate.payment_status) {
      return NextResponse.json({ error: 'Payment has already been cleared.' }, { status: 400 });
    }

    // 3. Generate Flutterwave Payment Link
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

    const tx_ref = `foxrevo_${email}_${Date.now()}`;
    const amount = 100; // TEMPORARILY REDUCED FOR TESTING

    const payload = {
      tx_ref: tx_ref,
      amount: amount,
      currency: "NGN",
      redirect_url: `${BASE_URL}/confirmation`,
      customer: {
        email: email,
        name: full_name,
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
