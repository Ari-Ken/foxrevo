import React from 'react';
import Link from 'next/link';
import './about.css';

export default function About() {
  return (
    <div className="about-container">
      
      {/* PAGE HEADER / HERO SECTION */}
      <section className="section-block hero-section">
        <h1 className="hero-headline">Not a Motivation Seminar. An Operating System Upgrade.</h1>
        <p className="hero-subheadline">
          FoxRevo OS is not a book you skim or a series of motivational quotes. It is a systematic deprogramming utility. We dismantle the default employee programming installed in the African builder, and deploy first-principles wealth architectures.
        </p>
        <div className="image-placeholder main-image" style={{ padding: 0, overflow: 'hidden' }}>
          <img src="/image001.jpg" alt="FoxRevo OS Blueprint" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </section>

      {/* SECTION 1: THE ORIGIN */}
      <section className="section-block">
        <h2>The Grief That Built This OS</h2>
        <p>
          FoxRevo was not conceived in a corporate brainstorm. It was born out of profound grief.
        </p>
        <p>
          We watched a generation of brilliant African minds—creative, resilient, capable of global dominance—spend their sharpest years trading hours for pennies. We saw developers building world-class platforms for overseas clients while their own asset columns stayed empty.
        </p>
        <p>
          The problem was never talent. The problem was the curriculum. The educational and cultural systems installed in us were designed to make us useful to someone else's wealth, never to master our own.
        </p>
        <p>
          FoxRevo OS exists to bridge this gap. We translate the documented wealth playbooks of Warren Buffett, Elon Musk, and Aliko Dangote into actionable software utilities and frameworks specifically tailored for the African builder.
        </p>
        <p className="founder-signoff">
          <strong>— Benedict A., Founder</strong>
        </p>
      </section>

      {/* SECTION 2: THE MISSION */}
      <section className="section-block">
        <h2>System Architecture: The Moats We Deploy</h2>
        <p>
          We do not just hand out books. We build functional SaaS dashboard tools to structure your transition from active contractor to asset architect:
        </p>
        
        <div className="mission-points">
          <div className="mission-point">
            <h3>1. The Subconscious Detox</h3>
            <p>Overwrite money wounds and get-rich-quick fallacies. Audit your baseline cash flows, clear overhead leaks, and name the specific unproductive noises draining your capital.</p>
          </div>
          <div className="mission-point">
            <h3>2. Asset Column Tracker</h3>
            <p>Deploy interactive personal balance sheets inside your platform workspace. Chart asset-to-liability ratios and monitor your compounding progress in real-time.</p>
          </div>
          <div className="mission-point">
            <h3>3. Lean Validation Wizard</h3>
            <p>Test business concepts against first-principles friction points. Secure customer pre-signups and evaluate your ideas before spending setup capital.</p>
          </div>
          <div className="mission-point">
            <h3>4. Vetted Partner Directory</h3>
            <p>Connect directly with trusted CAC legal registration agents, corporate dollar banking channels, and integration developers to solve local operational friction.</p>
          </div>
          <div className="mission-point">
            <h3>5. Public Cryptographic Registry</h3>
            <p>Secure verifiable credentials on our registry page (`/verify/[id]`). Display your verified examination scores to global clients and investors.</p>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE PHILOSOPHY */}
      <section className="section-block">
        <h2>Uncompromising Quality Standards</h2>
        <p>
          FoxRevo OS is built only for serious architects. Commitment is the first barrier to entry.
        </p>
        <p className="highlight-truth">
          <strong>Transformation cannot be downloaded. It must be earned.</strong>
        </p>
        <p>
          This is why we maintain strict entry filters: a mandatory entrance examination, a two-attempt limit, and an absolute no-refund policy. Every member inside the dashboard workspace has proven their commitment to deprogramming.
        </p>
        
        <ul className="philosophy-list">
          <li><strong>Step 1: The Detox</strong> - Clear mental noise and lock unproductive cash leaks.</li>
          <li><strong>Step 2: The Rewire</strong> - Master strategic leverage and identify African commercial friction.</li>
          <li><strong>Step 3: The Build</strong> - Validate systems with minimal cash and launch compounding assets.</li>
        </ul>

        <p className="protection-clause">
          We protect this operating system fiercely. Giving someone a shortcut robs them of the transformation process. <strong>The system protects its own.</strong>
        </p>
      </section>

      {/* SECTION 4: THE VISION */}
      <section className="section-block">
        <h2>The 2035 Projection</h2>
        <p>
          By the year 2035, the builders using FoxRevo OS will have established the cornerstone of a new African economy:
        </p>
        
        <ul className="projection-list">
          <li><strong>[X]</strong> Vetted African Billionaires Forged</li>
          <li><strong>[X]</strong> Compounding Millionaire Asset Columns</li>
          <li><strong>[X]</strong> Moat-Protected Tech Startups</li>
          <li><strong>[X]</strong> Globally Competitive African Brands</li>
          <li><strong>[X]</strong> System-Thinking Legacy Architects</li>
        </ul>

        <p>
          We see a day when the world looks at the next great global conglomerate and asks: <em>"Did this really come from Africa?"</em>
        </p>
        <p>
          And the answer will be: <em>Yes. And it was built by the architects of FoxRevo OS.</em>
        </p>
      </section>

      {/* SECTION 5: THE INVITATION */}
      <section className="section-block">
        <h2>Deploy Your Wealth OS Today.</h2>
        <p>Africa has enough noise. It needs builders. System-thinking, asset-compounding builders.</p>
        <p>
          If you are ready to stop performing success and start architecting it, your seat in the workspace is ready. Initialize your profile, pass the clearance exam, and start deprogramming.
        </p>

        <div className="button-group-vertical mt-4">
          <Link href="/register" className="btn btn-primary" style={{ background: 'var(--accent-gradient)', border: '1px solid rgba(255, 62, 108, 0.3)', fontWeight: '700' }}>
            Initialize FoxRevo OS (₦3,000) →
          </Link>
          <Link href="/terms" className="btn btn-secondary" style={{ borderRadius: '8px' }}>
            Review OS Entrance Terms →
          </Link>
        </div>
      </section>

    </div>
  );
}
