"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function LockedContent() {
  const searchParams = useSearchParams();
  const score = searchParams.get('score');

  return (
    <div style={{ minHeight: 'calc(100vh - 160px)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '24px', backgroundColor: 'var(--bg-secondary)' }}>
      <div style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--accent)', borderRadius: '8px', padding: '48px 32px', maxWidth: '550px', width: '100%', textAlign: 'center', boxShadow: '0 8px 32px rgba(165,28,48,0.15)' }}>
        
        <div style={{ width: '80px', height: '80px', backgroundColor: 'rgba(165, 28, 48, 0.1)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 32px' }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>

        <h1 style={{ fontSize: '32px', color: 'var(--accent)', marginBottom: '16px', fontWeight: '800' }}>The Gates Are Closed</h1>
        
        <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '16px', borderRadius: '4px', marginBottom: '24px', borderLeft: '4px solid var(--accent)' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>Final Evaluation Score</p>
          <p style={{ color: 'var(--text-primary)', fontSize: '36px', fontWeight: '800', margin: '8px 0' }}>{score || '--'} / 100</p>
        </div>

        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '32px', fontSize: '16px' }}>
          You have exhausted all your audit attempts. You are not ready for this specific revolution at this time. We protect the integrity of this process above all else. Your records have been sealed. 
        </p>

        <Link href="/" style={{ display: 'inline-block', width: '100%', padding: '16px', backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)', border: '1px solid var(--border-medium)', fontWeight: '700', textDecoration: 'none', borderRadius: '4px', fontSize: '18px', transition: 'all 0.2s' }}>
          Return to the Outside World
        </Link>
      </div>
    </div>
  );
}

export default function LockedPage() {
  return (
    <Suspense fallback={<div style={{ padding: '100px', textAlign: 'center' }}>Loading...</div>}>
      <LockedContent />
    </Suspense>
  );
}
