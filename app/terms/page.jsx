import React from 'react';
import Link from 'next/link';
import './terms.css';

export default function Terms() {
  return (
    <div className="terms-container">
      
      {/* PAGE HEADER / HERO SECTION */}
      <section className="section-block hero-section">
        <h1 className="hero-headline">The Terms of Entry. The Architecture of Commitment.</h1>
        <p className="hero-subheadline">
          FoxRevo is not a subscription. It is not a casual seminar. It is a deliberate, disciplined dismantling of your old self and the construction of a new one. The terms below are not bureaucracy. They are the first construction site of your new life.
        </p>
        <p className="hero-warning">
          Read them carefully. If you cannot accept them, do not apply. The revolution is not for everyone. It is only for those who are ready to earn it.
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
          The principles inside FoxRevo are not just information; they are transformation tools. A person who receives this revolution without going through the process of committing, paying the price of attention, and proving their readiness will read the same words as a committed member, and nothing will change inside them. Not because the words are less powerful, but because they did not break their old self down first.
        </p>
        <p>
          These terms are designed to protect the integrity of the process. They are designed to ensure that when you receive the blueprints, the soil of your mind has been properly prepared to receive them.
        </p>
        <p className="protection-clause">
          <strong>The revolution protects its own. And to do that, it must be fiercely selective.</strong>
        </p>
      </section>

      {/* SECTION 2: THE FINANCIAL COMMITMENT */}
      <section className="section-block">
        <h2>The Investment and The Standard</h2>
        <p>
          The registration fee is not a purchase price for information. It is the first physical demonstration of your commitment. It is the moment you prove that you value your transformation enough to invest in it.
        </p>
        
        <div className="terms-list-container">
          <div className="term-item">
            <h3>1. The Registration Fee</h3>
            <p>The current registration fee to access the entrance examination and the foundational materials is <strong>₦3,000</strong> (bank charges may apply depending on your country/location and payment gateway).</p>
          </div>
          
          <div className="term-item">
            <h3>2. The 2026 Finalist Threshold</h3>
            <p>This fee is introductory. <strong className="text-wine">Notice:</strong> Our registration fee will automatically increase to <strong>₦5,000</strong> as soon as we round up our first 1,000 finalists for 2026. Secure your position now.</p>
          </div>
          
          <div className="term-item">
            <h3>3. The Strict No-Refund Policy</h3>
            <p><strong>There are absolutely no refunds under any circumstances.</strong></p>
            <p>You are not paying for a product; you are paying for entry into a process. The fee covers the administrative architecture of your assessment, the maintenance of the examination portal, and the curation of the community. If you register and decide not to take the exam, or if you fail the exam, the process has still been executed on our end. The soil was still prepared. Therefore, no refunds will be issued. Do not pay this fee if you are not 100% certain of your intention to see the process through.</p>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE EXAMINATION & INTEGRITY REGULATIONS */}
      <section className="section-block">
        <h2>The Crucible of the Entrance Exam</h2>
        <p>
          The entrance examination is not a gatekeeping mechanism designed to keep you out. It is a mirror designed to show you who you already are. It proves, before the lesson begins, that you are ready to receive it.
        </p>
        
        <div className="terms-list-container">
          <div className="term-item">
            <h3>1. Mandatory Examination</h3>
            <p>Payment of the registration fee does not grant you automatic access to the core revolution materials. You must successfully pass the FoxRevo Entrance Examination.</p>
          </div>
          
          <div className="term-item">
            <h3>2. The Rule of Two Chances</h3>
            <p>You are granted exactly <strong>two (2) attempts</strong> to pass the examination.</p>
            <ul className="bullet-list">
              <li>If you pass on the first or second attempt, you will be accepted into the revolution.</li>
              <li>If you fail both attempts, your registration will be closed. We protect the integrity of the community by ensuring only those who demonstrate readiness are admitted. There are no third chances, no appeals, and no exceptions.</li>
            </ul>
          </div>
          
          <div className="term-item">
            <h3>3. Zero Tolerance for Cheating</h3>
            <p className="text-wine font-bold">There is a strict, zero-tolerance policy against cheating, using AI to generate answers, or having another person take the exam on your behalf.</p>
            <p>The exam is a mirror showing you who you are—<em>do not lie to it</em>. If you cheat, you are not tricking FoxRevo; you are only robbing yourself of the very transformation you came here to find. Any member found to have cheated will be immediately and permanently banned, and their fee will be forfeited.</p>
          </div>
        </div>
      </section>

      {/* SECTION 4: INTELLECTUAL PROPERTY & ANTI-SHARING */}
      <section className="section-block">
        <h2>Protecting the Process (The Anti-Robbery Clause)</h2>
        <p>This is the most critical regulation of the FoxRevo revolution.</p>
        <p>Someone may ask you to share your login, your PDF, or your access to the revolution with them. They may frame it as generosity. They may say, <em>"Help me na, just send it."</em></p>
        <div className="ui-notice-box urgent-notice mt-4 mb-4">
          <strong>Sharing this material with someone who did not earn it is not kindness. It is robbery.</strong>
        </div>
        <p>
          You are not robbing FoxRevo. You are robbing <em>them</em>. If they receive the materials without going through the detox, without paying the fee, and without passing the exam, the words will not change them. You will be giving them a shortcut that costs them the very transformation they need most.
        </p>

        <div className="terms-list-container mt-4">
          <div className="term-item">
            <h3>1. Strict Non-Transferability</h3>
            <p>Your registration, login credentials, and access to all FoxRevo materials (including <em>The Wealth Revolution</em> book, lectures, and community forums) are strictly non-transferable.</p>
          </div>
          <div className="term-item">
            <h3>2. Prohibition of Sharing</h3>
            <p>You may not share, distribute, copy, record, or forward any part of the FoxRevo materials to any third party. This includes sending files via WhatsApp, email, or uploading them to any public or private drive.</p>
          </div>
          <div className="term-item">
            <h3>3. Revocation for Sharing</h3>
            <p>If our systems detect that your credentials have been shared, or if you are found distributing the materials, your access will be <strong className="text-wine">immediately and permanently revoked without refund</strong>. You will be expelled from the revolution.</p>
          </div>
        </div>

        <p className="mt-4">
          <em>If you want someone to have access to this revolution, send them to FoxRevo. Let them earn it. That is the greatest gift you can give them.</em>
        </p>
      </section>

      {/* SECTION 5: CODE OF CONDUCT & COMMUNITY STANDARDS */}
      <section className="section-block">
        <h2>The Builder's Ethos</h2>
        <p>When you are accepted into FoxRevo, you are entering a sanctuary of excellence. The noise of the outside world is not permitted inside.</p>
        
        <div className="terms-list-container mt-4">
          <div className="term-item">
            <h3>1. No Performance, Only Building</h3>
            <p>You will not use the FoxRevo community or materials to perform success. You will not use the platform to solicit members for your schemes, promote your shortcuts, or sell your noise. You are here to build.</p>
          </div>
          <div className="term-item">
            <h3>2. Radical Responsibility</h3>
            <p>You will not use the community to complain about the government, the economy, or your environment without also taking radical responsibility for your own outcomes. We acknowledge the barriers, but we do not use them as excuses.</p>
          </div>
          <div className="term-item">
            <h3>3. Respect for the Architecture</h3>
            <p>You will respect the process, the examiners, the facilitators, and your fellow members. Disruptive, abusive, or entitled behavior will result in immediate removal.</p>
          </div>
        </div>
      </section>

      {/* SECTION 6: TERMINATION & REVOCATION */}
      <section className="section-block">
        <h2>The Right of Exit</h2>
        <p>
          FoxRevo reserves the right to terminate your membership and revoke your access to all materials, without refund, at its sole discretion, if you violate any of these terms, compromise the integrity of the examination, or breach the code of conduct.
        </p>
        <p className="mt-4 text-wine font-bold">
          Once expelled for a violation of these terms, you are permanently barred from re-entering the FoxRevo revolution.
        </p>
      </section>

      {/* SECTION 7: THE FINAL DECLARATION */}
      <section className="section-block declaration-section">
        <h2>Do You Accept?</h2>
        <p>You have read the terms. You understand that this is not a casual purchase. You understand that the fee is non-refundable, the exam allows only two chances, cheating results in immediate expulsion, and sharing the materials is an act of robbery against the recipient.</p>
        <p className="mt-4">
          If you accept these terms, you are ready to proceed to the checkout and begin the registration process.
        </p>
        <p>
          If you do not accept these terms, <strong>do not apply.</strong> Close this page. The revolution will still be here when you are ready to take it seriously.
        </p>

        <div className="button-group-vertical mt-4">
          <Link href="/register" className="btn btn-primary">I Accept. Proceed to Registration.</Link>
          <Link href="/" className="btn btn-secondary">I Do Not Accept. Take Me Back to the Homepage.</Link>
        </div>
      </section>

    </div>
  );
}
