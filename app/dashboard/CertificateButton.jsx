"use client";

import React, { useState } from 'react';
import { Award, CheckCircle, Clock, X } from 'lucide-react';

export default function CertificateButton({ p1Passed, p1Score, p2Passed, p2Score, p3Passed, p3Score }) {
  const [showModal, setShowModal] = useState(false);

  const isQualified = p1Passed && p2Passed && p3Passed;

  const handleClaim = () => {
    if (isQualified) {
      window.location.href = '/training/certificate';
    } else {
      setShowModal(true);
    }
  };

  return (
    <div style={{ marginTop: '24px' }}>
      <button
        onClick={handleClaim}
        className="btn btn-large w-full"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          background: isQualified ? '#10B981' : '#F59E0B',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          padding: '16px',
          fontWeight: '700',
          fontSize: '16px',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
          transition: 'all 0.2s ease'
        }}
      >
        <Award size={20} />
        {isQualified ? 'Claim & Download Certificate' : 'Attempt Certificate Download'}
      </button>

      {/* MOMENTUM POPUP MODAL */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(5px)',
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-medium)',
            borderRadius: '12px',
            padding: '36px',
            maxWidth: '480px',
            width: '90%',
            position: 'relative',
            boxShadow: 'var(--shadow-md)',
            animation: 'modalFadeIn 0.2s ease-out'
          }}>
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                color: 'var(--text-tertiary)',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                color: '#F59E0B',
                marginBottom: '16px'
              }}>
                <Award size={36} />
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
                Graduation Requirements
              </h3>
            </div>

            <p style={{
              fontSize: '14px',
              lineHeight: '1.6',
              color: 'var(--text-secondary)',
              textAlign: 'center',
              marginBottom: '24px'
            }}>
              To graduate and claim your official FoxRevo certification, you must review the preparatory materials and pass all three modular assessments with a minimum score of 40%.
            </p>

            {/* Checklist */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              backgroundColor: 'var(--bg-tertiary)',
              padding: '16px',
              borderRadius: '6px',
              border: '1px solid var(--border-light)',
              marginBottom: '28px'
            }}>
              {[
                { name: 'Part 1: The Detox Confirmation', passed: p1Passed, score: p1Score },
                { name: 'Part 2: The Rewire Assessment', passed: p2Passed, score: p2Score },
                { name: 'Part 3: The Launch Assessment', passed: p3Passed, score: p3Score },
              ].map((p, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '14px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {p.passed ? (
                      <CheckCircle size={16} color="#10B981" />
                    ) : (
                      <Clock size={16} color="#F59E0B" />
                    )}
                    <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{p.name}</span>
                  </div>
                  <span style={{
                    fontWeight: '700',
                    color: p.passed ? '#10B981' : 'var(--text-tertiary)',
                    fontSize: '13px'
                  }}>
                    {p.passed ? `PASSED (${p.score}%)` : `PENDING (${p.score}%)`}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="btn btn-primary w-full"
              style={{ padding: '14px' }}
            >
              Understand & Return to Roadmap
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
