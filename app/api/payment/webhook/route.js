import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../../utils/supabaseAdmin';

export async function POST(req) {
  try {
    const secretHash = process.env.FLUTTERWAVE_SECRET_HASH;
    const signature = req.headers.get('verif-hash');

    console.log("=== FLUTTERWAVE WEBHOOK TRIGGERED (api/payment/webhook) ===");
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
      
      // 3. Update the candidate's payment status in Supabase
      const { data: updateData, error } = await supabaseAdmin
        .from('candidates')
        .upsert({ 
          email: email,
          full_name: payload.data.customer.name || 'Candidate',
          payment_status: true 
        }, { onConflict: 'email' })
        .select();

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
