"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../../utils/supabase/client';

export default function ResetPasswordPage() {
  const router = useRouter();
  const supabase = createClient();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Supabase injects the session from the URL hash when they land on this page
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') setReady(true);
    });
  }, [supabase]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
    } else {
      router.push('/dashboard');
      router.refresh();
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 80px)', backgroundColor: 'var(--bg-primary)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '24px' }}>
      <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-medium)', borderRadius: '8px', padding: '40px 32px', maxWidth: '440px', width: '100%', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>

        <h1 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '8px' }}>
          Create New Password
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '14px' }}>
          {ready ? 'Enter your new password below.' : 'Verifying your reset link…'}
        </p>

        {!ready ? (
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>Loading…</p>
        ) : (
          <form onSubmit={handleUpdate}>
            {error && (
              <div style={{ background: 'rgba(165,28,48,0.1)', border: '1px solid #A51C30', borderRadius: '4px', padding: '12px', marginBottom: '20px', color: '#A51C30', fontSize: '14px' }}>
                {error}
              </div>
            )}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', color: 'var(--text-primary)', fontSize: '13px', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                New Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                minLength={6}
                disabled={loading}
                required
                style={{ width: '100%', padding: '12px 14px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', borderRadius: '4px', color: 'var(--text-primary)', fontSize: '15px' }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`btn ${loading ? 'btn-disabled' : 'btn-primary'}`}
              style={{ width: '100%', padding: '14px' }}
            >
              {loading ? 'Saving…' : 'Save New Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
