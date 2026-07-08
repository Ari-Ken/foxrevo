"use client";
import React from 'react';
import Link from 'next/link';
import './Footer.css';

export default function Footer({ transactional = false }) {
  const handleRegisterClick = (e) => {
    if (typeof window !== 'undefined' && window.location.pathname === '/') {
      e.preventDefault();
      const el = document.getElementById('register');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  if (transactional) {
    return (
      <footer className="footer-transactional">
        <div className="proverb-container">
          <p>"The best time to plant a tree was 20 years ago. The second best time is now."</p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="footer-main">
      <div className="footer-content">
        
        {/* Left Side: Stats */}
        <div className="footer-column stats-col">
          <h3 className="stats-title">Estimated by 2035</h3>
          <ul className="stats-list">
            <li>500+ African Billionaires Produced</li>
            <li>10,000+ African Millionaires Produced</li>
            <li>1,000+ Tech Companies Founded by Africans</li>
            <li>500+ Globally Recognised Companies from Africa</li>
            <li>10,000+ World-Competing Entrepreneurs</li>
          </ul>
        </div>

        {/* Right Side: Brand & Links */}
        <div className="footer-column brand-col">
          <Link href="/" className="logo">
            FOXREVO
          </Link>
          <p className="brand-tagline">The Revolution Building Nigeria's Next Billionaires.</p>
          
          <div className="quick-links-grid">
            <Link href="/about">About</Link>
            <Link href="/about#mission">Mission</Link>
            <Link href="/terms">Terms and Conditions</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms#regulations">Regulations</Link>
            <Link href="/?scroll=register" onClick={handleRegisterClick}>Register</Link>
            <Link href="/contact">Help</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>

      </div>

      {/* Flag list and CTA Button */}
      <div className="footer-mid">
        <div className="flags-box">
          <span className="flags-label">The revolution starts in Nigeria. It does not end there.</span>
          <div className="flags-container mt-2">
            <img src="https://flagcdn.com/w40/za.png" alt="South Africa" className="flag-icon-img" />
            <img src="https://flagcdn.com/w40/ke.png" alt="Kenya" className="flag-icon-img" />
            <img src="https://flagcdn.com/w40/gh.png" alt="Ghana" className="flag-icon-img" />
            <img src="https://flagcdn.com/w40/eg.png" alt="Egypt" className="flag-icon-img" />
            <span style={{ margin: '0 8px', fontSize: '12px', color: 'var(--text-tertiary)' }}>➕</span>
            <img src="https://flagcdn.com/w40/ng.png" alt="Nigeria" className="flag-icon-img highlight-flag" />
          </div>
        </div>
        
        <div className="footer-cta-box">
          <Link href="/?scroll=register" onClick={handleRegisterClick} className="footer-btn-primary">
            Join the Revolution →
          </Link>
        </div>
      </div>

      {/* Attribution and copyright */}
      <div className="footer-bottom">
        <p className="attribution">
          Built on the documented wisdom of the world's most successful leaders and wealthiest people. Every principle inside FoxRevo is cited, attributed, and traceable to its origin. FoxRevo is not the author of this knowledge. FoxRevo is the bridge that brings it to Africa.
        </p>
        <p className="signoff">With love for Nigeria. With belief in Africa. With urgency for this generation.</p>
        <p className="copyright">&copy; {new Date().getFullYear()} FOXREVO. All rights reserved.</p>
      </div>
    </footer>
  );
}
