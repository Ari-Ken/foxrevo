"use client";

import React from 'react';
import Link from 'next/link';

export default function FlipSection() {
  return (
    <div id="register" style={{ padding: '0 24px', marginBottom: '80px' }}>
      <div style={{
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border-medium)',
        borderRadius: '8px',
        padding: '48px 40px',
        maxWidth: '680px',
        width: '100%',
        margin: '0 auto',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
      }}>
        <h2 style={{ fontSize: '26px', color: 'var(--text-primary)', fontWeight: '800', textAlign: 'center', marginBottom: '8px' }}>
          The Terms of Entry
        </h2>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', fontSize: '15px', lineHeight: '1.7', marginBottom: '32px' }}>
          We are not looking for customers. We are filtering for architects. These are the conditions you must accept before you register.
        </p>

        <div style={{ borderLeft: '3px solid #A51C30', paddingLeft: '20px', marginBottom: '36px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            ['This is not a purchase.', 'Registration is free. After registering, you will pay a ₦5,000 examination fee. This fee grants you the right to be tested — not the blueprint.'],
            ['Zero Refunds.', 'The examination fee is strictly non-refundable once paid. Do not proceed if you are not ready.'],
            ['The Examination.', 'You must score a minimum of 45/100 to pass. You are granted exactly two attempts. No exceptions.'],
            ['Permanent Lockout.', 'Fail both attempts and your access is permanently revoked. There is no appeal, no extension, no second chance.'],
          ].map(([title, body]) => (
            <div key={title}>
              <span style={{ color: 'var(--text-primary)', fontWeight: '700', fontSize: '15px' }}>{title} </span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6' }}>{body}</span>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link
            href="/register"
            className="btn btn-primary"
            style={{ display: 'inline-block', padding: '16px 48px', fontSize: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}
          >
            I Understand — Register My Identity
          </Link>
          <p style={{ marginTop: '16px', color: 'var(--text-secondary)', fontSize: '12px' }}>
            Free to register. By registering you accept our{' '}
            <Link href="/terms" style={{ color: '#A51C30', textDecoration: 'none' }}>Terms and Conditions</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
