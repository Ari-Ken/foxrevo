"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { createClient } from '../../utils/supabase/client';

export default function ForgotPasswordPage() {
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    setMessage('');

    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://foxrevo.com';

    const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
      redirectTo: `${origin}/reset-password`,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      setMessage("A password reset link has been sent to your email. Check your inbox (and spam folder) to proceed.");
    }
    
    setIsLoading(false);
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 80px)', backgroundColor: 'var(--bg-primary)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '24px' }}>
      <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-medium)', borderRadius: '8px', padding: '40px 32px', maxWidth: '450px', width: '100%', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
        
        <h1 style={{ fontSize: '28px', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: '800' }}>Reset Password</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '15px' }}>
          Enter the email address you used to register. We will send you a secure link to reset your password.
        </p>

        <form onSubmit={handleReset}>
          {errorMsg && (
            <div className="ui-notice-box urgent-notice mb-6" style={{ padding: '12px' }}>
              <strong>ERROR:</strong> {errorMsg}
            </div>
          )}

          {message && (
            <div className="ui-notice-box mb-6" style={{ padding: '12px', borderLeftColor: '#10B981', backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
              <strong style={{ color: '#10B981' }}>SUCCESS:</strong> 
              <p style={{ color: 'var(--text-primary)', marginTop: '4px' }}>{message}</p>
            </div>
          )}

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', color: 'var(--text-primary)', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Registered Email Address</label>
            <input
              type="email"
              style={{ width: '100%', padding: '12px 16px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', borderRadius: '4px', color: 'var(--text-primary)', fontSize: '16px' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. obinna@domain.com"
              disabled={isLoading || !!message}
              required
            />
          </div>

          <button 
            type="submit" 
            className={`btn ${isLoading ? 'btn-disabled' : 'btn-primary'}`}
            style={{ width: '100%', padding: '14px' }}
            disabled={isLoading || !!message}
          >
            {isLoading ? 'Sending Link...' : 'Send Reset Link'}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px' }}>
          <p style={{ color: 'var(--text-secondary)' }}>
            Remembered it? <Link href="/login" className="text-wine">Return to Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
