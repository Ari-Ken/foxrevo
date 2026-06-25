"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../../utils/supabase/client';

export default function ResetPasswordPage() {
  const router = useRouter();
  const supabase = createClient();
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // When they click the email link, Supabase creates a session automatically.
  // We just need to check if they have a session, if not they probably shouldn't be here.
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        setErrorMsg("Your reset link is invalid or has expired. Please request a new one.");
      }
    });
  }, [supabase]);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    const { error } = await supabase.auth.updateUser({
      password: password
    });

    if (error) {
      setErrorMsg(error.message);
      setIsLoading(false);
    } else {
      // Password updated successfully. Route them to the dashboard.
      router.push('/dashboard');
      router.refresh();
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 80px)', backgroundColor: 'var(--bg-primary)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '24px' }}>
      <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-medium)', borderRadius: '8px', padding: '40px 32px', maxWidth: '450px', width: '100%', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
        
        <h1 style={{ fontSize: '28px', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: '800' }}>Create New Password</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '15px' }}>
          Your identity has been verified. Enter a new, secure password below.
        </p>

        <form onSubmit={handleUpdatePassword}>
          {errorMsg && (
            <div className="ui-notice-box urgent-notice mb-6" style={{ padding: '12px' }}>
              <strong>NOTICE:</strong> {errorMsg}
            </div>
          )}

          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', color: 'var(--text-primary)', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>New Password</label>
            <input
              type="password"
              style={{ width: '100%', padding: '12px 16px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', borderRadius: '4px', color: 'var(--text-primary)', fontSize: '16px' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              minLength={6}
              disabled={isLoading}
              required
            />
          </div>

          <button 
            type="submit" 
            className={`btn ${isLoading ? 'btn-disabled' : 'btn-primary'}`}
            style={{ width: '100%', padding: '14px' }}
            disabled={isLoading}
          >
            {isLoading ? 'Updating Identity...' : 'Save New Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
