"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { X, CheckCircle, Award, ShieldAlert, Sparkles } from 'lucide-react';
import { createClient } from '../utils/supabase/client';
import './FunnelPopup.css';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    text: "He works 5-8 hours daily to make ₦8M/month. Will you?",
    options: [
      { text: "Yes, I will put in the work.", dq: false },
      { text: "No, I want a passive shortcut.", dq: true }
    ]
  },
  {
    id: 2,
    text: "Have you ever made ₦3,000,000 in a single month?",
    options: [
      { text: "Yes.", dq: false },
      { text: "No, but I'm desperate to break through.", dq: false },
      { text: "No, and I don't know where to start.", dq: false }
    ]
  },
  {
    id: 3,
    text: "If we give you the exact blueprint, will you execute it today?",
    options: [
      { text: "Yes, immediately.", dq: false },
      { text: "I'll probably wait for the \"right time.\"", dq: true }
    ]
  },
  {
    id: 4,
    text: "The blueprint is serious and disciplined. Do you have the mental focus to read a 100-page operational manual?",
    options: [
      { text: "Yes, fully.", dq: false },
      { text: "No, I prefer quick videos and highlights.", dq: true }
    ]
  },
  {
    id: 5,
    text: "Building a business takes courage. Are you willing to disconnect from negative influences to build a legacy?",
    options: [
      { text: "Yes, absolutely.", dq: false },
      { text: "No, I care too much about peer opinions.", dq: true }
    ]
  }
];

export default function FunnelPopup() {
  const pathname = usePathname();
  const supabase = createClient();

  const showPopupOnRoutes = ['/', '/admission'];
  const shouldRenderOnRoute = showPopupOnRoutes.includes(pathname);

  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [step, setStep] = useState(1); // 1: Interrupt, 2: Reality Check, 3: Quiz, 4: Pivot/bait, 5: Register, 6: Paywall
  const [quizIndex, setQuizIndex] = useState(0);
  
  // Registration state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('Nigeria');
  const [regLoading, setRegLoading] = useState(false);
  const [regError, setRegError] = useState('');

  // Checkout redirect state
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  // 5-second initial trigger
  useEffect(() => {
    if (!shouldRenderOnRoute) return;

    // Check if user has already completed registration or payment in this session
    const isCompleted = sessionStorage.getItem('foxrevo_funnel_done') === 'true';
    if (isCompleted) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
      setStep(1);
    }, 5000);

    return () => clearTimeout(timer);
  }, [pathname, shouldRenderOnRoute]);

  // 30-second re-trigger if closed
  useEffect(() => {
    if (isOpen || !shouldRenderOnRoute || hasStarted) return;

    const reCompleted = sessionStorage.getItem('foxrevo_funnel_done') === 'true';
    if (reCompleted) return;

    const retriggerTimer = setTimeout(() => {
      setIsOpen(true);
      setStep(1);
    }, 30000);

    return () => clearTimeout(retriggerTimer);
  }, [isOpen, shouldRenderOnRoute, hasStarted]);

  if (!mounted || !shouldRenderOnRoute) {
    return null;
  }

  if (!isOpen) {
    // Show teaser badge if popup is closed and registration hasn't started yet
    const completed = sessionStorage.getItem('foxrevo_funnel_done') === 'true';
    if (!completed) {
      return (
        <button 
          type="button"
          onClick={() => { setIsOpen(true); setStep(1); setHasStarted(true); }}
          className="funnel-teaser-badge print-hide"
        >
          <Sparkles size={16} />
          Reveal ₦8M/Month Blueprint
        </button>
      );
    }
    return null;
  }

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleNextStep = () => {
    setHasStarted(true);
    setStep((prev) => prev + 1);
  };

  const handleQuizAnswer = (isDq) => {
    if (isDq) {
      setStep('disqualified');
      return;
    }
    if (quizIndex < QUIZ_QUESTIONS.length - 1) {
      setQuizIndex((prev) => prev + 1);
    } else {
      setStep(4); // Move to Pivot & Bait
    }
  };

  const handleRetryQuiz = () => {
    setQuizIndex(0);
    setStep(3);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setRegError('All fields are required.');
      return;
    }
    if (password.length < 6) {
      setRegError('Password must be at least 6 characters.');
      return;
    }

    setRegLoading(true);
    setRegError('');

    try {
      // 1. Sign up auth record in Supabase
      const { error: signUpError } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password: password,
        options: {
          data: {
            full_name: fullName.trim(),
            country: country
          }
        }
      });

      if (signUpError) {
        throw new Error(signUpError.message);
      }

      // Mark local session as done to prevent popups
      sessionStorage.setItem('foxrevo_funnel_done', 'true');
      
      // Move to Step 6: Velvet Rope Paywall
      setStep(6);
    } catch (err) {
      setRegError(err.message);
    } finally {
      setRegLoading(false);
    }
  };

  const handlePaySacrifice = async () => {
    setCheckoutLoading(true);
    setCheckoutError('');
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          fullName: fullName.trim(),
          type: 'exam'
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Payment link creation failed.');
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      }
    } catch (err) {
      setCheckoutError(err.message);
      setCheckoutLoading(false);
    }
  };

  return (
    <div className="funnel-overlay print-hide">
      <div className={`funnel-modal step-${step}`}>
        
        {/* Close Button */}
        {step !== 'disqualified' && step !== 6 && (
          <button onClick={handleClose} className="funnel-close-btn" aria-label="Close funnel">
            <X size={20} />
          </button>
        )}

        {/* STEP 1: PATTERN INTERRUPT */}
        {step === 1 && (
          <div className="funnel-step-content text-center dark-bg">
            <h2 className="funnel-headline text-white font-bold">
              How A 21-Year-Old In Lagos Makes ₦3,000,000/Month (Without TikTok, Courses, Or Begging For Views).
            </h2>
            <p className="funnel-subtext text-gray">
              No hacks. No loopholes. Just a repeatable system. But it requires a sacrifice.
            </p>
            <button onClick={handleNextStep} className="funnel-btn btn-wine">
              Show Me The System
            </button>
          </div>
        )}

        {/* STEP 2: THE REALITY CHECK */}
        {step === 2 && (
          <div className="funnel-step-content text-center light-bg">
            <h2 className="funnel-headline text-dark font-black">
              The Reality Check.
            </h2>
            <div className="funnel-body-copy text-dark">
              <p>Two years ago, a 21-year-old Nigerian was tired of watching his mates perform fake wealth while his bank account was empty.</p>
              <p>He didn't want a shortcut. He wanted the architecture.</p>
              <p>Today, he generates <strong>₦8,000,000+ every single month</strong> using just his phone and a laptop.</p>
              <p className="highlight-catch">
                <strong>The Catch?</strong><br />
                He spends 5 to 8 hours a day building it. No excuses.
              </p>
              <p>We have his exact blueprint. But we only give it to those willing to do the work.</p>
            </div>
            <button onClick={handleNextStep} className="funnel-btn btn-wine">
              I'm Ready. Show Me The Blueprint
            </button>
          </div>
        )}

        {/* STEP 3: THE QUIZ FILTER */}
        {step === 3 && (
          <div className="funnel-step-content secure-portal">
            <div className="funnel-step-header text-center">
              <Award className="funnel-header-icon" size={32} />
              <h3 className="secure-title">FoxRevo Qualification Assessment</h3>
              <p className="secure-subtitle">Answer honestly. This determines if you qualify.</p>
              <div className="progress-dots">
                {QUIZ_QUESTIONS.map((_, idx) => (
                  <span key={idx} className={`dot ${idx === quizIndex ? 'active' : idx < quizIndex ? 'completed' : ''}`}></span>
                ))}
              </div>
            </div>

            <div className="quiz-question-container">
              <span className="question-number">Question {quizIndex + 1} of {QUIZ_QUESTIONS.length}</span>
              <h4 className="question-text">{QUIZ_QUESTIONS[quizIndex].text}</h4>
              <div className="options-list">
                {QUIZ_QUESTIONS[quizIndex].options.map((opt, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => handleQuizAnswer(opt.dq)}
                    className="option-button"
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* DISQUALIFIED SCREEN */}
        {step === 'disqualified' && (
          <div className="funnel-step-content text-center disqualified-state">
            <ShieldAlert size={60} className="dq-icon" />
            <h2 className="funnel-headline text-dark font-black">Assessment Disqualified</h2>
            <p className="dq-body">
              The FoxRevo blueprints only belong to legacy builders willing to commit their attention and labor. We do not deal with shortcut seekers.
            </p>
            <button onClick={handleRetryQuiz} className="funnel-btn btn-dark">
              Retry & Answer Honestly
            </button>
          </div>
        )}

        {/* STEP 4: THE PIVOT & BAIT */}
        {step === 4 && (
          <div className="funnel-step-content text-center light-bg">
            <div className="success-checkmark">
              <CheckCircle size={56} className="checkmark-icon" />
            </div>
            <h2 className="funnel-headline text-dark font-black">🟢 Profile Analyzed. You Qualify.</h2>
            <div className="funnel-body-copy text-dark">
              <p>You’ve proven you’re serious. Now, it’s our turn to deliver.</p>
              <p>You just unlocked the exact, unfiltered strategy this 21-year-old used to build his ₦8M/month engine.</p>
              <p className="free-offer">The Blueprint is 100% FREE.</p>
            </div>
            <button onClick={handleNextStep} className="funnel-btn btn-wine">
              Send The Free Blueprint To My Email
            </button>
          </div>
        )}

        {/* STEP 5: REGISTRATION FORM */}
        {step === 5 && (
          <div className="funnel-step-content register-step">
            <h3 className="secure-title text-center">Secure Your Identity</h3>
            <p className="secure-subtitle text-center">Fill in details to create your dashboard credential.</p>
            
            {regError && <div className="funnel-error">{regError}</div>}
            
            <form onSubmit={handleRegister} className="funnel-form">
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. John Doe" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  placeholder="e.g. john@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Create Password</label>
                <input 
                  type="password" 
                  placeholder="Minimum 6 characters" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Country of Residence</label>
                <select value={country} onChange={(e) => setCountry(e.target.value)}>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Kenya">Kenya</option>
                  <option value="South Africa">South Africa</option>
                  <option value="Egypt">Egypt</option>
                </select>
              </div>
              <button 
                type="submit" 
                disabled={regLoading}
                className="funnel-btn btn-wine w-full"
                style={{ marginTop: '16px' }}
              >
                {regLoading ? 'Registering...' : 'Claim & Secure Blueprint'}
              </button>
            </form>
          </div>
        )}

        {/* STEP 6: THE VELVET ROPE PAYWALL */}
        {step === 6 && (
          <div className="funnel-step-content paywall-step">
            <h2 className="funnel-headline text-dark font-black text-center">
              Wait. Before We Send It...
            </h2>
            <div className="funnel-body-copy text-dark">
              <p>The blueprint is free. But to access the <strong>Official Assessment Portal</strong> and the advanced implementation tools, there is a condition.</p>
              
              <div className="price-tag text-center">
                <span className="price-label">Commitment Sacrifice:</span>
                <span className="price-value">₦3,000</span>
              </div>

              <p className="paywall-explanation">
                <strong>Why?</strong><br />
                Because we don't deal with freebie-seekers who download, read two pages, and go back to scrolling. This isn't a fee. <strong>It’s a filter.</strong>
              </p>
              
              <p>It is the psychological proof that you are finally done playing games with your financial future. It ensures only the serious enter the revolution.</p>
              
              <p className="paywall-ultimatum">
                If you aren't willing to sacrifice ₦3,000 to end a lifetime of financial struggle... this isn't for you. Close this page.
              </p>
              
              <p>But if you're ready to make this your last opportunity to escape poverty...</p>
            </div>

            {checkoutError && <div className="funnel-error" style={{ marginBottom: '16px' }}>{checkoutError}</div>}

            <button 
              onClick={handlePaySacrifice} 
              disabled={checkoutLoading}
              className="funnel-btn btn-wine w-full"
            >
              {checkoutLoading ? 'Redirecting to Checkout...' : 'Pay The ₦3,000 Sacrifice & Take The Exam'}
            </button>
            <span className="secure-subtext">Secure payment verified via Flutterwave. Instant access. No refunds.</span>
          </div>
        )}

      </div>
    </div>
  );
}
