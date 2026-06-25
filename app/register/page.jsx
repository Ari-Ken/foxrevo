"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '../../utils/supabase/client';

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  
  const queryEmail = searchParams.get('email') || '';
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState(queryEmail);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    const formattedEmail = email.trim().toLowerCase();

    // 1. Sign up the user via Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: formattedEmail,
      password,
      options: {
        data: {
          full_name: fullName.trim(),
        }
      }
    });

    if (authError) {
      setErrorMsg(authError.message);
      setIsLoading(false);
      return;
    }

    // 2. Initialize the candidate record in the public table
    // Using upsert in case they somehow exist or retry
    const { error: dbError } = await supabase
      .from('candidates')
      .upsert({
        email: formattedEmail,
        full_name: fullName.trim(),
      }, { onConflict: 'email' });

    if (dbError) {
      console.error("Database init error:", dbError);
    }

    // 3. Redirect to dashboard
    router.push('/dashboard');
    router.refresh();
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 80px)', backgroundColor: 'var(--bg-primary)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '24px' }}>
      <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-medium)', borderRadius: '8px', padding: '40px 32px', maxWidth: '450px', width: '100%', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
        
        {queryEmail ? (
          <>
            <div style={{ width: '64px', height: '64px', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 16px' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h1 style={{ fontSize: '28px', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: '800', textAlign: 'center' }}>Clearance Successful</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '15px', textAlign: 'center' }}>
              Your payment is verified. Finalize your identity by setting a secure password.
            </p>
          </>
        ) : (
          <>
            <h1 style={{ fontSize: '28px', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: '800' }}>Candidate Registration</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '15px' }}>
              Create your account. This identity will be permanently tied to your examination and blueprint access.
            </p>
          </>
        )}

        <form onSubmit={handleRegister}>
          {errorMsg && (
            <div className="ui-notice-box urgent-notice mb-6" style={{ padding: '12px' }}>
              <strong>NOTICE:</strong> {errorMsg}
            </div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', color: 'var(--text-primary)', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Full Legal Name</label>
            <input
              type="text"
              style={{ width: '100%', padding: '12px 16px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', borderRadius: '4px', color: 'var(--text-primary)', fontSize: '16px' }}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Obinna Eze"
              disabled={isLoading}
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', color: 'var(--text-primary)', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Secure Email Address</label>
            <input
              type="email"
              style={{ width: '100%', padding: '12px 16px', backgroundColor: queryEmail ? 'var(--bg-secondary)' : 'var(--bg-tertiary)', border: '1px solid var(--border-light)', borderRadius: '4px', color: 'var(--text-primary)', fontSize: '16px', opacity: queryEmail ? 0.7 : 1 }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. obinna@domain.com"
              disabled={isLoading || !!queryEmail}
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
            {isLoading ? 'Creating Identity...' : 'Complete Registration'}
          </button>
        </form>

        {!queryEmail && (
          <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px' }}>
            <p style={{ color: 'var(--text-secondary)' }}>
              Already registered? <Link href="/login" className="text-wine">Login here</Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div style={{ padding: '100px', textAlign: 'center' }}>Loading Registration...</div>}>
      <RegisterForm />
    </Suspense>
  );
}
