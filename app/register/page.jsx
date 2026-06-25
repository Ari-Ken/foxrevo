"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '../../utils/supabase/client';

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const cleanEmail = email.trim().toLowerCase();

    // 1. Create auth user
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: cleanEmail,
      password,
      options: { data: { full_name: fullName.trim() } },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    // 2. Go to dashboard (the dashboard will auto-create candidate row)
    router.push('/dashboard');
    router.refresh();
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 80px)', backgroundColor: 'var(--bg-primary)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '24px' }}>
      <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-medium)', borderRadius: '8px', padding: '40px 32px', maxWidth: '440px', width: '100%', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>

        <h1 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '8px' }}>
          Register Your Identity
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '14px', lineHeight: '1.6' }}>
          Registration is free. After registering, you will proceed to pay the examination fee from your dashboard.
        </p>

        <form onSubmit={handleRegister}>
          {error && (
            <div style={{ background: 'rgba(165,28,48,0.1)', border: '1px solid #A51C30', borderRadius: '4px', padding: '12px', marginBottom: '20px', color: '#A51C30', fontSize: '14px' }}>
              {error}
            </div>
          )}

          {[
            { label: 'Full Legal Name', type: 'text', value: fullName, set: setFullName, placeholder: 'Your full name' },
            { label: 'Email Address', type: 'email', value: email, set: setEmail, placeholder: 'Your email' },
            { label: 'Password', type: 'password', value: password, set: setPassword, placeholder: 'Minimum 6 characters', min: 6 },
          ].map(({ label, type, value, set, placeholder, min }) => (
            <div key={label} style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', color: 'var(--text-primary)', fontSize: '13px', fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {label}
              </label>
              <input
                type={type}
                value={value}
                onChange={e => set(e.target.value)}
                placeholder={placeholder}
                minLength={min}
                disabled={loading}
                required
                style={{ width: '100%', padding: '12px 14px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', borderRadius: '4px', color: 'var(--text-primary)', fontSize: '15px' }}
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className={`btn ${loading ? 'btn-disabled' : 'btn-primary'}`}
            style={{ width: '100%', padding: '14px', marginTop: '8px' }}
          >
            {loading ? 'Registering…' : 'Register My Identity'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--text-secondary)' }}>
          Already registered?{' '}
          <Link href="/login" style={{ color: '#A51C30', textDecoration: 'none' }}>Login here</Link>
        </p>
      </div>
    </div>
  );
}
