import { NextResponse } from 'next/server';
import { createClient } from '../../../utils/supabase/server';

export async function GET(request) {
  try {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    const next = searchParams.get('next') || '/dashboard';

    if (code) {
      const supabase = createClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        return NextResponse.redirect(`${origin}${next}`);
      }
      console.error('Code exchange error:', error);
    }

    return NextResponse.redirect(`${origin}/login?error=Authentication session failed`);
  } catch (err) {
    console.error('Callback error:', err);
    return NextResponse.redirect(new URL('/login?error=Callback handler error', request.url));
  }
}
export const dynamic = 'force-dynamic';
