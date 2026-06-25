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
          Welcome to the beginning of your build. FoxRevo is dedicated to developing the next generation of builders. To ensure we construct a community focused on growth and excellence, we ask that you review and accept these core guidelines before starting.
        </p>

        <div style={{ borderLeft: '3px solid #A51C30', paddingLeft: '20px', marginBottom: '36px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            ['The Commitment to Build.', 'Registration is free. To progress to the preparatory material and sit the entrance examination, an introductory fee of ₦3,000 is required. This represents your commitment to the process.'],
            ['Administrative Contribution.', 'The registration fee is strictly non-refundable once paid, as it directly supports the maintenance of the assessment architecture and portal.'],
            ['The Entrance Assessment.', 'To join the core member community, you will study the prep material and sit a timed entrance exam, aiming for a passing score of 45/100 or higher.'],
            ['Focus and Preparation.', 'We protect the standards of our cohorts. You are granted exactly two (2) attempts. If both attempts are exhausted without passing, your session will be locked to allow you time to study and prepare before applying in a future intake.'],
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
