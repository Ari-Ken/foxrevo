import React from 'react';
import Link from 'next/link';

export default function ConfirmationPage() {
  return (
    <div style={{ minHeight: 'calc(100vh - 160px)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '24px' }}>
      <div style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-medium)', borderRadius: '8px', padding: '48px 32px', maxWidth: '500px', width: '100%', textAlign: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
        
        <div style={{ width: '64px', height: '64px', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 24px' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>

        <h1 style={{ fontSize: '28px', color: 'var(--text-primary)', marginBottom: '16px', fontWeight: '800' }}>Clearance Granted</h1>
        
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '24px', fontSize: '15px' }}>
          Your clearance fee has been processed. You are now officially recognized by the system. The next phase is the preparatory architecture. Do not proceed until you are in a quiet room, ready to focus.
        </p>

        <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '16px', borderRadius: '4px', borderLeft: '4px solid #10B981', marginBottom: '32px', textAlign: 'left' }}>
          <p style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: '600' }}>Status: SECURED</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '4px' }}>A receipt has been sent to your registered email.</p>
        </div>

        <Link href="/dashboard" style={{ display: 'inline-block', width: '100%', padding: '16px', backgroundColor: 'var(--accent)', color: 'white', fontWeight: '600', textDecoration: 'none', borderRadius: '4px', transition: 'opacity 0.2s' }}>
          Proceed to Dashboard
        </Link>
      </div>
    </div>
  );
}
