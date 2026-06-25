"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { createClient } from '../../utils/supabase/client';

export default function ForgotPasswordPage() {
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSend = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const origin = window.location.origin;

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
      redirectTo: `${origin}/reset-password`,
    });

    if (resetError) {
      setError(resetError.message);
    } else {
      setSent(true);
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 80px)', backgroundColor: 'var(--bg-primary)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '24px' }}>
      <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-medium)', borderRadius: '8px', padding: '40px 32px', maxWidth: '440px', width: '100%', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>

        <h1 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '8px' }}>
          Reset Password
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '14px', lineHeight: '1.6' }}>
          Enter your registered email. We will send you a link to set a new password.
        </p>

        {sent ? (
          <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid #10B981', borderRadius: '4px', padding: '16px', color: 'var(--text-primary)', lineHeight: '1.6' }}>
            <strong style={{ color: '#10B981' }}>Email Sent.</strong> Check your inbox (and spam folder) for the reset link.
          </div>
        ) : (
          <form onSubmit={handleSend}>
            {error && (
              <div style={{ background: 'rgba(165,28,48,0.1)', border: '1px solid #A51C30', borderRadius: '4px', padding: '12px', marginBottom: '20px', color: '#A51C30', fontSize: '14px' }}>
                {error}
              </div>
            )}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', color: 'var(--text-primary)', fontSize: '13px', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Registered Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email"
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
              {loading ? 'Sending…' : 'Send Reset Link'}
            </button>
          </form>
        )}

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--text-secondary)' }}>
          <Link href="/login" style={{ color: '#A51C30', textDecoration: 'none' }}>← Back to Login</Link>
        </p>
      </div>
    </div>
  );
}
