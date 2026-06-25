"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function SuccessContent() {
  const searchParams = useSearchParams();
  const score = searchParams.get('score');

  return (
    <div style={{ minHeight: 'calc(100vh - 160px)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '24px', backgroundColor: 'var(--bg-secondary)' }}>
      <div style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-medium)', borderRadius: '8px', padding: '48px 32px', maxWidth: '550px', width: '100%', textAlign: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
        
        <div style={{ width: '80px', height: '80px', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 32px' }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>

        <h1 style={{ fontSize: '32px', color: 'var(--text-primary)', marginBottom: '16px', fontWeight: '800' }}>The Gate is Open</h1>
        
        <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '16px', borderRadius: '4px', marginBottom: '24px' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>Evaluation Score</p>
          <p style={{ color: '#10B981', fontSize: '36px', fontWeight: '800', margin: '8px 0' }}>{score || '--'} / 100</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>Passed standard: 45/100</p>
        </div>

        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '32px', fontSize: '16px' }}>
          You have proven your readiness. The noise has been filtered out. You have successfully dismantled the first cage. The architecture of your new life awaits on the other side.
        </p>

        <Link href="/download" style={{ display: 'inline-block', width: '100%', padding: '16px', backgroundColor: '#10B981', color: 'white', fontWeight: '700', textDecoration: 'none', borderRadius: '4px', fontSize: '18px', transition: 'opacity 0.2s' }}>
          Enter the Sanctuary (Dashboard)
        </Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div style={{ padding: '100px', textAlign: 'center' }}>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
