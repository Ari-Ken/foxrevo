"use client";

import React from 'react';
import Link from 'next/link';

export default function FlipSection() {
  return (
    <div className="flip-container" id="register" style={{ perspective: 'none', height: 'auto', marginBottom: '80px' }}>
      <div style={{
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border-medium)',
        borderRadius: '8px',
        padding: '48px 32px',
        maxWidth: '700px',
        width: '100%',
        margin: '0 auto',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
      }}>

        <h2 style={{ fontSize: '28px', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: '800', textAlign: 'center' }}>
          The Terms of Entry
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '16px', textAlign: 'center', lineHeight: '1.6' }}>
          We are not looking for customers. We are filtering for architects. Read the terms below before you register.
        </p>

        <div style={{ backgroundColor: 'var(--bg-tertiary)', borderLeft: '4px solid #A51C30', padding: '24px', marginBottom: '32px', borderRadius: '4px' }}>
          <ul style={{ margin: 0, padding: 0, listStyleType: 'none' }}>
            <li style={{ marginBottom: '16px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              <strong style={{ color: 'var(--text-primary)' }}>1. This is not a purchase.</strong> After registering, you will be required to pay an examination fee of ₦5,000. This does not grant you the blueprint — it grants you the right to be tested for it.
            </li>
            <li style={{ marginBottom: '16px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              <strong style={{ color: 'var(--text-primary)' }}>2. Zero Refunds.</strong> The examination fee is strictly non-refundable. Do not proceed if you are not committed.
            </li>
            <li style={{ marginBottom: '16px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              <strong style={{ color: 'var(--text-primary)' }}>3. The Examination.</strong> You must score a minimum of 45/100 to pass. You are granted exactly two attempts. No exceptions.
            </li>
            <li style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              <strong style={{ color: 'var(--text-primary)' }}>4. Permanent Lockout.</strong> If you exhaust both attempts without passing, your access is permanently revoked. There is no appeal.
            </li>
          </ul>
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link
            href="/register"
            className="btn btn-primary"
            style={{ display: 'inline-block', padding: '16px 40px', fontSize: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}
          >
            I Understand — Register My Identity
          </Link>
          <p style={{ marginTop: '16px', color: 'var(--text-secondary)', fontSize: '13px' }}>
            By registering you accept our{' '}
            <Link href="/terms" style={{ color: '#A51C30', textDecoration: 'none' }}>Terms and Conditions</Link>.
            Registration is free. Payment comes after.
          </p>
        </div>
      </div>
    </div>
  );
}
