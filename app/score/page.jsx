import React from 'react';
import Link from 'next/link';

export default function Score() {
  return (
    <div className="section-block" style={{ textAlign: 'center' }}>
      <h2>Your Examination Score</h2>
      <div style={{ fontSize: '48px', fontWeight: 'bold', margin: '24px 0' }}>Score Circle Placeholder</div>
      <p>Performance Tier Badge Placeholder</p>
      
      <div className="button-group" style={{ justifyContent: 'center' }}>
        {/* Pass Scenario */}
        <Link href="/download" className="btn btn-primary">Proceed to Download</Link>
        
        {/* Fail Scenario */}
        <Link href="/exam-prep" className="btn btn-secondary">Rewrite Exam (Attempt 2 of 2)</Link>
      </div>
    </div>
  );
}
