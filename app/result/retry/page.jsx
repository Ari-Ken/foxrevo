"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function RetryPage() {
  const searchParams = useSearchParams();
  const score = searchParams.get('score');
  const remaining = searchParams.get('remaining');

  return (
    <div style={{ minHeight: 'calc(100vh - 160px)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '24px', backgroundColor: 'var(--bg-secondary)' }}>
      <div style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-medium)', borderRadius: '8px', padding: '48px 32px', maxWidth: '550px', width: '100%', textAlign: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
        
        <div style={{ width: '80px', height: '80px', backgroundColor: 'rgba(245, 158, 11, 0.1)', border: '1px solid #F59E0B', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 32px' }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>

        <h1 style={{ fontSize: '32px', color: 'var(--text-primary)', marginBottom: '16px', fontWeight: '800' }}>Evaluation Failed</h1>
        
        <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '16px', borderRadius: '4px', marginBottom: '24px' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>Evaluation Score</p>
          <p style={{ color: 'var(--accent)', fontSize: '36px', fontWeight: '800', margin: '8px 0' }}>{score || '--'} / 100</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>Passed standard: 45/100</p>
        </div>

        <p style={{ color: 'var(--text-primary)', fontWeight: '700', fontSize: '18px', marginBottom: '12px' }}>
          You have {remaining || '1'} attempt remaining.
        </p>

        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '32px', fontSize: '16px' }}>
          You are not yet ready. The required principles have not been fully installed. Do not take your final attempt lightly. Return to the preparatory blueprint. Study the noise, understand the system, and come back when the architecture is solid.
        </p>

        <Link href="/exam-prep" style={{ display: 'inline-block', width: '100%', padding: '16px', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-medium)', fontWeight: '700', textDecoration: 'none', borderRadius: '4px', fontSize: '18px', transition: 'all 0.2s' }}>
          Return to the Blueprint
        </Link>
      </div>
    </div>
  );
}
