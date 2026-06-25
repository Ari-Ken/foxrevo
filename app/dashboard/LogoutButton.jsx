"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../../utils/supabase/client';

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <button onClick={handleLogout} className="btn" style={{ padding: '8px 16px', backgroundColor: 'transparent', border: '1px solid var(--border-medium)', color: 'var(--text-secondary)' }}>
      Logout Session
    </button>
  );
}
