"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '../../utils/supabase/client';
import { ShieldCheck, Lock, Users, Mail, AlertTriangle, ArrowRight, ArrowLeft } from 'lucide-react';

const screens = [
  {
    question: "Why should I care?",
    headline: "HOW TO ACTUALLY MAKE MORE MONEY IN NIGERIA.",
    body: "Forget courses, passive loop-holes, or begging for views. Acquire a single capability: the capacity to spot opportunities, build real businesses, and make sound financial decisions for the rest of your life.",
    cta: "Why am I stuck? →"
  },
  {
    question: "Why am I stuck?",
    headline: "YOU ARE PERFORMING SUCCESS INSTEAD OF BUILDING IT.",
    body: "You were trained to be an employee. But you live in a market with no jobs. You are consuming endless information, but your bank account remains empty. It's time to break the cycle.",
    cta: "Is there really another way? →"
  },
  {
    question: "Is there really another way?",
    headline: "CAPABILITY COMES FROM THE ABSENCE OF CAPITAL.",
    body: "Yes. You don’t need millions in capital to start. You need architecture. We teach you how to start from zero, identify local cashflow pools, validate with customer money first, and build businesses that last.",
    cta: "Can I do it? →"
  },
  {
    question: "Can I do it?",
    headline: "IT REQUIRES A SACRIFICE. THIS IS NOT PASSIVE INCOME.",
    body: "Yes, you can do it—but only if you are willing to work. This requires 5 to 8 hours daily of execution. If you want a passive shortcut, exit this page immediately.",
    cta: "What exactly am I getting? →"
  },
  {
    question: "What exactly am I getting?",
    headline: "A NEW CAPABILITY, NOT A COURSE.",
    body: "You are buying the capability to build businesses. You get access to the 3 core parts of the Wealth Revolution syllabus, proctored assessments, and a verified graduation certificate.",
    cta: "Why is it only ₦3,000? →"
  },
  {
    question: "Why is it only ₦3,000?",
    headline: "IT IS A COMMITMENT FILTER.",
    body: "Free things are ignored. We do not want crowds; we want builders. If you aren't willing to sacrifice ₦3,000 to end a lifetime of financial struggle... close this page.",
    cta: "Why should I trust this? →"
  },
  {
    question: "Why should I trust this?",
    headline: "BUILT ON RAW, BATTLE-TESTED AFRICAN BUSINESS TRUTH.",
    body: "No Western theories. No fake TikTok lifestyle flexes. Real graduates are already executing, validating ventures, and building cash-generating systems across Nigeria.",
    cta: "Why shouldn't I wait? →"
  },
  {
    question: "Why shouldn't I wait?",
    headline: "OPPORTUNITIES DO NOT WAIT FOR PERMISSION.",
    body: "The current cohort is capping at 3,000 builders. Once closed, the portal locks. Your capability starts now, or never.",
    cta: "Enter the Registration Portal →"
  }
];

export default function AdmissionClient({ initialIsOpen, openDateStr }) {
  const router = useRouter();
  const supabase = createClient();

  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [currentScreen, setCurrentScreen] = useState(0);

  // Waitlist form state
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistLoading, setWaitlistLoading] = useState(false);
  const [waitlistError, setWaitlistError] = useState('');
  const [waitlistSuccess, setWaitlistSuccess] = useState('');

  // Registration form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('Nigeria');
  const [regLoading, setRegLoading] = useState(false);
  const [regError, setRegError] = useState('');
  const [statusMsg, setStatusMsg] = useState(''); // E.g. "Generating payment link..."

  useEffect(() => {
    setMounted(true);

    if (isOpen) return;

    const openTime = new Date(openDateStr).getTime();
    
    // Initial run
    const runTimer = () => {
      const now = new Date().getTime();
      const diff = openTime - now;
      if (diff <= 0) {
        setIsOpen(true);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };
    runTimer();

    const interval = setInterval(runTimer, 1000);
    return () => clearInterval(interval);
  }, [isOpen, openDateStr]);

  const formatOpenDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      // E.g., Friday, July 3, 2026
      const datePart = date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      });
      // E.g., 12:00 PM
      const timePart = date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true 
      });
      return `${datePart} at ${timePart} WAT`;
    } catch (e) {
      return 'Friday, July 3, 2026 at 12:00 PM WAT';
    }
  };

  const handleWaitlistSubmit = async (e) => {
    e.preventDefault();
    setWaitlistLoading(true);
    setWaitlistError('');
    setWaitlistSuccess('');

    try {
      const res = await fetch('/api/admission/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: waitlistEmail }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');

      setWaitlistSuccess('You have been added to the notification list! We will notify you exactly 15 minutes before the gates open.');
      setWaitlistEmail('');
    } catch (err) {
      setWaitlistError(err.message);
    } finally {
      setWaitlistLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegLoading(true);
    setRegError('');
    setStatusMsg('Registering candidate profile...');

    const cleanEmail = email.trim().toLowerCase();

    try {
      // 1. Register candidate account in Supabase Auth
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: { 
          data: { 
            full_name: fullName.trim(),
            country: country
          } 
        },
      });

      if (signUpError) {
        throw new Error(signUpError.message);
      }

      setStatusMsg('Connecting to Flutterwave Secure Checkout...');

      // 2. Obtain Flutterwave Payment Link
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: cleanEmail,
          fullName: fullName.trim()
        }),
      });

      const checkoutData = await res.json();
      if (!res.ok) {
        throw new Error(checkoutData.error || 'Payment gateway connection error.');
      }

      if (checkoutData.paymentUrl) {
        setStatusMsg('Redirecting to checkout page...');
        window.location.href = checkoutData.paymentUrl;
      } else {
        throw new Error('Payment link could not be generated. Please contact support.');
      }

    } catch (err) {
      setRegError(err.message);
      setRegLoading(false);
      setStatusMsg('');
    }
  };

  if (!mounted) {
    return (
      <div className="admission-loading-container">
        <div className="spinner"></div>
        <p>Loading Admission Architecture...</p>
      </div>
    );
  }

  return (
    <div className="admission-page-container">
      {regLoading && (
        <div className="fullscreen-overlay">
          <div className="overlay-content">
            <div className="spinner large"></div>
            <h3>Securing Your Identity</h3>
            <p className="status-msg">{statusMsg}</p>
            <span className="warning-note">Do not close or reload this window.</span>
          </div>
        </div>
      )}

      {/* GUIDED JOURNEY OR REGISTRATION GATEWAY */}
      {currentScreen < 8 ? (
        <div className="admission-card-wrapper guided-slide-container">
          <div className="slide-top-bar">
            <div className="progress-dots">
              {Array.from({ length: 9 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`dot ${i === currentScreen ? 'active' : ''}`}
                  onClick={() => setCurrentScreen(i)}
                  style={{ cursor: 'pointer' }}
                />
              ))}
            </div>
            <button className="skip-btn" onClick={() => setCurrentScreen(8)}>
              Skip to Register
            </button>
          </div>

          <div className="slide-content" style={{ margin: '40px 0' }}>
            <div className="slide-question" style={{ color: 'var(--text-tertiary)', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>
              {screens[currentScreen].question}
            </div>
            <h2 className="slide-headline" style={{ fontSize: '32px', fontWeight: '800', lineHeight: '1.25', color: 'var(--text-primary)', marginBottom: '24px', letterSpacing: '-0.02em' }}>
              {screens[currentScreen].headline}
            </h2>
            <p className="slide-body" style={{ fontSize: '17px', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
              {screens[currentScreen].body}
            </p>
          </div>

          <div className="slide-nav-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '24px' }}>
            <button 
              className="back-arrow-btn" 
              onClick={() => setCurrentScreen(Math.max(0, currentScreen - 1))}
              disabled={currentScreen === 0}
              style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '14px', fontWeight: '600', cursor: currentScreen === 0 ? 'not-allowed' : 'pointer', display: 'inline-flex', alignItems: 'center', opacity: currentScreen === 0 ? 0.3 : 1 }}
            >
              <ArrowLeft size={16} style={{ marginRight: '6px' }} /> Back
            </button>
            <button 
              className="slide-cta-btn btn btn-primary"
              onClick={() => setCurrentScreen(currentScreen + 1)}
              style={{ padding: '14px 28px', fontSize: '15px', fontWeight: '700' }}
            >
              {screens[currentScreen].cta}
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* CLOSED STATE */}
          {!isOpen ? (
            <div className="admission-card-wrapper closed-state">
              {/* Header */}
              <div className="admission-header text-center">
                <div className="status-badge closed">
                  <Lock size={14} style={{ marginRight: '6px' }} />
                  Portal Closed
                </div>
                <h1 className="admission-headline">The Portal Is Closed. But Something Big Is Coming.</h1>
                <p className="admission-subheadline">
                  In <strong className="highlight-date">{timeLeft.days}</strong> days, we open admission for <strong>3,000 Nigerian graduates</strong>. One mission: Build businesses. Transform the nation. The countdown has started.
                </p>

                {/* Countdown Ticker */}
                <div className="countdown-ticker">
                  <div className="ticker-unit">
                    <span className="ticker-number">{timeLeft.days}</span>
                    <span className="ticker-label">Days</span>
                  </div>
                  <div className="ticker-unit">
                    <span className="ticker-number">{timeLeft.hours}</span>
                    <span className="ticker-label">Hours</span>
                  </div>
                  <div className="ticker-unit">
                    <span className="ticker-number">{timeLeft.minutes}</span>
                    <span className="ticker-label">Minutes</span>
                  </div>
                  <div className="ticker-unit">
                    <span className="ticker-number">{timeLeft.seconds}</span>
                    <span className="ticker-label">Seconds</span>
                  </div>
                </div>
              </div>

              <hr className="divider" />

              {/* Body Content */}
              <div className="admission-body-sections">
                
                {/* THE REALITY CHECK */}
                <div className="info-block">
                  <h3>The Reality Check</h3>
                  <p style={{ fontWeight: '700', fontSize: '16px', color: 'var(--text-primary)', marginBottom: '8px' }}>
                    You just graduated. Now what?
                  </p>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    No job. No capital. No direction.<br />
                    Your mates are posting "hustle" photos while staying broke.<br />
                    You're tired of noise. Tired of courses that teach nothing.<br />
                    You want <strong>real business. Real money. Real impact.</strong>
                  </p>
                  <p style={{ fontWeight: '700', color: 'var(--accent)', marginTop: '8px' }}>This is your moment.</p>
                </div>

                {/* WHAT IS FOXREVO? */}
                <div className="info-block">
                  <h3>What Is FoxRevo?</h3>
                  <p>Not another seminar. Not another WhatsApp course.</p>
                  <p style={{ fontWeight: '800', color: 'var(--text-primary)' }}>FoxRevo is a revolution.</p>
                  <p>We train ordinary Africans to:</p>
                  <ul style={{ paddingLeft: '20px', margin: '8px 0', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
                    <li>Build lasting wealth</li>
                    <li>Start real businesses</li>
                    <li>Become Africa's next great entrepreneurs</li>
                  </ul>
                  <p style={{ fontWeight: '700', color: 'var(--text-primary)' }}>3,000 graduates. One mission. Zero excuses.</p>
                </div>

                {/* WHAT YOU GET */}
                <div className="info-block">
                  <h3>What You Get</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
                    <div>✓ <strong>Real Knowledge</strong> — Not theory. What actually works.</div>
                    <div>✓ <strong>Real Strategies</strong> — Step-by-step business building.</div>
                    <div>✓ <strong>Real Growth</strong> — From campus to market leader.</div>
                    <div>✓ <strong>100% FREE</strong> — No catch. Just opportunity.</div>
                  </div>
                </div>

                {/* WHY THE PORTAL IS CLOSED */}
                <div className="info-block">
                  <h3>Why the Portal Is Closed</h3>
                  <p>We don't accept everyone. We open in <strong>controlled windows</strong>.</p>
                  <p>Only for those who are <strong>serious. Prepared. Ready.</strong></p>
                  <p className="notice-highlight">
                    Right now, the current cohort is building. Your window opens soon.
                  </p>
                </div>

                {/* WHAT TO DO NOW */}
                <div className="info-block channel-block text-center" style={{ backgroundColor: 'var(--bg-tertiary)', borderRadius: '6px', padding: '24px' }}>
                  <h3>What To Do Now</h3>
                  
                  <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '20px', margin: '20px 0' }}>
                    <div>
                      <h4 style={{ color: 'var(--text-primary)', marginBottom: '4px' }}>1. Join the Preparatory WhatsApp Group</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>Get exam materials. See proof. Know the exact opening time before others.</p>
                    </div>
                    
                    <a 
                      href="https://chat.whatsapp.com/F7vEC2ZWWmRGI5qhasXyiu" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-primary cta-btn-large"
                      style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto', width: '100%', maxWidth: '360px' }}
                    >
                      Join the Preparatory WhatsApp Group
                      <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                    </a>

                    <hr className="divider" style={{ margin: '8px 0' }} />

                    <div>
                      <h4 style={{ color: 'var(--text-primary)', marginBottom: '4px' }}>2. Drop Your Email</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: '0 0 12px 0' }}>We notify you the moment gates open. No spam. No noise.</p>
                      
                      {waitlistSuccess ? (
                        <div className="alert success">{waitlistSuccess}</div>
                      ) : (
                        <form onSubmit={handleWaitlistSubmit} className="inline-form">
                          <input
                            type="email"
                            placeholder="name@example.com"
                            value={waitlistEmail}
                            onChange={(e) => setWaitlistEmail(e.target.value)}
                            required
                            disabled={waitlistLoading}
                            className="form-input"
                          />
                          <button 
                            type="submit" 
                            disabled={waitlistLoading} 
                            className="btn btn-secondary inline-btn"
                          >
                            {waitlistLoading ? 'Submitting...' : 'Notify Me'}
                          </button>
                        </form>
                      )}
                      {waitlistError && <div className="alert error">{waitlistError}</div>}
                    </div>

                    <hr className="divider" style={{ margin: '8px 0' }} />

                    <div>
                      <h4 style={{ color: 'var(--text-primary)', marginBottom: '4px' }}>3. Prepare Yourself</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>Read the foundational article. The exam is timed. Proctored. Standard. Come ready or don't come at all.</p>
                    </div>
                  </div>
                </div>

                <hr className="divider" />

                {/* Support / Already passed */}
                <div className="support-section text-center">
                  <h4>Already Passed the Exam?</h4>
                  <p>
                    If you passed the entrance exam in a previous window and have not received your exam record document, contact us: <strong className="accent-color">+234 707 742 2928</strong>
                  </p>
                </div>
              </div>

              {/* Footer Quote */}
              <div className="admission-footer text-center" style={{ borderTop: '1px solid var(--border-medium)', paddingTop: '24px', marginTop: '24px' }}>
                <p style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-secondary)', margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  FoxRevo — The Silent Revolution Building Africa's Next Billionaires
                </p>
                <p className="footer-quote" style={{ fontSize: '15px', fontStyle: 'italic', margin: 0 }}>
                  “The best time to plant a tree was 20 years ago. The second best time is now.”
                </p>
              </div>
            </div>
          ) : (
            /* OPEN STATE */
            <div className="admission-card-wrapper open-state">
              {/* Header */}
              <div className="admission-header text-center">
                <div className="status-badge open">
                  <ShieldCheck size={14} style={{ marginRight: '6px' }} />
                  Portal Open
                </div>
                <h1 className="admission-headline">The Gates Are Open. <br />Complete Your Registration Now.</h1>
                <p className="admission-subheadline">
                  Admission is open for a limited window. To enter the cohort, you must register your identity, pay the ₦3,000 entrance examination fee, and pass the assessment.
                </p>
              </div>

              <hr className="divider" />

              {/* Warning Block */}
              <div className="warning-notice-box">
                <div className="warning-icon">
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <h4>The Admission Rule</h4>
                  <p>
                    We do not sell documents. We do not sell certificates. You are paying for the right to sit the entrance examination. If you score 45% or above, you are admitted. If you fail both attempts, your fee is lost and access is permanently denied.
                  </p>
                  <p className="warning-bold">
                    If you are looking for easy shortcuts, exit this page immediately.
                  </p>
                </div>
              </div>

              {/* Form */}
              <div className="registration-form-box">
                <h3>Registration Profile</h3>
                <p className="form-helper">Create your legal candidate credentials. Ensure your email is correct as it receives verification and score updates.</p>

                {regError && <div className="alert error">{regError}</div>}

                <form onSubmit={handleRegister} className="stacked-form">
                  <div className="form-group">
                    <label>Full Legal Name</label>
                    <input
                      type="text"
                      placeholder="e.g. John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Password (Min. 6 Characters)</label>
                    <input
                      type="password"
                      placeholder="Create password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Country of Residence</label>
                    <select 
                      value={country} 
                      onChange={(e) => setCountry(e.target.value)} 
                      className="form-input"
                    >
                      <option value="Nigeria">Nigeria</option>
                      <option value="Kenya">Kenya</option>
                      <option value="South Africa">South Africa</option>
                      <option value="Ghana">Ghana</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary btn-large w-full mt-4"
                  >
                    Register & Pay Exam Fee
                  </button>
                </form>
              </div>

              <hr className="divider" />

              {/* Re-entry */}
              <div className="support-section text-center">
                <h4>Already Registered or Passed?</h4>
                <p>
                  If you already registered or passed in a previous cohort and need to download your blueprint,{' '}
                  <Link href="/login" className="login-link-underlined">Login Here</Link> to access your dashboard.
                </p>
              </div>

              {/* Footer Quote */}
              <div className="admission-footer text-center">
                <p className="footer-quote">
                  “An empty mind is the devil’s workshop. A right mind is the architect of nations.” <br />
                  <span className="quote-author">— Chinese Proverb (Adapted)</span>
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
