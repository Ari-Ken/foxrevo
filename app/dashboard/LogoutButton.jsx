"use client";

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
    <button
      onClick={handleLogout}
      style={{
        background: 'transparent',
        border: '1px solid var(--border-medium)',
        borderRadius: '4px',
        color: 'var(--text-secondary)',
        padding: '8px 16px',
        fontSize: '14px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
      onMouseOver={e => { e.currentTarget.style.borderColor = '#A51C30'; e.currentTarget.style.color = '#A51C30'; }}
      onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border-medium)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
    >
      Log Out
    </button>
  );
}
