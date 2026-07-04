"use client";

import React from 'react';
import { ArrowLeft, Printer, Award } from 'lucide-react';
import Link from 'next/link';
import './certificate.css';

export default function CertificateView({ candidate }) {
  const handlePrint = () => {
    window.print();
  };

  const formatDate = () => {
    return new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Generate a mock unique verification hash based on candidate name/email
  const getVerificationCode = () => {
    const combined = `${candidate.email}-foxrevo-grad`;
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
      hash = (hash << 5) - hash + combined.charCodeAt(i);
      hash = hash & hash;
    }
    return `FR-${Math.abs(hash).toString(16).toUpperCase().substring(0, 8)}`;
  };

  return (
    <div className="cert-page-container">
      {/* Back button and Print buttons for web display only */}
      <div className="cert-actions-header print-hide">
        <Link href="/dashboard" className="back-link">
          <ArrowLeft size={16} style={{ marginRight: '6px' }} />
          Return to Dashboard
        </Link>

        <button onClick={handlePrint} className="btn btn-primary print-trigger-btn">
          <Printer size={18} style={{ marginRight: '8px' }} />
          Print / Save as PDF
        </button>
      </div>

      {/* THE PRINTABLE CERTIFICATE */}
      <div className="certificate-border">
        <div className="certificate-inner">
          
          <div className="cert-top-badge">
            <Award size={48} className="gold-medal" />
          </div>

          <span className="cert-org">FOXREVO WEALTH MINDSET REVOLUTION</span>
          
          <h1 className="cert-title">Certificate of Completion</h1>
          
          <p className="cert-p-intro">This official credential certifies that</p>
          
          <h2 className="cert-candidate-name">{candidate.full_name}</h2>
          
          <p className="cert-p-description">
            has successfully completed the comprehensive Wealth Mindset and Entrepreneurship curriculum,
            survived the mental Detox, completed the Rewire training, and satisfied all criteria
            for graduation from the program.
          </p>

          <p className="cert-p-designation">
            He/She is hereby recognized and designated as a certified
          </p>

          <h3 className="cert-architect-title">FoxRevo Legacy Architect</h3>

          <div className="cert-signatures-section">
            <div className="cert-sign-block">
              <span className="cert-signature-name signature-font">Kenneth A.</span>
              <div className="signature-line"></div>
              <span className="cert-sign-title">Kenneth A., CEO & Founder</span>
            </div>
            
            <div className="cert-sign-block">
              <span className="cert-signature-name signature-font">FoxRevo Board</span>
              <div className="signature-line"></div>
              <span className="cert-sign-title">Board of Training Directors</span>
            </div>
          </div>

          <div className="cert-footer-info">
            <div>
              <span className="label">Date of Issuance:</span>
              <span className="value">{formatDate()}</span>
            </div>
            <div>
              <span className="label">Verification ID:</span>
              <span className="value">{getVerificationCode()}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
