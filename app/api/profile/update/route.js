import { NextResponse } from 'next/server';
import { createClient } from '../../../../utils/supabase/server';
import { supabaseAdmin } from '../../../../utils/supabaseAdmin';

export async function POST(req) {
  try {
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'You must be logged in to update your profile.' }, { status: 401 });
    }

    const { fullName } = await req.json();
    if (!fullName || !fullName.trim()) {
      return NextResponse.json({ error: 'Full name cannot be empty.' }, { status: 400 });
    }

    const cleanName = fullName.trim();
    const email = user.email.toLowerCase();

    // 1. Update candidates table (bypassing RLS for admin integrity updates)
    const { error: dbError } = await supabaseAdmin
      .from('candidates')
      .update({ full_name: cleanName })
      .eq('email', email);

    if (dbError) {
      console.error('Failed to update candidate record in database:', dbError);
      return NextResponse.json({ error: 'Database update failed.' }, { status: 500 });
    }

    // 2. Update Supabase Auth user metadata
    const { error: metadataError } = await supabase.auth.updateUser({
      data: { full_name: cleanName }
    });

    if (metadataError) {
      console.warn('Failed to update user auth metadata:', metadataError);
    }

    return NextResponse.json({ success: true, fullName: cleanName });
  } catch (err) {
    console.error('Profile update error:', err);
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}
