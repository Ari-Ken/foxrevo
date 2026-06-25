"use client";

import React, { useState } from 'react';
import './checkout.css';

export default function CheckoutPage() {
  const [formData, setFormData] = useState({ fullName: '', email: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) {
      setErrorMsg("All fields are required to initiate clearance.");
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: formData.fullName,
          email: formData.email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to initialize payment gateway.");
      }

      if (data.paymentUrl) {
        sessionStorage.setItem('foxrevo_email', formData.email.trim().toLowerCase());
        // Redirect the user to the secure Flutterwave checkout page
        window.location.href = data.paymentUrl;
      } else {
        throw new Error("Invalid response from payment gateway.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "An error occurred connecting to the payment gateway.");
      setIsLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-card">
        <div className="checkout-header">
          <h1 className="checkout-title">Clearance Registration</h1>
          <p className="checkout-subtitle">
            This is the first gate. Register your credentials to initialize your clearance fee and secure your slot for the entrance examination.
          </p>
        </div>

        <form onSubmit={handleCheckout} className="checkout-form">
          {errorMsg && (
            <div className="ui-notice-box urgent-notice mb-6">
              <strong>NOTICE:</strong> {errorMsg}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="fullName" className="form-label">Full Legal Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="form-input"
              placeholder="e.g. Obinna Eze"
              value={formData.fullName}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Secure Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              placeholder="e.g. obinna@domain.com"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
            <p className="input-hint">This email will be your permanent key to the FoxRevo architecture.</p>
          </div>

          <div className="fee-summary">
            <div className="fee-row">
              <span>Examination Clearance Fee</span>
              <span className="font-bold">₦3,000</span>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '8px', textAlign: 'right', fontStyle: 'italic' }}>
              (Note: Bank charges may occur based on country or location)
            </div>
          </div>

          <button 
            type="submit" 
            className={`btn btn-large mt-6 ${isLoading ? 'btn-disabled' : 'btn-primary'}`}
            disabled={isLoading}
          >
            {isLoading ? 'Initializing Gateway...' : 'Proceed to Secure Payment'}
          </button>
        </form>

        <div className="checkout-footer">
          <p>Already paid and cleared? <a href="/access" className="text-wine">Access Gateway</a></p>
        </div>
      </div>
    </div>
  );
}
