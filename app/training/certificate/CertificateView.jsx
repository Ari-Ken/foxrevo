"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Printer } from 'lucide-react';
import Link from 'next/link';
import './certificate.css';

export default function CertificateView({ candidate }) {
  const [fullName, setFullName] = useState(candidate.full_name || '');
  const [businessVenture, setBusinessVenture] = useState('E-commerce & Service Arbitrage');
  const [revenueTarget, setRevenueTarget] = useState('5,000,000');
  const [scale, setScale] = useState(1);

  // Resize listener to maintain a clean 16:9 ratio in the web browser view
  useEffect(() => {
    function handleResize() {
      if (window.matchMedia('print').matches) return;
      const stage = document.getElementById('stage');
      if (stage) {
        const stageWidth = stage.clientWidth;
        setScale(stageWidth / 1920);
      }
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const formatDate = () => {
    return new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getVerificationCode = () => {
    const combined = `${candidate.email}-foxrevo-completion`;
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
      hash = (hash << 5) - hash + combined.charCodeAt(i);
      hash = hash & hash;
    }
    return `FXRV-${Math.abs(hash).toString(10).toUpperCase().substring(0, 4)}-${Math.abs(hash).toString(16).toUpperCase().substring(0, 2)}-${Math.abs(hash).toString(36).toUpperCase().substring(0, 3)}`;
  };

  return (
    <div className="cert-page-container">
      
      {/* Control panel & print triggers (hidden during print) */}
      <div className="cert-control-panel print-hide">
        <h3 className="cert-panel-title">Verify & Customize Certificate</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13px', margin: 0 }}>
          Confirm your graduation details. You can enter your planned business venture and target revenue to personalize your official certificate before exporting.
        </p>

        <div className="cert-inputs-grid">
          <div className="cert-input-group">
            <label>Recipient Name</label>
            <input 
              type="text" 
              value={fullName} 
              onChange={(e) => setFullName(e.target.value)} 
              placeholder="Recipient Name"
            />
          </div>
          <div className="cert-input-group">
            <label>Chosen Business Venture</label>
            <input 
              type="text" 
              value={businessVenture} 
              onChange={(e) => setBusinessVenture(e.target.value)} 
              placeholder="e.g. Digital Arbitrage / Logistics"
            />
          </div>
          <div className="cert-input-group">
            <label>6-Month Revenue Target (₦)</label>
            <input 
              type="text" 
              value={revenueTarget} 
              onChange={(e) => setRevenueTarget(e.target.value)} 
              placeholder="e.g. 5,000,000"
            />
          </div>
        </div>

        <div className="cert-actions-row">
          <Link href="/dashboard" className="back-link">
            <ArrowLeft size={16} style={{ marginRight: '6px' }} />
            Return to Dashboard
          </Link>

          <button onClick={handlePrint} className="print-trigger-btn">
            <Printer size={18} style={{ marginRight: '8px' }} />
            Print / Save as PDF
          </button>
        </div>
      </div>

      {/* THE PRINTABLE CERTIFICATE VIEW */}
      <div className="stage" id="stage" style={{ height: `${1080 * scale}px` }}>
        <div className="certificate" id="certificate" style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
          
          {/* Watermark */}
          <div className="watermark">
            <div className="watermark-text">FOXREVO</div>
          </div>

          <div className="inner">
            
            {/* Top bar */}
            <div className="topbar">
              <div className="logo">
                <svg width="54" height="54" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-label="FoxRevo logo">
                  <path d="M8 14 L20 6 L28 22 L44 20 L56 30 L58 38 L50 44 L40 48 L28 50 L18 46 L10 38 L6 26 Z" fill="#000"/>
                  <circle cx="42" cy="32" r="3.2" fill="#A51C30"/>
                </svg>
                <span className="logo-wordmark">FoxRevo</span>
              </div>

              {/* Seal */}
              <svg className="seal" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <path id="sealTop" d="M 60,60 m -42,0 a 42,42 0 1,1 84,0" fill="none"/>
                  <path id="sealBottom" d="M 60,60 m 42,0 a 42,42 0 1,1 -84,0" fill="none"/>
                </defs>
                <circle cx="60" cy="60" r="54" fill="none" stroke="#000" stroke-width="1"/>
                <circle cx="60" cy="60" r="48" fill="none" stroke="#000" stroke-width="0.6"/>
                <circle cx="60" cy="60" r="32" fill="#A51C30"/>
                <circle cx="60" cy="60" r="28" fill="none" stroke="#FAFAFA" stroke-width="0.8"/>
                <text font-family="Inter, sans-serif" font-size="9" font-weight="700" fill="#000" letter-spacing="3">
                  <textPath href="#sealTop" startOffset="50%" text-anchor="middle">VERIFIED</textPath>
                </text>
                <text font-family="Inter, sans-serif" font-size="8" font-weight="700" fill="#000" letter-spacing="2">
                  <textPath href="#sealBottom" startOffset="50%" text-anchor="middle">COMPLETION</textPath>
                </text>
                <text x="60" y="64" text-anchor="middle" font-family="Inter, sans-serif" font-size="9" font-weight="700" fill="#FAFAFA" letter-spacing="1">GRADUATE</text>
              </svg>
            </div>

            {/* Declaration */}
            <div className="declaration">
              <div className="decl-title">Certificate of Completion</div>
              <div className="decl-intro">This certifies that</div>
              <div className="decl-name">{fullName}</div>
              <div className="decl-body">
                has successfully completed the FoxRevo Wealth‑Mindset &amp; Entrepreneurship Program and is hereby recognized as a
              </div>
              <div className="decl-designation">FOX REVOLUTION BUILDER</div>
            </div>

            {/* Business & ROI Block */}
            <div className="biz-block">
              <div className="biz-item">
                <div className="biz-label">Chosen Business Venture</div>
                <div className="biz-value">{businessVenture || '[Business Name / Industry]'}</div>
              </div>
              <div className="biz-item">
                <div className="biz-label">6‑Month Revenue Target</div>
                <div className="biz-value">₦{Number(revenueTarget.replace(/,/g, '')).toLocaleString('en-NG') || revenueTarget}</div>
              </div>
            </div>

            {/* Bottom */}
            <div className="bottom">
              <div className="meta">
                <div><strong>Date of Completion:</strong> {formatDate()}</div>
                <div><strong>Certificate ID:</strong> {getVerificationCode()}</div>
              </div>
              <div className="signature">
                <div className="sig-line"></div>
                <div className="sig-label">The Fox Revolution</div>
              </div>
            </div>

            <div className="tagline">A graduate of the silent revolution building Africa's next billionaires.</div>

          </div>

        </div>
      </div>

    </div>
  );
}
