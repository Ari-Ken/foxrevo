"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function FlipSection() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCheckout = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, full_name: fullName })
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to initialize payment gateway.');
      }

      if (data.alreadyPaid) {
        router.push(data.redirectUrl);
      } else if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="flip-container" id="register" style={{ perspective: 'none', height: 'auto', marginBottom: '80px' }}>
      <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-medium)', borderRadius: '8px', padding: '48px 32px', maxWidth: '500px', width: '100%', margin: '0 auto', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
        
        <h2 style={{ fontSize: '28px', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: '800', textAlign: 'center' }}>
          Join the Revolution
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '15px', textAlign: 'center', lineHeight: '1.6' }}>
          Secure your clearance and gain access to the Preparatory Architecture. Only serious candidates may enter.
        </p>

        <form onSubmit={handleCheckout}>
          {errorMsg && (
            <div className="ui-notice-box urgent-notice mb-6" style={{ padding: '12px' }}>
              <strong>NOTICE:</strong> {errorMsg}
            </div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', color: 'var(--text-primary)', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Full Legal Name</label>
            <input
              type="text"
              style={{ width: '100%', padding: '14px 16px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', borderRadius: '4px', color: 'var(--text-primary)', fontSize: '16px' }}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Obinna Eze"
              disabled={isLoading}
              required
            />
          </div>

          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', color: 'var(--text-primary)', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Secure Email Address</label>
            <input
              type="email"
              style={{ width: '100%', padding: '14px 16px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', borderRadius: '4px', color: 'var(--text-primary)', fontSize: '16px' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. obinna@domain.com"
              disabled={isLoading}
              required
            />
          </div>

          <button 
            type="submit" 
            className={`btn ${isLoading ? 'btn-disabled' : 'btn-primary'}`}
            style={{ width: '100%', padding: '16px', fontSize: '16px' }}
            disabled={isLoading}
          >
            {isLoading ? 'Connecting to Secure Gateway...' : 'Pay ₦5,000 to Secure Access'}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '13px' }}>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}>
            By proceeding to payment you agree to our <Link href="/terms" className="text-wine">Terms and Conditions</Link>. 
            You will create your account password immediately after payment.
          </p>
        </div>
      </div>
    </div>
  );
}
