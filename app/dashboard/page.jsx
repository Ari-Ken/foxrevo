import React from 'react';
import Link from 'next/link';
import { createClient } from '../../utils/supabase/server';
import { supabaseAdmin } from '../../utils/supabaseAdmin';
import { redirect } from 'next/navigation';
import LogoutButton from './LogoutButton';
import CheckoutButton from './CheckoutButton';

export default async function DashboardPage() {
  const supabase = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch candidate record securely, bypassing RLS
  let { data: candidate, error } = await supabaseAdmin
    .from('candidates')
    .select('*')
    .eq('email', user.email)
    .single();

  if (error || !candidate) {
    // AUTO-HEAL: If the trigger wasn't run and client insert failed due to RLS,
    // we use the Admin client here to forcefully initialize the user's record.
    const { data: newCandidate, error: insertError } = await supabaseAdmin
      .from('candidates')
      .upsert({
        email: user.email,
        full_name: user.user_metadata?.full_name || 'Candidate',
        payment_status: false,
        passed_exam: false,
        exam_score: 0,
        exam_attempts: 0
      }, { onConflict: 'email' })
      .select()
      .single();

    if (insertError) {
      console.error("Auto-heal failed:", insertError);
      return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
          <div style={{ textAlign: 'center' }}>
            <h2>Profile Sync Error</h2>
            <p>Your identity is registered, but the system could not initialize your profile.</p>
            <LogoutButton />
          </div>
        </div>
      );
    }
    
    candidate = newCandidate;
  }

  // Determine state
  const isPaid = candidate.payment_status;
  const hasPassed = candidate.passed_exam;
  const attempts = candidate.exam_attempts || 0;
  const hasFailed = attempts >= 2 && !hasPassed;

  return (
    <div style={{ minHeight: 'calc(100vh - 80px)', backgroundColor: 'var(--bg-primary)', padding: '40px 24px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-medium)', paddingBottom: '24px', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: '800', color: 'var(--text-primary)' }}>Candidate Dashboard</h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>ID: {candidate.email}</p>
          </div>
          <LogoutButton />
        </div>

        <div style={{ backgroundColor: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-medium)', padding: '32px' }}>
          
          <h2 style={{ fontSize: '20px', marginBottom: '24px', color: 'var(--text-primary)', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>Current Status</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '4px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Clearance Fee</span>
              <span style={{ color: isPaid ? '#10B981' : '#A51C30', fontWeight: 'bold' }}>{isPaid ? 'PAID' : 'PENDING'}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '4px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Examination Status</span>
              <span style={{ color: hasPassed ? '#10B981' : (hasFailed ? '#A51C30' : '#64748B'), fontWeight: 'bold' }}>
                {hasPassed ? 'PASSED' : (hasFailed ? 'FAILED' : 'PENDING')}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '4px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Exam Attempts Used</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>{attempts} / 2</span>
            </div>
          </div>

          <h2 style={{ fontSize: '20px', marginBottom: '24px', color: 'var(--text-primary)', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>Next Action Required</h2>

          {/* STATE 1: UNPAID */}
          {!isPaid && (
            <div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.6' }}>
                Your identity has been registered, but your clearance fee has not been processed. You must initialize the gateway to secure your examination slot.
              </p>
              <CheckoutButton />
            </div>
          )}

          {/* STATE 2: PAID, BUT NOT TAKEN EXAM */}
          {isPaid && !hasPassed && !hasFailed && (
            <div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.6' }}>
                Your clearance is verified. You are authorized to enter the Preparatory Architecture. Do not proceed until you are in a quiet room, ready to focus.
              </p>
              <Link href="/exam-prep" className="btn btn-primary btn-large" style={{ display: 'block', textAlign: 'center' }}>Enter Preparatory Architecture</Link>
            </div>
          )}

          {/* STATE 3: PASSED */}
          {isPaid && hasPassed && (
            <div>
              <div className="ui-notice-box mb-4" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', borderLeftColor: '#10B981' }}>
                <strong style={{ color: '#10B981' }}>Clearance Fully Granted</strong>
                <p style={{ marginTop: '8px', color: 'var(--text-primary)' }}>You have successfully passed the entrance examination. The vault is open.</p>
              </div>
              <Link href="/download" className="btn btn-primary btn-large" style={{ display: 'block', textAlign: 'center', backgroundColor: '#10B981', borderColor: '#10B981' }}>Access Download Dashboard</Link>
            </div>
          )}

          {/* STATE 4: FAILED */}
          {isPaid && hasFailed && (
            <div>
              <div className="ui-notice-box mb-4" style={{ borderLeftColor: '#A51C30' }}>
                <strong style={{ color: '#A51C30' }}>Attempts Exhausted</strong>
                <p style={{ marginTop: '8px', color: 'var(--text-primary)' }}>You have exhausted your allowed attempts without meeting the passing criteria. Access to the blueprint is denied.</p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
