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
      <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-medium)', borderRadius: '8px', padding: '48px 32px', maxWidth: '700px', width: '100%', margin: '0 auto', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
        
        <h2 style={{ fontSize: '28px', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: '800', textAlign: 'center' }}>
          The Terms of Entry
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '16px', textAlign: 'center', lineHeight: '1.6' }}>
          We are not looking for customers. We are filtering for architects. Read the terms below. Do not proceed if you are not ready for the consequences.
        </p>

        <div style={{ backgroundColor: 'var(--bg-tertiary)', borderLeft: '4px solid #A51C30', padding: '24px', marginBottom: '32px', borderRadius: '4px' }}>
          <ul className="terms-list" style={{ margin: 0, padding: 0, listStyleType: 'none' }}>
            <li style={{ marginBottom: '16px' }}><strong style={{ color: 'var(--text-primary)' }}>1. This is not a purchase:</strong> You are paying an examination fee of ₦5,000. This does not grant you the blueprint; it only grants you the right to be tested for it.</li>
            <li style={{ marginBottom: '16px' }}><strong style={{ color: 'var(--text-primary)' }}>2. Zero Refunds:</strong> The fee is strictly non-refundable. If you are not ready to commit, do not initiate the gateway.</li>
            <li style={{ marginBottom: '16px' }}><strong style={{ color: 'var(--text-primary)' }}>3. The Examination:</strong> You must score a minimum of 45/100 to pass. You are granted exactly two attempts.</li>
            <li><strong style={{ color: 'var(--text-primary)' }}>4. Permanent Lockout:</strong> If you fail the exam twice, your access is permanently revoked. There is no appeal. You will be locked out of the revolution.</li>
          </ul>
        </div>

        <form onSubmit={handleCheckout} style={{ maxWidth: '400px', margin: '0 auto' }}>
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
              placeholder="Your true name"
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
              placeholder="Your primary email"
              disabled={isLoading}
              required
            />
          </div>

          <button 
            type="submit" 
            className={`btn ${isLoading ? 'btn-disabled' : 'btn-primary'}`}
            style={{ width: '100%', padding: '16px', fontSize: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}
            disabled={isLoading}
          >
            {isLoading ? 'Connecting to Gateway...' : 'Accept Terms & Pay Examination Fee (₦5,000)'}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '13px' }}>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}>
            By submitting this form, you acknowledge that you have read and accepted the <Link href="/terms" className="text-wine">Terms and Conditions</Link>. 
          </p>
        </div>
      </div>
    </div>
  );
}
