"use client";

import React, { useState } from 'react';
import { Edit2, Check, X } from 'lucide-react';
import LogoutButton from './LogoutButton';

export default function DashboardHeader({ candidate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(candidate.full_name || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    if (!fullName.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/profile/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: fullName.trim() })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Update failed.');
      
      setIsEditing(false);
      window.location.reload(); // Reload dashboard server component to refresh data
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-medium)', paddingBottom: '24px', marginBottom: '32px' }}>
      <div style={{ flex: 1 }}>
        <h1 style={{ fontSize: '30px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '4px' }}>
          Candidate Dashboard
        </h1>
        {error && (
          <div style={{ color: '#A51C30', fontSize: '13px', marginBottom: '8px', fontWeight: '600' }}>{error}</div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginTop: '6px' }}>
          {isEditing ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={loading}
                style={{
                  padding: '4px 8px',
                  fontSize: '14px',
                  borderRadius: '4px',
                  border: '1px solid var(--border-medium)',
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                  fontWeight: '600'
                }}
              />
              <button
                onClick={handleSave}
                disabled={loading}
                style={{ background: '#10B981', border: 'none', borderRadius: '4px', padding: '6px', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                title="Save"
              >
                <Check size={14} />
              </button>
              <button
                onClick={() => { setIsEditing(false); setFullName(candidate.full_name); }}
                disabled={loading}
                style={{ background: '#64748B', border: 'none', borderRadius: '4px', padding: '6px', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                title="Cancel"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--text-primary)', fontSize: '16px', fontWeight: '700' }}>
                {candidate.full_name}
              </span>
              <button
                onClick={() => setIsEditing(true)}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
                title="Change Name"
              >
                <Edit2 size={14} />
              </button>
            </div>
          )}
          <span style={{ color: 'var(--text-tertiary)', fontSize: '14px' }}>&nbsp;·&nbsp; {candidate.email}</span>
        </div>
      </div>
      <LogoutButton />
    </div>
  );
}
