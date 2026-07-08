import React from 'react';
import Link from 'next/link';
import './Footer.css';

export default function Footer({ transactional = false, proverb = "The best time to plant a tree was 20 years ago. The second best time is now." }) {
  if (transactional) {
    return (
      <footer className="footer-transactional">
        <div className="proverb-container">
          <p>"{proverb}"</p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="footer-main">
      <div className="footer-content">
        
        {/* Left Side: Records & Flags */}
        <div className="footer-column vision-col">
          <h3 className="vision-title">Estimated Records by 2035</h3>
          <ul className="vision-metrics">
            <li>1,000 African Billionaires Produced</li>
            <li>50,000 African Millionaires Produced</li>
            <li>500 Tech Companies By Africa</li>
            <li>100 Globally Recognized Companies</li>
          </ul>
          <div className="flags-container mt-4">
            <img src="https://flagcdn.com/w40/za.png" alt="South Africa" className="flag-icon-img" />
            <img src="https://flagcdn.com/w40/ke.png" alt="Kenya" className="flag-icon-img" />
            <img src="https://flagcdn.com/w40/gh.png" alt="Ghana" className="flag-icon-img" />
            <img src="https://flagcdn.com/w40/eg.png" alt="Egypt" className="flag-icon-img" />
            <span style={{ margin: '0 4px', fontSize: '12px' }}>➕</span>
            <img src="https://flagcdn.com/w40/ng.png" alt="Nigeria" className="flag-icon-img highlight-flag" />
          </div>
        </div>

        {/* Right Side: Brand & Links */}
        <div className="footer-column brand-col">
          <Link href="/" className="logo">
            FoxRevo<span className="logo-dot">.</span>
          </Link>
          <p className="brand-tagline">The revolution building the next African Billionaires from what's been shared with other nations for centuries.</p>
          <div className="quick-links">
            <Link href="/about">About</Link>
            <Link href="/about">Mission</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Regulations</Link>
            <Link href="/?scroll=register">Register</Link>
            <Link href="/contact">Help</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p className="attribution">Every life changed by this revolution is an acknowledgement. Every company built, every community transformed, is the truest form of gratitude.</p>
        <p className="signoff"><strong>One Love. The Revolution Has Begun.</strong></p>
        <p className="copyright">&copy; {new Date().getFullYear()} FoxRevo. All rights reserved.</p>
      </div>
    </footer>
  );
}
