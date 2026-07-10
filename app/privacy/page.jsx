import React from 'react';
import Link from 'next/link';
import './privacy.css';

export default function PrivacyPolicy() {
  return (
    <div className="privacy-container">
      
      {/* PAGE HEADER / HERO SECTION */}
      <section className="section-block hero-section">
        <h1 className="hero-headline">The Architecture of Trust: Your Privacy, Our Standard.</h1>
        <p className="hero-subheadline">
          In a digital economy that routinely trades your attention and private credentials for advertising margins, FoxRevo OS operates differently. Your information is protected by Row Level Security (RLS) policies. It is the foundation of your deprogramming workspace.
        </p>
      </section>

      {/* SECTION 1: THE PHILOSOPHY OF PRIVACY */}
      <section className="section-block">
        <h2>Securing the Mindset Foundation</h2>
        <p>
          This policy details how we guard your identity records, financial tracker logs, and validation scorecards.
        </p>
        <p>
          When you initialize FoxRevo OS, you are building asset ledgers and testing minimum viable ideas. That level of strategic documentation requires isolation.
        </p>
        <p>
          Therefore, our privacy architecture is integrated directly into the database engine. We restrict access to raw inputs to ensure your proprietary business ideas stay private.
        </p>
      </section>

      {/* SECTION 2: DATABASE & LOGS ISOLATION */}
      <section className="section-block">
        <h2>PostgreSQL Row Level Security (RLS) Protection</h2>
        <p>We lock table rows at the database level to ensure only authorized builders query active logs:</p>
        <div className="ui-notice-box mb-4" style={{ backgroundColor: 'rgba(255,255,255,0.02)', padding: '16px', borderLeft: '3px solid var(--accent)', borderRadius: '4px' }}>
          <strong>Your asset entries and ideas validation inputs are strictly private.</strong>
        </div>
        <p>
          When you log cash flow in the **Asset Tracker** or write specifications in the **Lean Validator**, the inputs are mapped to your unique user ID and verified via RLS locks.
        </p>
        <p>
          No other member, candidate, or visitor can view your logs, assets, or scorecards.
        </p>
        <ul className="bullet-list" style={{ paddingLeft: '20px', marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li>We do not share validation blueprints with external registries.</li>
          <li>We do not sell financial tracker stats to credit bureaus or marketers.</li>
          <li>Your workspace logs are private, secure, and isolated.</li>
        </ul>
      </section>

      {/* SECTION 3: WHAT WE SECURE & WHY */}
      <section className="section-block">
        <h2>Minimal Data Footprint</h2>
        <p>We collect only the metrics required to satisfy OS functionality:</p>
        
        <div className="data-list-container">
          <div className="data-item">
            <h3>1. Cryptographic Registration Data</h3>
            <p>We store your legal name, email address, and dynamic candidate credentials. This ensures your graduate certificate verifies accurately on the registry.</p>
          </div>
          
          <div className="data-item">
            <h3>2. RLS Utility Logs</h3>
            <p>We securely save your progress in the Academy, your micro-insight posts, asset ratio indicators, and validation scorecards to maintain your compounding roadmap timeline.</p>
          </div>
          
          <div className="data-item">
            <h3>3. Secure Checkout Transactions</h3>
            <p>Financial fees are handled directly by Flutterwave secure payment tokens. FoxRevo OS never intercepts or stores card pins, bank log details, or billing codes.</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-top">
          <h3 className="mb-2 text-wine">Zero Advertising Tracking</h3>
          <p>
            We do not load third-party ad networks, tracking pixels, or cookie crawlers to sell you goods. We build tools, not advertisement traps.
          </p>
        </div>
      </section>

      {/* SECTION 4: THE PUBLIC VERIFICATION OPT-IN */}
      <section className="section-block">
        <h2>Cryptographic Certificate Registry</h2>
        <p>
          Upon clearing the curriculum assessments, your graduation credential becomes public via `/verify/[certificate_id]`.
        </p>
        <p>
          This is designed as an asset: it allows you to present proof of mastery to global clients and investors. The verification displays your legal name, exam score, and completion timestamp. To request removal of your credentials from the public registry, contact us.
        </p>
      </section>

      {/* SECTION 5: SYSTEM TERMINATION PROCEDURES */}
      <section className="section-block">
        <h2>Data Deletion</h2>
        <p>
          If you wish to terminate your FoxRevo OS profile, submit a request. Your identity entries, metrics history, validation wizards, and community posts will be permanently purged from our database records within 30 days.
        </p>

        <div className="button-group-vertical mt-4">
          <Link href="/" className="btn btn-primary" style={{ background: 'var(--accent-gradient)', border: '1px solid rgba(255, 62, 108, 0.3)', fontWeight: '700' }}>
            Return to Homepage
          </Link>
        </div>
      </section>

    </div>
  );
}
