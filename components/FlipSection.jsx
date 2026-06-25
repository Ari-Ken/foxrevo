"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function FlipSection() {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleBeginRegistration = (e) => {
    e.preventDefault();
    setIsFlipped(true);
  };

  return (
    <div className="flip-container" id="register">
      <div className={`flipper ${isFlipped ? 'flipped' : ''}`}>
        
        {/* SECTION 4 (FRONT): HOW TO REGISTER */}
        <div className="front">
          <h2>How to Join the Revolution</h2>
          <p>
            The revolution's mission is to build billionaires. It is not for everybody. It is reserved for those who have developed the right mindset and are ready to prove they are serious before the reward arrives.
          </p>
          <div className="process-list" style={{ marginTop: '24px', marginBottom: '24px' }}>
            <div className="process-item" style={{ padding: '12px 0', borderBottom: '1px solid var(--border-light)' }}><strong>1. Read:</strong> Study the foundational article we provide.</div>
            <div className="process-item" style={{ padding: '12px 0', borderBottom: '1px solid var(--border-light)' }}><strong>2. Test:</strong> Take the Entrance Examination.</div>
            <div className="process-item" style={{ padding: '12px 0' }}><strong>3. Assess:</strong> The Revolution Exam Team reviews your qualifications and decides the next step.</div>
          </div>
          
          <div className="button-group-vertical mt-4">
            <button onClick={handleBeginRegistration} className="btn btn-primary" type="button">Begin the Registration</button>
            <Link href="#faq" className="text-link">Learn more about this process</Link>
          </div>
        </div>

        {/* SECTION 5 (BACK): TERMS OF ENTRY */}
        <div className="back">
          <h2>The Terms of Entry</h2>
          <p>First, find out why you're here. Then, apply to be a member. We've summarized our terms in 5 bullet points. <strong>Do not apply if you do not accept our terms.</strong></p>
          
          <div className="ui-notice-box urgent-notice mb-4 mt-4">
            <strong>⚠️ Urgent Notice:</strong> Our registration fee will increase to <strong>₦5,000</strong> as soon as we round up our first 1,000 finalists for 2026. Secure your spot now.
          </div>

          <ul className="terms-list">
            <li><strong>Payment:</strong> ₦3,000 registration fee (bank charges may apply depending on country/location).</li>
            <li><strong>Commitment:</strong> Strictly no refunds. The process is the preparation; you are paying for the architecture of your new life.</li>
            <li><strong>Examination:</strong> An Entrance Examination must be taken to prove your readiness. A minimum score of 45/100 is required to pass.</li>
            <li><strong>Opportunities:</strong> You are granted exactly <strong>two chances</strong> to pass the exam.</li>
            <li><strong>Integrity:</strong> Zero tolerance for cheating. The exam is a mirror showing you who you are—do not lie to it.</li>
          </ul>

          <div className="button-group-vertical mt-4">
            <Link href="/register" className="btn btn-primary">Create Identity & Proceed to Clearance</Link>
            <Link href="#faq" className="text-link">Ask questions about the above terms</Link>
          </div>
        </div>
        
      </div>
    </div>
  );
}
