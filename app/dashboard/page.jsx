import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '../../utils/supabase/server';
import { supabaseAdmin } from '../../utils/supabaseAdmin';
import LogoutButton from './LogoutButton';
import CheckoutButton from './CheckoutButton';
import CertificateButton from './CertificateButton';

export default async function DashboardPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const email = user.email.toLowerCase();
  const full_name = user.user_metadata?.full_name || 'Candidate';

  // Fetch or auto-create the candidate record using admin client (bypasses RLS)
  let { data: candidate, error } = await supabaseAdmin
    .from('candidates')
    .select('*')
    .eq('email', email)
    .single();

  if (!candidate) {
    const { data: created, error: createError } = await supabaseAdmin
      .from('candidates')
      .upsert({ email, full_name, payment_status: false, passed_exam: false, exam_score: 0, exam_attempts: 0 }, { onConflict: 'email' })
      .select()
      .single();

    if (createError) {
      console.error('Failed to create candidate record:', createError);
      return (
        <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'var(--bg-primary)' }}>
          <div style={{ textAlign: 'center', color: 'var(--text-primary)' }}>
            <h2>Profile Error</h2>
            <p style={{ marginTop: '8px', color: 'var(--text-secondary)' }}>We could not load your profile. Please contact support.</p>
            <LogoutButton />
          </div>
        </div>
      );
    }
    candidate = created;
  }

  const isPaid = candidate.payment_status === true;
  const hasPassed = candidate.passed_exam === true;
  const attempts = candidate.exam_attempts || 0;
  const isLocked = attempts >= 2 && !hasPassed;

  // Status label helpers
  const paymentLabel = isPaid ? { text: 'PAID', color: '#10B981' } : { text: 'UNPAID', color: '#A51C30' };
  const examLabel = hasPassed
    ? { text: 'PASSED', color: '#10B981' }
    : isLocked
    ? { text: 'LOCKED', color: '#A51C30' }
    : { text: 'PENDING', color: '#64748B' };

  return (
    <div style={{ minHeight: 'calc(100vh - 80px)', backgroundColor: 'var(--bg-primary)', padding: '40px 24px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-medium)', paddingBottom: '24px', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '30px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '4px' }}>
              Candidate Dashboard
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
              {candidate.full_name} &nbsp;·&nbsp; {candidate.email}
            </p>
          </div>
          <LogoutButton />
        </div>

        {/* Status Panel */}
        <div style={{ backgroundColor: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-medium)', padding: '28px', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>
            Account Status
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'Examination Fee', ...paymentLabel },
              { label: 'Exam Status', ...examLabel },
              { label: 'Attempts Used', text: `${attempts} / 2`, color: 'var(--text-primary)' },
            ].map(({ label, text, color }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '4px' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>{label}</span>
                <span style={{ color, fontWeight: '700', fontSize: '14px', letterSpacing: '0.5px' }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Panel */}
        <div style={{ backgroundColor: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border-medium)', padding: '28px' }}>

          {/* STATE 1: Not paid */}
          {!isPaid && (
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '12px' }}>
                Next Step: Pay the Examination Fee
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '24px' }}>
                Your identity is registered. To earn the right to sit the entrance examination, you must pay the non-refundable examination fee. This payment does not guarantee access to the blueprint — only the right to be tested for it.
              </p>
              <CheckoutButton />
            </div>
          )}

          {/* STATE 2: Paid, not yet taken exam */}
          {isPaid && !hasPassed && !isLocked && (
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '12px' }}>
                Next Step: Enter the Examination
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '24px' }}>
                Your clearance fee has been confirmed. You are authorized to enter the Preparatory Architecture. Study the prep material, then sit the examination. You have {2 - attempts} attempt{2 - attempts !== 1 ? 's' : ''} remaining.
              </p>
              <Link
                href="/exam-prep"
                className="btn btn-primary btn-large"
                style={{ display: 'block', textAlign: 'center' }}
              >
                Enter Preparatory Architecture →
              </Link>
            </div>
          )}

          {/* STATE 3: Passed */}
          {isPaid && hasPassed && (
            <div>
              <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid #10B981', borderRadius: '6px', padding: '16px', marginBottom: '20px' }}>
                <strong style={{ color: '#10B981' }}>✓ Clearance Fully Granted</strong>
                <p style={{ color: 'var(--text-primary)', marginTop: '6px', fontSize: '14px', lineHeight: '1.6' }}>
                  You have passed the entrance examination with a score of {candidate.exam_score}/100. The vault is open.
                </p>
              </div>
              <Link
                href="/download"
                className="btn btn-large"
                style={{ display: 'block', textAlign: 'center', background: '#10B981', color: '#fff', border: 'none', borderRadius: '4px', padding: '14px', fontWeight: '700', marginBottom: '16px' }}
              >
                Access Download Dashboard →
              </Link>
              <div style={{ textAlign: 'center', marginTop: '16px' }}>
                <Link
                  href="/exam-prep"
                  style={{ color: 'var(--text-secondary)', textDecoration: 'underline', fontSize: '14px', fontWeight: '500' }}
                >
                  Revisit preparatory material & retake practice exam
                </Link>
              </div>

              {/* TRAINING ROADMAP PANEL */}
              <div style={{ marginTop: '32px', borderTop: '1px solid var(--border-medium)', paddingTop: '24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '16px' }}>
                  The Wealth Revolution Academy Roadmap
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' }}>
                  Now that your clearance is confirmed, you are granted complete access to the three-part book assessment sequence. Read each part of the book, confirm your understanding, and complete the assessments below to graduate.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    {
                      num: 1,
                      title: 'Part 1: The Detox Confirmation',
                      desc: 'Prove that you have cleared the ground, audited your environment, and deadened the noise.',
                      passed: candidate.part1_passed || false,
                      score: candidate.part1_score || 0,
                      route: '/training/part1/prep'
                    },
                    {
                      num: 2,
                      title: 'Part 2: The Rewire Assessment',
                      desc: 'Confirm your structural understanding of the asset column and macroeconomic systems.',
                      passed: candidate.part2_passed || false,
                      score: candidate.part2_score || 0,
                      route: '/training/part2/prep'
                    },
                    {
                      num: 3,
                      title: 'Part 3: The Launch Assessment',
                      desc: 'Demonstrate alignment with legacy building, system leverage, and capital scaling.',
                      passed: candidate.part3_passed || false,
                      score: candidate.part3_score || 0,
                      route: '/training/part3/prep'
                    }
                  ].map((part) => (
                    <div key={part.num} style={{
                      backgroundColor: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-light)',
                      borderRadius: '6px',
                      padding: '20px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      flexWrap: 'wrap',
                      gap: '16px'
                    }}>
                      <div style={{ flex: '1', minWidth: '240px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            backgroundColor: part.passed ? 'rgba(16,185,129,0.1)' : 'rgba(165,28,48,0.06)',
                            color: part.passed ? '#10B981' : 'var(--accent)',
                            fontSize: '12px',
                            fontWeight: '800'
                          }}>
                            {part.num}
                          </span>
                          <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>
                            {part.title}
                          </h4>
                          <span style={{
                            fontSize: '11px',
                            fontWeight: '700',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            backgroundColor: part.passed ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.08)',
                            color: part.passed ? '#10B981' : '#F59E0B'
                          }}>
                            {part.passed ? 'PASSED' : 'PENDING'}
                          </span>
                        </div>
                        <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-tertiary)', lineHeight: '1.5' }}>
                          {part.desc}
                        </p>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px', minWidth: '140px' }}>
                        {part.passed && (
                          <span style={{ fontSize: '13px', fontWeight: '700', color: '#10B981' }}>
                            Score: {part.score}%
                          </span>
                        )}
                        <Link
                          href={part.route}
                          className="btn"
                          style={{
                            padding: '8px 16px',
                            fontSize: '13px',
                            backgroundColor: part.passed ? 'transparent' : 'var(--accent)',
                            color: part.passed ? 'var(--text-primary)' : '#fff',
                            border: part.passed ? '1px solid var(--border-medium)' : 'none',
                            borderRadius: '4px',
                            fontWeight: '600'
                          }}
                        >
                          {part.passed ? 'Review Prep / Retake' : 'Read Book & Sit Exam'}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                <CertificateButton
                  p1Passed={candidate.part1_passed || false}
                  p1Score={candidate.part1_score || 0}
                  p2Passed={candidate.part2_passed || false}
                  p2Score={candidate.part2_score || 0}
                  p3Passed={candidate.part3_passed || false}
                  p3Score={candidate.part3_score || 0}
                />
              </div>
            </div>
          )}

          {/* STATE 4: Locked out */}
          {isPaid && isLocked && (
            <div>
              <div style={{ background: 'rgba(165,28,48,0.1)', border: '1px solid #A51C30', borderRadius: '6px', padding: '16px' }}>
                <strong style={{ color: '#A51C30' }}>Access Permanently Revoked</strong>
                <p style={{ color: 'var(--text-primary)', marginTop: '6px', fontSize: '14px', lineHeight: '1.6' }}>
                  You have exhausted both examination attempts without meeting the passing criteria. Access to the blueprint has been permanently denied. There is no appeal.
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
