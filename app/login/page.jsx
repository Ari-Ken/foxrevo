"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '../../utils/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      setIsLoading(false);
    } else {
      router.push('/dashboard');
      router.refresh();
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 80px)', backgroundColor: 'var(--bg-primary)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '24px' }}>
      <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-medium)', borderRadius: '8px', padding: '40px 32px', maxWidth: '450px', width: '100%', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
        
        <h1 style={{ fontSize: '28px', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: '800' }}>Access Portal</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '15px' }}>
          Welcome back to the revolution. Enter your credentials.
        </p>

        <form onSubmit={handleLogin}>
          {errorMsg && (
            <div className="ui-notice-box urgent-notice mb-6" style={{ padding: '12px' }}>
              <strong>NOTICE:</strong> {errorMsg}
            </div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', color: 'var(--text-primary)', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Secure Email</label>
            <input
              type="email"
              style={{ width: '100%', padding: '12px 16px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', borderRadius: '4px', color: 'var(--text-primary)', fontSize: '16px' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', color: 'var(--text-primary)', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Password</label>
            <input
              type="password"
              style={{ width: '100%', padding: '12px 16px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', borderRadius: '4px', color: 'var(--text-primary)', fontSize: '16px' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            {isLoading ? 'Authenticating...' : 'Secure Login'}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px' }}>
          <p style={{ color: 'var(--text-secondary)' }}>
            Not an architect yet? <Link href="/register" className="text-wine">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
