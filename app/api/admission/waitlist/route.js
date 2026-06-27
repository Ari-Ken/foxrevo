import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../../utils/supabaseAdmin';

export async function POST(req) {
  try {
    const { email } = await req.json();
    const cleanEmail = email?.trim()?.toLowerCase();

    if (!cleanEmail || !cleanEmail.includes('@')) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    // Upsert into candidates table as a waitlist signup
    const { error } = await supabaseAdmin
      .from('candidates')
      .upsert({
        email: cleanEmail,
        full_name: 'Waitlist Candidate',
        payment_status: false,
        passed_exam: false,
        exam_score: 0,
        exam_attempts: 0
      }, { onConflict: 'email' });

    if (error) {
      console.error('Waitlist upsert error:', error);
      return NextResponse.json({ error: 'Could not secure your waitlist slot. Please try again.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'You have been registered on the waitlist successfully!' });
  } catch (err) {
    console.error('Waitlist route error:', err);
    return NextResponse.json({ error: 'An unexpected server error occurred.' }, { status: 500 });
  }
}
