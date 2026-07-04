import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../../utils/supabaseAdmin';

export async function POST(req) {
  try {
    const secretHash = process.env.FLUTTERWAVE_SECRET_HASH;
    const signature = req.headers.get('verif-hash');

    console.log("=== FLUTTERWAVE WEBHOOK TRIGGERED ===");
    console.log("Received verif-hash:", signature);
    console.log("Expected secretHash:", secretHash);

    // 1. Verify the origin of the webhook using the secret hash
    if (!signature || signature !== secretHash) {
      console.warn('Unauthorized webhook attempt. Hash mismatch.');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await req.json();

    // 2. Validate the payment status
    if (payload.event === 'charge.completed' && payload.data.status === 'successful') {
      const email = payload.data.customer.email.toLowerCase();
      const txRef = payload.data.tx_ref || '';
      const isCertificatePayment = txRef.includes('_cert_');
      
      let updateData;
      let error;

      if (isCertificatePayment) {
        // Update certificate payment status
        const res = await supabaseAdmin
          .from('candidates')
          .update({ cert_paid: true })
          .eq('email', email)
          .select();
        updateData = res.data;
        error = res.error;
      } else {
        // Upsert exam payment status and reset attempts
        const res = await supabaseAdmin
          .from('candidates')
          .upsert({ 
            email: email,
            full_name: payload.data.customer.name || 'Candidate',
            payment_status: true,
            exam_attempts: 0,
            passed_exam: false,
            exam_score: 0
          }, { onConflict: 'email' })
          .select();
        updateData = res.data;
        error = res.error;
      }

      if (error) {
        console.error('Failed to update candidate payment status in Supabase:', error);
        return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
      }

      console.log(`Payment confirmed and database updated for: ${email}. Result:`, updateData);
      return NextResponse.json({ status: 'success' }, { status: 200 });
    }

    // If it's another event type, just acknowledge it
    return NextResponse.json({ status: 'ignored' }, { status: 200 });

  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
