import React from 'react';
import Link from 'next/link';
import { ShieldCheck, AlertTriangle, ArrowLeft, Award, FileText } from 'lucide-react';
import { supabaseAdmin } from '../../../utils/supabaseAdmin';
import './verify.css';

export const revalidate = 0; // Disable server caching for live verification lookup

export default async function VerificationPage({ params }) {
  const { id } = params;

  let candidate = null;
  let fetchError = null;

  try {
    const { data, error } = await supabaseAdmin
      .from('candidates')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      fetchError = error.message;
    } else {
      candidate = data;
    }
  } catch (err) {
    fetchError = err.message;
  }

  const isVerified = candidate && candidate.passed_exam;

  return (
    <div className="verify-page-container">
      {/* Decorative Blur Blobs */}
      <div className="glow-blob blob-1"></div>
      <div className="glow-blob blob-2"></div>

      <div className="verify-card-wrapper glass-card">
        {isVerified ? (
          <div className="verify-success-panel animate-scale">
            <div className="verify-status-badge success">
              <ShieldCheck size={20} />
              <span>CRYPTOGRAPHICALLY VERIFIED</span>
            </div>

            <div className="cert-award-icon">
              <Award size={48} className="neon-icon-glow" />
            </div>

            <h1 className="recipient-name font-outfit">{candidate.full_name}</h1>
            <p className="recipient-role">Certified FoxRevo OS Graduate</p>

            <div className="verification-details-grid">
              <div className="detail-item">
                <span className="detail-label">PLATFORM USER ID</span>
                <span className="detail-value font-inter">{candidate.id}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">VERIFIED EMAIL</span>
                <span className="detail-value font-inter">{candidate.email}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">VERIFICATION EXAM SCORE</span>
                <span className="detail-value">{candidate.exam_score} / 50</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">CREDENTIAL STATUS</span>
                <span className="detail-value status-active">ACTIVE & AUTHENTIC</span>
              </div>
            </div>

            <div className="verification-attestation">
              <p>
                This attests that the individual above has successfully satisfied the deprogramming exam standards and has demonstrated complete mastery of structural capital and asset compounding systems.
              </p>
            </div>

            <div className="verify-footer-actions">
              <Link href="/" className="btn-submit-cta neon-btn">
                <span>Explore FoxRevo OS</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="verify-error-panel animate-scale">
            <div className="verify-status-badge error">
              <AlertTriangle size={20} />
              <span>CREDENTIAL VERIFICATION FAILED</span>
            </div>

            <div className="error-icon-box">
              <AlertTriangle size={48} className="error-glow" />
            </div>

            <h1 className="error-title font-outfit">Verification Token Invalid</h1>
            <p className="error-desc font-inter">
              The provided credential token <code>{id}</code> does not match any certified graduate in the FoxRevo verification registry.
            </p>

            <div className="error-checks-list text-left">
              <h5>Potential Causes:</h5>
              <ul>
                <li>The candidate profile is waitlisted or has not passed the entrance exam.</li>
                <li>The transaction clearance is still pending verification.</li>
                <li>The credential link is corrupted or missing path parameters.</li>
              </ul>
            </div>

            <div className="verify-footer-actions mt-4">
              <Link href="/" className="btn-submit-cta mini-btn outlined-btn">
                <ArrowLeft size={16} style={{ marginRight: '8px' }} />
                <span>Return to Homepage</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
