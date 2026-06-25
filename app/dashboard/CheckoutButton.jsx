"use client";

import React, { useState } from 'react';

export default function CheckoutButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCheckout = async () => {
    setIsLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
      });
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
      {errorMsg && <p style={{ color: '#A51C30', marginBottom: '12px' }}>{errorMsg}</p>}
      <button 
        onClick={handleCheckout} 
        disabled={isLoading} 
        className={`btn btn-large ${isLoading ? 'btn-disabled' : 'btn-primary'}`} 
        style={{ width: '100%' }}
      >
        {isLoading ? 'Connecting to Flutterwave...' : 'Proceed to Clearance Payment (₦100)'}
      </button>
    </div>
  );
}
