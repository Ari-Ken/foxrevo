import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function updateSession(request) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with cross-site tracking protection.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;

  // 1. Redirect /register to /admission (our general landing page)
  if (path === '/register') {
    const url = request.nextUrl.clone();
    url.pathname = '/admission';
    return NextResponse.redirect(url);
  }

  // 2. Redirect root (/) to /admission if PORTAL_CAMPAIGN_ACTIVE is 'true'
  const isCampaignActive = process.env.PORTAL_CAMPAIGN_ACTIVE === 'true';
  if (isCampaignActive && path === '/') {
    const url = request.nextUrl.clone();
    url.pathname = '/admission';
    return NextResponse.redirect(url);
  }

  // Define protected routes
  const protectedRoutes = ['/dashboard', '/exam', '/exam-prep', '/download'];
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));
  
  if (isProtectedRoute && !user) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
