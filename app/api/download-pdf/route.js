import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../utils/supabaseAdmin';

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email required for authorization.' }, { status: 400 });
    }

    const formattedEmail = email.trim().toLowerCase();

    // 1. Verify candidate has passed the exam and paid
    const { data: candidate, error: fetchError } = await supabaseAdmin
      .from('candidates')
      .select('passed_exam, payment_status')
      .eq('email', formattedEmail)
      .single();

    if (fetchError || !candidate) {
      return NextResponse.json({ error: 'Unauthorized. Candidate record not found.' }, { status: 403 });
    }

    if (!candidate.payment_status || !candidate.passed_exam) {
      return NextResponse.json({ error: 'Unauthorized. You have not met all clearance and examination requirements.' }, { status: 403 });
    }

    // 2. Generate a secure, temporary signed URL (expires in 60 seconds)
    // Assumes bucket name is 'foxrevo_assets' and file name is 'The_Wealth_Revolution.pdf'
    const { data: signedUrlData, error: storageError } = await supabaseAdmin
      .storage
      .from('foxrevo_assets')
      .createSignedUrl('The_Wealth_Revolution.pdf', 60);

    if (storageError) {
      console.error("Storage Error:", storageError);
      return NextResponse.json({ error: 'Failed to access the secure vault. Please contact support.' }, { status: 500 });
    }

    // 3. Return the secure link to the client
    return NextResponse.json({ secureUrl: signedUrlData.signedUrl });

  } catch (error) {
    console.error("Download API Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
