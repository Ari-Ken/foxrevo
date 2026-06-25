"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '../../utils/supabase/client';
import './register.css';

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

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

    if (!data.session) {
      // Email confirmation is required
      setSuccessMsg('Registration successful! Please check your email to verify your identity, then proceed to log in.');
      setLoading(false);
      return;
    }

    // 2. Go to dashboard (the dashboard will auto-create candidate row)
    router.push('/dashboard');
    router.refresh();
  };

  return (
    <div className="register-container">
      <div className="register-card-wrapper">
        
        {/* Left Panel: Information & CRO Copy */}
        <div className="register-info-panel">
          <h1 className="register-headline">The Blueprint is Earned.</h1>
          <p className="register-subheadline">
            To unlock the assets and frameworks of the revolution, you must demonstrate the discipline of a builder. Complete your free registration to proceed.
          </p>
          
          <div className="register-points">
            <div className="register-point-item">
              <div className="register-point-icon">✓</div>
              <div>
                <h3 className="register-point-title">Free Registration</h3>
                <p className="register-point-text">Register your legal identity. This secures your record and maps your future progress.</p>
              </div>
            </div>
            
            <div className="register-point-item">
              <div className="register-point-icon">✓</div>
              <div>
                <h3 className="register-point-title">Entrance Assessment</h3>
                <p className="register-point-text">Pay the ₦3,000 clearance fee from your dashboard to activate your testing portal. You are granted exactly two attempts.</p>
              </div>
            </div>

            <div className="register-point-item">
              <div className="register-point-icon">✓</div>
              <div>
                <h3 className="register-point-title">Access the Sanctuary</h3>
                <p className="register-point-text">Score 45/100 or higher on the examination to unlock "The Wealth Revolution" PDF and the Private Member Community.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: The Form */}
        <div className="register-form-panel">
          <h2 className="register-form-title">Register</h2>
          <p className="register-form-subtitle">Secure your slot in the cohort.</p>

          {successMsg ? (
            <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid #10B981', borderRadius: '4px', padding: '20px', color: 'var(--text-primary)', lineHeight: '1.6' }}>
              <strong style={{ color: '#10B981', display: 'block', fontSize: '16px', marginBottom: '8px' }}>✓ Identity Registered</strong>
              {successMsg}
              <div style={{ marginTop: '24px' }}>
                <Link href="/login" className="btn btn-primary" style={{ display: 'block', textAlign: 'center' }}>Go to Login</Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleRegister}>
              {error && (
                <div style={{ background: 'rgba(165,28,48,0.1)', border: '1px solid #A51C30', borderRadius: '4px', padding: '12px', marginBottom: '20px', color: '#A51C30', fontSize: '14px' }}>
                  {error}
                </div>
              )}

              {[
                { label: 'Full Legal Name', type: 'text', value: fullName, set: setFullName, placeholder: 'e.g. John Doe' },
                { label: 'Email Address', type: 'email', value: email, set: setEmail, placeholder: 'name@example.com' },
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
          )}

          <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--text-secondary)' }}>
            Already registered?{' '}
            <Link href="/login" style={{ color: '#A51C30', textDecoration: 'none' }}>Login here</Link>
          </p>

          <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '13px' }}>
            <Link href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'underline' }}>← Back to FoxRevo.com</Link>
          </p>
        </div>

      </div>
    </div>
  );
}
