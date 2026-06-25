"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function ExamInstructions() {
  const [agreed, setAgreed] = useState(false);

  return (
    <div style={{ minHeight: 'calc(100vh - 80px)', backgroundColor: 'var(--bg-primary)', padding: '40px 24px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ maxWidth: '800px', width: '100%' }}>
        
        <div style={{ borderBottom: '1px solid var(--border-medium)', paddingBottom: '24px', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '800', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Examination Protocols
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px', fontSize: '16px' }}>
            Standard Computer-Based Testing (CBT) Rules & Regulations
          </p>
        </div>

        <div className="ui-notice-box urgent-notice mb-6" style={{ borderLeft: '4px solid #A51C30' }}>
          <strong style={{ color: '#A51C30', fontSize: '18px' }}>⚠️ CRITICAL WARNING</strong>
          <p style={{ marginTop: '8px', color: 'var(--text-primary)', lineHeight: '1.6' }}>
            You are about to enter a highly sensitive, timed examination environment. Do not proceed until you have carefully read and understood every instruction below. Ignorance of the protocols will not be accepted as an excuse for technical failures.
          </p>
        </div>

        <div style={{ backgroundColor: 'var(--bg-tertiary)', borderRadius: '8px', border: '1px solid var(--border-light)', padding: '32px' }}>
          <h3 style={{ fontSize: '20px', color: 'var(--text-primary)', marginBottom: '24px', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>
            Standard Operating Procedures
          </h3>

          <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '15px' }} className="instructions-list">

            
            <li style={{ marginBottom: '20px' }}>
              <strong style={{ color: 'var(--text-primary)' }}>Time Constraints:</strong> The examination is strictly timed. A digital timer will be visible at the top of your screen. When the timer hits <code>00:00</code>, your answers will be automatically submitted exactly as they are. Manage your time efficiently.
            </li>
            
            <li style={{ marginBottom: '20px' }}>
              <strong style={{ color: 'var(--text-primary)' }}>Grid Navigation System:</strong> A question grid map is provided on your screen. You do not need to answer questions linearly. 
              <ul style={{ paddingLeft: '24px', marginTop: '8px', listStyleType: 'disc' }}>
                <li><span style={{ color: '#10B981', fontWeight: 'bold' }}>Green</span> indicates a question you have answered.</li>
                <li><span style={{ color: '#64748B', fontWeight: 'bold' }}>Gray</span> indicates an unanswered question.</li>
                <li>Click any number on the grid to instantly jump to that specific question.</li>
              </ul>
            </li>

            <li style={{ marginBottom: '20px' }}>
              <strong style={{ color: 'var(--text-primary)' }}>Completeness:</strong> There is no negative marking. You are strongly advised to answer all questions. Ensure your entire navigation grid has turned green before you click the final submit button.
            </li>

            <li style={{ marginBottom: '20px' }}>
              <strong style={{ color: 'var(--text-primary)' }}>System Stability & Actions:</strong> 
              <br/>- Ensure your internet connection is highly stable before clicking Start.
              <br/>- <strong>DO NOT</strong> refresh your browser page.
              <br/>- <strong>DO NOT</strong> click the 'Back' button on your browser.
              <br/>- Doing either will instantly terminate your session and exhaust one of your two allowed attempts.
            </li>
          </ol>
        </div>

        <div style={{ marginTop: '32px', backgroundColor: 'var(--bg-tertiary)', padding: '24px', borderRadius: '8px', border: '1px solid var(--border-medium)' }}>
          <label style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              style={{ marginTop: '6px', marginRight: '16px', width: '20px', height: '20px', accentColor: '#A51C30' }}
            />
            <span style={{ color: 'var(--text-primary)', fontSize: '15px', lineHeight: '1.6' }}>
              I declare that I have read the examination protocols. I understand that my identity is tied to my current session, and that refreshing the page will terminate my session. I am ready to begin.
            </span>
          </label>
        </div>

        <div style={{ marginTop: '32px', textAlign: 'right' }}>
          <Link 
            href={agreed ? "/exam" : "#"} 
            className={`btn btn-large ${agreed ? 'btn-primary' : 'btn-disabled'}`}
            style={{ 
              display: 'inline-block', 
              opacity: agreed ? 1 : 0.5, 
              cursor: agreed ? 'pointer' : 'not-allowed',
              pointerEvents: agreed ? 'auto' : 'none'
            }}
          >
            Commence Examination
          </Link>
        </div>

      </div>
    </div>
  );
}
