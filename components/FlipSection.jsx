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
          Guidelines for Admission
        </h2>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', fontSize: '15px', lineHeight: '1.7', marginBottom: '32px' }}>
          Welcome to the beginning of your build. Review these core parameters to begin.
        </p>

        <div style={{ borderLeft: '3px solid #A51C30', paddingLeft: '20px', marginBottom: '36px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            ['₦3,000 Commitment Sacrifice:', 'Required contribution to access preparatory architecture and unlock the assessment portal.'],
            ['Entrance Assessment:', 'Study the provided blueprints and clear the timed examination with a score of 45% or higher.'],
            ['Attempt Limitations:', 'You have exactly two (2) attempts. If both are exhausted, you must re-register to clear your attempts.'],
            ['Official Support Line:', 'Support is available strictly through our official WhatsApp customer line (+234 707 742 2928).']
          ].map(([title, body]) => (
            <div key={title}>
              <span style={{ color: 'var(--text-primary)', fontWeight: '700', fontSize: '15px' }}>{title} </span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6' }}>{body}</span>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link
            href="/admission"
            className="btn btn-primary"
            style={{ display: 'inline-block', padding: '16px 48px', fontSize: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}
          >
            I Understand — Register My Identity
          </Link>
          <p style={{ marginTop: '16px', color: 'var(--text-secondary)', fontSize: '14px' }}>
            Already a member?{' '}
            <Link href="/login" style={{ color: '#A51C30', textDecoration: 'none', fontWeight: 'bold' }}>Login here</Link>
          </p>
          <p style={{ marginTop: '8px', color: 'var(--text-secondary)', fontSize: '12px' }}>
            Free to register. By registering you accept our{' '}
            <Link href="/terms" style={{ color: '#A51C30', textDecoration: 'none' }}>Terms and Conditions</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
