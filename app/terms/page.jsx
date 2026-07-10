import React from 'react';
import Link from 'next/link';
import './terms.css';

export default function Terms() {
  return (
    <div className="terms-container">
      
      {/* PAGE HEADER / HERO SECTION */}
      <section className="section-block hero-section">
        <h1 className="hero-headline">The Terms of Entry. The Rules of the Operating System.</h1>
        <p className="hero-subheadline">
          FoxRevo OS is a disciplined deprogramming environment. The terms below are not administrative bureaucracy. They are the structural rules that protect the integrity of the platform.
        </p>
        <p className="hero-warning">
          Read them carefully. If you cannot accept them, do not apply. The system is only for those who are ready to satisfy the criteria.
        </p>
      </section>

      {/* SECTION 1: THE PHILOSOPHY OF THE TERMS */}
      <section className="section-block">
        <h2>Why We Are Uncompromising</h2>
        <p>Before you read the specific rules, you must understand the principle behind them.</p>
        <p className="highlight-truth">
          <strong>Transformation cannot be downloaded. It must be earned.</strong>
        </p>
        <p>
          The manual, the assets tracker, and the community feed inside FoxRevo are deprogramming tools. A person who receives this operating system without going through the process of committing, paying the price of attention, and proving their readiness will not change. 
        </p>
        <p>
          These terms protect the integrity of the community. They ensure that when you enter the workspace, you are surrounded by verified builders.
        </p>
      </section>

      {/* SECTION 2: THE FINANCIAL COMMITMENT */}
      <section className="section-block">
        <h2>The Investment and The Standard</h2>
        <p>
          The registration fee is the first physical demonstration of your commitment. You are registering your profile on the secure verification engine.
        </p>
        
        <div className="terms-list-container">
          <div className="term-item">
            <h3>1. The Profile Initialization Fee</h3>
            <p>The current registration fee to initialize your profile and access the entrance examination is <strong>₦3,000</strong> (payment gateway and transaction charges may apply depending on your location).</p>
          </div>
          
          <div className="term-item">
            <h3>2. Vetted Builder Threshold</h3>
            <p>This fee is introductory. <strong className="text-wine">Notice:</strong> The profile initialization fee automatically increases to <strong>₦5,000</strong> after 1,000 verified builders have cleared the entrance standards.</p>
          </div>
          
          <div className="term-item">
            <h3>3. Strict No-Refund Policy</h3>
            <p><strong>There are absolutely no refunds under any circumstances.</strong></p>
            <p>You are paying to initialize your candidate profile on the verification database. The fee covers the computation of your examination, RLS table security configurations, and credential verification checks. If you fail the exam, the process is still executed. Therefore, no refunds are issued. Do not apply if you are not certain of your commitment.</p>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE EXAMINATION & INTEGRITY REGULATIONS */}
      <section className="section-block">
        <h2>The Entrance Examination</h2>
        <p>
          The exam verifies your mental readiness to receive the modular training vault.
        </p>
        
        <div className="terms-list-container">
          <div className="term-item">
            <h3>1. Mandatory Entrance Exam</h3>
            <p>Payment of the fee does not grant automatic access to the dashboard utilities. You must pass the FoxRevo Entrance Examination (45/50 passing mark).</p>
          </div>
          
          <div className="term-item">
            <h3>2. The Two-Attempt Gate</h3>
            <p>You are granted exactly <strong>two (2) attempts</strong> to clear the examination.</p>
            <ul className="bullet-list" style={{ paddingLeft: '20px', marginTop: '8px' }}>
              <li>If you pass, your access credentials activate, unlocking the deprogramming roadmap.</li>
              <li>If you fail both attempts, your profile is locked out. You can reset your logs and re-register by paying the profile fee again, resetting your exam attempts limit.</li>
            </ul>
          </div>
          
          <div className="term-item">
            <h3>3. Cheating Disqualification</h3>
            <p className="text-wine font-bold">Any candidate attempting to copy, use external resources, or falsify examination inputs will be permanently disqualified.</p>
            <p>The exam measures your baseline deprogramming. Cheating defeats the purpose of mindset rewiring. Facilitators monitor logs; compromised profiles are banned immediately.</p>
          </div>
        </div>
      </section>

      {/* SECTION 4: INTELLECTUAL PROPERTY & ANTI-SHARING */}
      <section className="section-block">
        <h2>The Anti-Sharing Clause (Protecting the Process)</h2>
        <p>This is the core regulation of the FoxRevo community.</p>
        <p>Sharing your dashboard credentials or downloaded files with someone who did not earn them is not generosity—it is robbery. You are robbing them of the detox and examination process required to change their mindset.</p>
        
        <div className="terms-list-container mt-4">
          <div className="term-item">
            <h3>1. Non-Transferable Access</h3>
            <p>Your dashboard profile, cryptographic ID, and training vault are mapped strictly to your verified email identity.</p>
          </div>
          <div className="term-item">
            <h3>2. Distribution Ban</h3>
            <p>You may not share or forward any part of the FoxRevo OS manuals, lectures, or directories. This includes WhatsApp groups, public repositories, or cloud drives.</p>
          </div>
          <div className="term-item">
            <h3>3. Immediate Expulsion</h3>
            <p>If our security systems detect multiple concurrent sessions or unauthorized distribution of assets, your access token is <strong className="text-wine">permanently blacklisted</strong> without appeal or refund.</p>
          </div>
        </div>
      </section>

      {/* SECTION 5: CODE OF CONDUCT & COMMUNITY STANDARDS */}
      <section className="section-block">
        <h2>The Builder's Code</h2>
        <p>Accepted members enter a focused sanctuary of legated wealth builders. Distractions and noise are prohibited.</p>
        
        <div className="terms-list-container mt-4">
          <div className="term-item">
            <h3>1. No Performance, Only Building</h3>
            <p>You will not use the TikTok of Wealth feed or community forums to perform success. You will not promote get-rich schemes or pitch external offers. You are here to document real metrics and systems.</p>
          </div>
          <div className="term-item">
            <h3>2. Radical Responsibility</h3>
            <p>Complaints about the environment, the economy, or external barriers are not permitted without logging your personal structural response. We audit leaks; we do not nurse excuses.</p>
          </div>
          <div className="term-item">
            <h3>3. Vetted Collaboration</h3>
            <p>Respect other builders, registry facilitators, and CAC/banking directory partners. Abusive behavior results in immediate token revocation.</p>
          </div>
        </div>
      </section>

      {/* SECTION 6: TERMINATION & REVOCATION */}
      <section className="section-block">
        <h2>The Right of Exit</h2>
        <p>
          FoxRevo OS reserves the right to terminate your account and blacklist your cryptographic verification ID if you violate these terms or compromise assessment integrity. Expelled profiles are permanently locked.
        </p>
      </section>

      {/* SECTION 7: THE FINAL DECLARATION */}
      <section className="section-block declaration-section">
        <h2>Do You Accept?</h2>
        <p>You have read the terms. You acknowledge that the initialization fee is non-refundable, exam limits are enforced, cheating triggers blacklisting, and sharing materials compromises the process.</p>
        <p className="mt-4">
          If you accept these terms, proceed to the register block and initialize your profile.
        </p>
        <p>
          If you do not accept, close this portal. The operating system will be here when you are ready to take it seriously.
        </p>

        <div className="button-group-vertical mt-4">
          <Link href="/register" className="btn btn-primary" style={{ background: 'var(--accent-gradient)', border: '1px solid rgba(255, 62, 108, 0.3)', fontWeight: '700' }}>
            I Accept. Initialize FoxRevo OS (₦3,000)
          </Link>
          <Link href="/" className="btn btn-secondary">
            I Do Not Accept. Return to Homepage
          </Link>
        </div>
      </section>

    </div>
  );
}
