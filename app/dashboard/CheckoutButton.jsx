"use client";

import React, { useState } from 'react';

export default function CheckoutButton({ type = 'exam', label = 'Pay Examination Fee — ₦3,000' }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePay = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/checkout', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type })
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Payment gateway error.');

      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div>
      {error && (
        <div style={{
          background: 'rgba(165,28,48,0.1)',
          border: '1px solid #A51C30',
          borderRadius: '4px',
          padding: '12px 16px',
          color: '#A51C30',
          fontSize: '14px',
          marginBottom: '16px',
          lineHeight: '1.5'
        }}>
          {error}
        </div>
      )}
      <button
        onClick={handlePay}
        disabled={loading}
        className={`btn btn-large ${loading ? 'btn-disabled' : 'btn-primary'}`}
        style={{ width: '100%' }}
      >
        {loading ? 'Connecting to Gateway…' : label}
      </button>
    </div>
  );
}
