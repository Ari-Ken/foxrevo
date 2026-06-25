"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../utils/supabaseClient';
import './access.css';

export default function AccessGateway() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg("Email is required to verify clearance.");
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      // If keys are not set, Supabase will fail to query.
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
        throw new Error("System is not connected to the central database. Keys are missing.");
      }

      // Query the candidates table
      const { data, error } = await supabase
        .from('candidates')
        .select('*')
        .eq('email', email.trim().toLowerCase())
        .single();

      if (error && error.code === 'PGRST116') {
        // No rows returned
        setErrorMsg("No record found for this email. You must register and pay the clearance fee.");
        setIsLoading(false);
        return;
      }

      if (error) throw error;

      const candidate = data;

      // Save email for session use in exam
      sessionStorage.setItem('foxrevo_email', candidate.email);

      // Routing Logic Based on DB Record
      if (!candidate.payment_status) {
        setErrorMsg("Payment pending. Please ensure your payment was completed successfully.");
        setIsLoading(false);
      } else if (candidate.passed_exam) {
        // Passed exam -> Download Dashboard
        window.location.href = '/download';
      } else if (candidate.exam_attempts >= 1 && !candidate.passed_exam) {
        // Max attempts reached (assuming 1 attempt for now)
        setErrorMsg("Your examination attempts have been exhausted without meeting the passing criteria. Access denied.");
        setIsLoading(false);
      } else if (candidate.payment_status && (candidate.exam_score === null || candidate.exam_score === undefined)) {
        // Paid, has not taken exam yet -> Prep & Exam
        window.location.href = '/exam-prep';
      } else {
        // Fallback
        setErrorMsg("An anomaly was detected in your clearance status. Contact support.");
        setIsLoading(false);
      }

    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "An error occurred verifying your clearance. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="access-container">
      <div className="access-card">
        <div className="access-header">
          <h1 className="access-title">Clearance Verification</h1>
          <p className="access-subtitle">
            The revolution protects its borders. Enter the email address associated with your registration to verify your clearance status.
          </p>
        </div>

        <form onSubmit={handleVerify} className="access-form">
          {errorMsg && (
            <div className="ui-notice-box urgent-notice mb-6">
              <strong>NOTICE:</strong> {errorMsg}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email" className="form-label">Architect Clearance Email</label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="e.g. yourname@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <button 
            type="submit" 
            className={`btn btn-large mt-4 ${isLoading ? 'btn-disabled' : 'btn-primary'}`}
            disabled={isLoading}
          >
            {isLoading ? 'Verifying...' : 'Verify Clearance'}
          </button>
        </form>

        <div className="access-footer">
          <p>Don't have an account? <a href="/checkout" className="text-wine">Initiate Registration</a></p>
        </div>
      </div>
    </div>
  );
}
