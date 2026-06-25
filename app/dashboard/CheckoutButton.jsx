"use client";

import React, { useState } from 'react';

export default function CheckoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCheckout = async () => {
    setIsLoading(true);
    setErrorMsg('');

    try {
      // No body needed — API reads the user from the session cookie
      const response = await fetch('/api/checkout', { method: 'POST' });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to initialize payment gateway.');
      }

      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div>
      {errorMsg && (
        <div style={{ backgroundColor: 'rgba(165, 28, 48, 0.1)', border: '1px solid #A51C30', borderRadius: '4px', padding: '12px', marginBottom: '16px', color: '#A51C30', fontSize: '14px' }}>
          {errorMsg}
        </div>
      )}
      <button
        onClick={handleCheckout}
        disabled={isLoading}
        className={`btn btn-large ${isLoading ? 'btn-disabled' : 'btn-primary'}`}
        style={{ width: '100%' }}
      >
        {isLoading ? 'Connecting to Gateway...' : 'Pay Examination Fee (₦5,000)'}
      </button>
    </div>
  );
}
