"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '../utils/supabase/client';
import { AlertCircle, ArrowRight, CheckCircle2, BookOpen, ShieldCheck, Lock, Award, RotateCcw, Facebook, Linkedin, Send } from 'lucide-react';
import './page.css';

export default function Home() {
  const router = useRouter();
  const supabase = createClient();

  const [mounted, setMounted] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [regLoading, setRegLoading] = useState(false);
  const [regError, setRegError] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  // Interactive FAQ state
  const [openFaq, setOpenFaq] = useState(null);
  
  // Voice swipe state
  const [currentVoiceIndex, setCurrentVoiceIndex] = useState(0);
  const [showStickyCta, setShowStickyCta] = useState(false);

  // Interactive Dashboard Mockup Tab state
  const [activeMockupTab, setActiveMockupTab] = useState('vault'); // 'vault' | 'exam' | 'certificate'
  
  // Sample Exam Question states
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [gradedState, setGradedState] = useState(null); // null | 'success' | 'retry'
  
  // Real-time certificate preview text state
  const [certName, setCertName] = useState('Your Name');

  // Interactive Curriculum Explorer Tab state
  const [activeCurriculumTab, setActiveCurriculumTab] = useState('part1'); // 'part1' | 'part2' | 'part3'
  
  // Interactive OS Guide Slider state
  const [currentSlide, setCurrentSlide] = useState(0);

  const osSlides = [
    {
      title: "The Book IS the Operating System",
      badge: "SLIDE 1: SYSTEM DEFINITION",
      text: "FoxRevo OS is not literature to skim for entertainment. It is software for your mind. Sourced from the documented wealth patterns of Musk, Buffett, and Dangote, it is designed to overwrite the default employee curriculum and install a permanent, lifetime wealth-builder mindset.",
      icon: "⚙️"
    },
    {
      title: "Phase 1: Download & Detox",
      badge: "SLIDE 2: PHASE ONE INITIALIZATION",
      text: "After onboarding, download Part 1 (The Detox) directly to your dashboard. You will read with a physical notebook to audit your cash flows, locate structural overhead leaks, and name the specific psychological and physical noise elements draining your focus.",
      icon: "📥"
    },
    {
      title: "Phase 2: Mandatory Assessments",
      badge: "SLIDE 3: CHECKPOINT FILTER GATE",
      text: "FoxRevo OS is a sequential operating system. You cannot skip chapters. At the completion of each part of the book, you must log into your dashboard and sit the corresponding assessment exam. Passing is the only way to unlock the next part.",
      icon: "🛡️"
    },
    {
      title: "Phase 3: The Rewire Protocol",
      badge: "SLIDE 4: SUBCONSCIOUS UPGRADE",
      text: "In Part 2 (The Rewire), the OS changes how your mind processes opportunity. You will master first-principles deconstruction, study microeconomic asset pillars, and locate hidden cash flow within market friction in African realities.",
      icon: "🧠"
    },
    {
      title: "Phase 4: Lean Validation Wizard",
      badge: "SLIDE 5: MODEL TESTING & VALIDATION",
      text: "Part 3 (The Build) transitions you from theory to execution. You will outline your Minimum Viable Offer (MVO) and deploy it to get target customer pre-signups, evaluating your ideas using the platform's wizard before spending capital.",
      icon: "🧪"
    },
    {
      title: "Phase 5: Graduate Registry",
      badge: "SLIDE 6: CREDENTIAL ACTIVATION",
      text: "Clearing all checks locks in your verified status. Your credentials activate on the public cryptographic registry, and you gain lifetime access to the private builder forum to launch legacy projects with fellow architects.",
      icon: "🎓"
    }
  ];

  const voiceQuotes = [
    "I would not mind paying more for this. It is worth it.",
    "I have always known there is a system sold to Africans that is not built for us. FoxRevo is the first thing that actually addressed it.",
    "I am a developer. I build things for clients all day. FoxRevo was the first time someone showed me how to make my skills compound instead of just trading them for hours.",
    "In the first module alone I saw three things I had been doing completely wrong for years.",
    "I thought I wanted to start a business. I left knowing I was building a legacy. That distinction changes everything.",
    "The entrance exam made me take this seriously from day one. By the time I got inside, I was already in a different headspace."
  ];

  const quotesList = [
    { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
    { text: "If you don't find a way to make money while you sleep, you will work until you die.", author: "Warren Buffett" },
    { text: "We must build what we consume, and consume what we build.", author: "Aliko Dangote" },
    { text: "You must learn to use debt to buy assets, not liabilities.", author: "Robert Kiyosaki" },
    { text: "The standard of a nation is built by the ambition of its youth.", author: "Wole Soyinka" },
    { text: "If you want to go fast, go alone. If you want to go far, go together.", author: "African Proverb" },
    { text: "If you don't build your dream, someone else will hire you to help them build theirs.", author: "Tony Gaskins" },
    { text: "Today is hard, tomorrow will be worse, but the day after tomorrow will be sunshine.", author: "Jack Ma" },
    { text: "The biggest risk is not taking any risk.", author: "Mark Zuckerberg" },
    { text: "The greatest danger for most of us is not that our aim is too high and we miss it, but that it is too low and we reach it.", author: "Michelangelo" }
  ];

  const authoritySources = [
    "Warren Buffett", "Robert Kiyosaki", "Elon Musk", "Aliko Dangote",
    "Ray Dalio", "Simon Sinek", "Peter Thiel", "Mohnish Pabrai",
    "Tony Robbins", "Eric Ries", "Jay Shetty", "Lewis Howes", "Bill Gates"
  ];

  useEffect(() => {
    setMounted(true);
    
    // Check query parameter to scroll to register block
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('scroll') === 'register') {
        const el = document.getElementById('register');
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 150);
        }
      }

      const handleScroll = () => {
        if (window.scrollY > 600) {
          setShowStickyCta(true);
        } else {
          setShowStickyCta(false);
        }
      };
      window.addEventListener('scroll', handleScroll);
      
      // Auto voice quote swiper interval
      const interval = setInterval(() => {
        setCurrentVoiceIndex((prev) => (prev + 1) % voiceQuotes.length);
      }, 4500);

      return () => {
        window.removeEventListener('scroll', handleScroll);
        clearInterval(interval);
      };
    }
  }, []);

  const handleScrollToRegister = (e) => {
    e.preventDefault();
    const el = document.getElementById('register');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleGradeSampleExam = () => {
    if (selectedAnswer === 1) {
      setGradedState('success');
    } else {
      setGradedState('retry');
    }
  };

  const handleResetSampleExam = () => {
    setSelectedAnswer(null);
    setGradedState(null);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      setRegError('You must agree to the Terms Before Applying.');
      return;
    }
    setRegLoading(true);
    setRegError('');
    setStatusMsg('Creating profile...');

    const cleanEmail = email.trim().toLowerCase();

    try {
      // 1. Register candidate account in Supabase Auth
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: { 
          data: { 
            full_name: fullName.trim(),
            country: 'Nigeria'
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

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  if (!mounted) {
    return (
      <div className="home-loading">
        <div className="spinner"></div>
        <p>Loading FOXREVO OS...</p>
      </div>
    );
  }

  return (
    <div className="home-container">
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

      {/* Decorative Glow Blobs */}
      <div className="glow-blob blob-1"></div>
      <div className="glow-blob blob-2"></div>
      <div className="glow-blob blob-3"></div>

      {/* HERO SECTION — ATTENTION */}
      <header className="hero-section text-center">
        <div className="hero-content-wide">
          <div className="saas-badge">FOXREVO OS v2.0</div>
          
          <h1 className="hero-headline-full neon-text-glow">
            Stop trading hours for pennies.<br />
            Install the Wealth OS.
          </h1>
          
          <p className="hero-lead-accent font-outfit">
            You have the skills. You still do not have the wealth. We install the system that changes that.
          </p>
          
          <div className="hero-capabilities-badge-row">
            <span className="cap-badge">✓ Deprogram the employee mindset</span>
            <span className="cap-badge">✓ Install compounding asset columns</span>
            <span className="cap-badge">✓ Build scalable systems, not hustles</span>
          </div>

          <div style={{ marginTop: '40px' }} className="hero-cta-wrapper">
            <a href="#register" onClick={handleScrollToRegister} className="btn-cta-scroll full-mobile neon-btn">
              <span>Initialize FoxRevo OS (₦3,000) →</span>
            </a>
            <p className="hero-cta-subtext">
              ₦3,000 profile fee | Readiness Audit included | Two attempts | Certificate on Graduation
            </p>
            <p className="hero-warning-text font-outfit">
              ⚠️ Profile activation fee increases to ₦5,000 after 1,000 verified builders are confirmed.
            </p>
          </div>
        </div>
      </header>

      {/* INFINITE SCROLL STRIP (WINE RED BACKGROUND) */}
      <div className="social-proof-ticker wine-red-ticker">
        <div className="ticker-track-new">
          <span><strong>500+</strong> African Billionaires Projected by 2035</span>
          <span><strong>10,000+</strong> Millionaires</span>
          <span><strong>1,000+</strong> African-Founded Tech Companies</span>
          <span><strong>500+</strong> Globally Recognised Brands</span>
          <span><strong>10,000+</strong> World-Competing Entrepreneurs</span>
          {/* Duplicate for loop */}
          <span><strong>500+</strong> African Billionaires Projected by 2035</span>
          <span><strong>10,000+</strong> Millionaires</span>
          <span><strong>1,000+</strong> African-Founded Tech Companies</span>
          <span><strong>500+</strong> Globally Recognised Brands</span>
          <span><strong>10,000+</strong> World-Competing Entrepreneurs</span>
        </div>
      </div>

      {/* PRODUCT WORKSPACE PREVIEW */}
      <section className="section-block padding-y" id="product-preview">
        <div className="text-center" style={{ marginBottom: '32px' }}>
          <div className="saas-badge mini">PRODUCT WORKSPACE PREVIEW</div>
          <h2>Your Platform Workspace</h2>
          <p className="section-subtitle">Click the tabs below to preview the digital deprogramming tools you gain access to.</p>
        </div>

        <div className="dashboard-mockup-wrapper glass-card">
          {/* Mockup Header */}
          <div className="mockup-header">
            <div className="window-dots">
              <span className="dot dot-red"></span>
              <span className="dot dot-yellow"></span>
              <span className="dot dot-green"></span>
            </div>
            <div className="mockup-address-bar font-inter">platform.foxrevo.com/dashboard</div>
          </div>

          <div className="mockup-body">
            {/* Sidebar Controls */}
            <div className="mockup-sidebar">
              <button 
                onClick={() => setActiveMockupTab('vault')} 
                className={`sidebar-tab ${activeMockupTab === 'vault' ? 'active' : ''}`}
              >
                <BookOpen size={16} />
                <span>Knowledge Vault</span>
              </button>
              <button 
                onClick={() => setActiveMockupTab('exam')} 
                className={`sidebar-tab ${activeMockupTab === 'exam' ? 'active' : ''}`}
              >
                <ShieldCheck size={16} />
                <span>Readiness Audit</span>
              </button>
              <button 
                onClick={() => setActiveMockupTab('certificate')} 
                className={`sidebar-tab ${activeMockupTab === 'certificate' ? 'active' : ''}`}
              >
                <Award size={16} />
                <span>Credentials OS</span>
              </button>
            </div>

            {/* Active Content Panel */}
            <div className="mockup-content">
              {activeMockupTab === 'vault' && (
                <div className="vault-mockup animate-fade">
                  <h4>Deprogramming Library</h4>
                  <p className="panel-desc">All platform assets, lectures, and interactive checkpoints live here.</p>
                  
                  <div className="mockup-vault-grid">
                    <div className="vault-item">
                      <span className="part-badge">PART 1</span>
                      <h5>The Detox Curriculum</h5>
                      <span className="completion-stats">4 lectures • 2 Checkpoints completed</span>
                      <div className="progress-bar-mock"><div className="progress-fill-mock w-half"></div></div>
                    </div>
                    <div className="vault-item locked">
                      <span className="part-badge">PART 2</span>
                      <h5>The Rewire Curriculum</h5>
                      <span className="completion-stats"><Lock size={12} style={{ display: 'inline', marginRight: '4px' }} /> Locked until Part 1 passed</span>
                      <div className="progress-bar-mock"><div className="progress-fill-mock w-zero"></div></div>
                    </div>
                    <div className="vault-item locked">
                      <span className="part-badge">PART 3</span>
                      <h5>The Build Curriculum</h5>
                      <span className="completion-stats"><Lock size={12} style={{ display: 'inline', marginRight: '4px' }} /> Locked until Part 2 passed</span>
                      <div className="progress-bar-mock"><div className="progress-fill-mock w-zero"></div></div>
                    </div>
                  </div>
                </div>
              )}

              {activeMockupTab === 'exam' && (
                <div className="exam-mockup animate-fade">
                  <div className="exam-header-mock">
                    <h4>FoxRevo Readiness Audit Center</h4>
                    <span className="timer-mock">⏱️ 29:45 remaining</span>
                  </div>
                  <p className="panel-desc">You are permitted 2 attempts at the readiness audit. Try the sample question below:</p>

                  <div className="quiz-question-box">
                    <h5 className="question-text">
                      Q: Which of the following best defines "compounding assets" in the FoxRevo framework?
                    </h5>
                    
                    <div className="quiz-options">
                      <button 
                        onClick={() => setSelectedAnswer(0)} 
                        className={`quiz-option-btn ${selectedAnswer === 0 ? 'selected' : ''}`}
                        disabled={gradedState === 'success'}
                      >
                        <span>A. A high-yield savings account locked in local currency.</span>
                      </button>
                      <button 
                        onClick={() => setSelectedAnswer(1)} 
                        className={`quiz-option-btn ${selectedAnswer === 1 ? 'selected' : ''}`}
                        disabled={gradedState === 'success'}
                      >
                        <span>B. A scalable business system with a structural moat that produces cash flow to be reinvested.</span>
                      </button>
                      <button 
                        onClick={() => setSelectedAnswer(2)} 
                        className={`quiz-option-btn ${selectedAnswer === 2 ? 'selected' : ''}`}
                        disabled={gradedState === 'success'}
                      >
                        <span>C. A passive index fund that averages 3% growth in inflation environments.</span>
                      </button>
                    </div>

                    <div className="quiz-actions mt-3">
                      {gradedState === null ? (
                        <button 
                          onClick={handleGradeSampleExam} 
                          className="btn-submit-cta mini-btn"
                          disabled={selectedAnswer === null}
                        >
                          Grade My Answer
                        </button>
                      ) : gradedState === 'success' ? (
                        <div className="grader-feedback success animate-scale">
                          <CheckCircle2 size={16} />
                          <span>Correct! Option B is the framework. Access token validated.</span>
                          <button onClick={handleResetSampleExam} className="reset-quiz-btn"><RotateCcw size={12} /></button>
                        </div>
                      ) : (
                        <div className="grader-feedback retry animate-scale">
                          <span>Incorrect. That definition is a liability. Try again.</span>
                          <button onClick={handleResetSampleExam} className="btn-submit-cta mini-btn outlined-btn">Retry</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeMockupTab === 'certificate' && (
                <div className="certificate-mockup animate-fade">
                  <h4>FoxRevo Credential Verification System</h4>
                  <p className="panel-desc">All graduated candidates receive a secure, cryptographic, shareable certificate. Type your name below to preview yours:</p>
                  
                  <div className="name-input-wrapper">
                    <input 
                      type="text" 
                      placeholder="Type your name..." 
                      value={certName}
                      onChange={(e) => setCertName(e.target.value || 'Your Name')} 
                      className="mockup-name-input"
                    />
                  </div>

                  <div className="certificate-canvas-mock">
                    <div className="cert-border-mock">
                      <div className="cert-watermark-mock">FOXREVO CERTIFIED</div>
                      <h3>FOXREVO OS GRADUATE</h3>
                      <p className="cert-recipient-name font-outfit">{certName}</p>
                      <p className="cert-declaration">has successfully completed the complete wealth deprogramming curriculum and demonstrated mastery of compounding asset structures.</p>
                      <div className="cert-footer-details">
                        <span>ID: FR-OS-99824</span>
                        <span>Sign: Benedict A., Founder</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE OS GUIDE SLIDER (SLIDE 1 TO 6) */}
      <section className="section-block padding-y" id="os-guide">
        <div className="text-center" style={{ marginBottom: '40px' }}>
          <div className="saas-badge mini">SYSTEM OPERATIONS MANUAL</div>
          <h2>How the Wealth Operating System Works</h2>
          <p className="section-subtitle font-inter">The book is not literature. It is software for your mind. Study the 6 phases of deployment below.</p>
        </div>

        <div className="glass-card os-slider-card animate-scale" style={{ padding: '40px', position: 'relative' }}>
          <div className="os-slide-icon-bg" style={{ fontSize: '48px', marginBottom: '20px' }}>
            {osSlides[currentSlide].icon}
          </div>
          
          <span style={{ fontSize: '11px', color: 'var(--accent-neon)', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
            {osSlides[currentSlide].badge}
          </span>
          
          <h3 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '16px', fontFamily: 'var(--font-outfit), sans-serif' }}>
            {osSlides[currentSlide].title}
          </h3>

          <p style={{ fontSize: '15.5px', color: 'var(--text-secondary)', lineHeight: '1.7', margin: '0 0 32px 0' }}>
            {osSlides[currentSlide].text}
          </p>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px' }}>
            <button 
              onClick={() => setCurrentSlide((prev) => (prev > 0 ? prev - 1 : osSlides.length - 1))}
              className="btn-submit-cta mini-btn outlined-btn"
              style={{ padding: '8px 16px', fontSize: '13px' }}
            >
              ← Previous
            </button>

            <div style={{ display: 'flex', gap: '8px' }}>
              {osSlides.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: currentSlide === idx ? 'var(--accent-neon)' : 'var(--border-light)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button 
              onClick={() => setCurrentSlide((prev) => (prev < osSlides.length - 1 ? prev + 1 : 0))}
              className="btn-submit-cta mini-btn"
              style={{ padding: '8px 16px', fontSize: '13px' }}
            >
              Next →
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 1 — INTEREST */}
      <section className="section-block padding-y" id="pain">
        <div className="text-center" style={{ marginBottom: '40px' }}>
          <div className="saas-badge mini">THE SKILL TRAP</div>
          <h2>Why You Are Stuck.</h2>
          <p className="section-subtitle font-inter">Effort without the right framework is just expensive practice.</p>
        </div>

        <div className="pain-points-aida-grid">
          <div className="pain-card glass-card">
            <h4>Tired of active freelancing?</h4>
            <p>Trading hours for dollars is just remote employment. If you stop pushing proposals, your income drops to zero instantly.</p>
          </div>
          
          <div className="pain-card glass-card">
            <h4>Tired of notes-app ideas?</h4>
            <p>Ideas are useless without validation. The wealthy build scalable business systems using repeatable launch frameworks, not creative inspiration.</p>
          </div>

          <div className="pain-card glass-card">
            <h4>Tired of savings decay?</h4>
            <p>Storing cash in local bank accounts is a mathematical loss. Inflation destroys capital daily. Moats and structural assets survive.</p>
          </div>
        </div>

        <div className="pain-highlight-text text-center neon-glow-box" style={{ marginTop: '48px' }}>
          <strong>You are not behind. You were just handed the wrong map.</strong>
        </div>

        <div className="button-group-desktop mt-4" style={{ justifyContent: 'center' }}>
          <a href="#register" onClick={handleScrollToRegister} className="btn-submit-cta neon-btn" style={{ textDecoration: 'none' }}>
            <span>Initialize FoxRevo OS →</span>
          </a>
          <Link href="/about" className="desktop-btn-secondary" style={{ border: '1px solid var(--border-medium)', borderRadius: '8px', padding: '12px 24px' }}>
            Read Our Mission →
          </Link>
        </div>
      </section>

      {/* SECTION 2 — DESIRE (INTERACTIVE CURRICULUM EXPLORER) */}
      <section className="section-block padding-y" id="curriculum">
        <div className="text-center" style={{ marginBottom: '32px' }}>
          <div className="saas-badge mini">SYLLABUS BLUEPRINTS</div>
          <h2>Syllabus Architecture: Browse the Deprogramming Vault</h2>
          <p className="section-subtitle">Click the modules below to preview what you will install.</p>
        </div>

        {/* Tab switcher headers */}
        <div className="curriculum-tabs-header glass-card">
          <button 
            onClick={() => setActiveCurriculumTab('part1')}
            className={`curriculum-tab-btn ${activeCurriculumTab === 'part1' ? 'active' : ''}`}
          >
            Module 1: The Detox
          </button>
          <button 
            onClick={() => setActiveCurriculumTab('part2')}
            className={`curriculum-tab-btn ${activeCurriculumTab === 'part2' ? 'active' : ''}`}
          >
            Module 2: The Rewire
          </button>
          <button 
            onClick={() => setActiveCurriculumTab('part3')}
            className={`curriculum-tab-btn ${activeCurriculumTab === 'part3' ? 'active' : ''}`}
          >
            Module 3: The Build
          </button>
        </div>

        {/* Dynamic content rendering */}
        <div className="curriculum-content-display glass-card animate-fade">
          {activeCurriculumTab === 'part1' && (
            <div className="curriculum-panel">
              <span className="benefit-index">MODULE 1</span>
              <h3>Why Your Money Keeps Disappearing</h3>
              <p className="panel-lead">This module deprograms the default employee curriculum that confuses active income with wealth.</p>
              
              <ul className="syllabus-blueprint-list">
                <li><strong>The Inflation Fallacy:</strong> Why saving inside local bank accounts actively destroys wealth, and how to preserve assets.</li>
                <li><strong>The Employee Trap:</strong> Programmed logic that keeps smart builders trading time for money.</li>
                <li><strong>The Asset Map:</strong> The differences between true cash-generating assets and hidden liabilities.</li>
              </ul>
              
              <div className="module-footer-info">
                <strong>Checkpoint requirement:</strong> Define your baseline burn rate and map out 3 immediate structural leaks.
              </div>
            </div>
          )}

          {activeCurriculumTab === 'part2' && (
            <div className="curriculum-panel">
              <span className="benefit-index">MODULE 2</span>
              <h3>Rewiring for Opportunity Recognition</h3>
              <p className="panel-lead">Extract the first-principles mental models Aliko Dangote and Elon Musk used to identify structural gaps in complex markets.</p>
              
              <ul className="syllabus-blueprint-list">
                <li><strong>First-Principles Deconstruction:</strong> Stripping a problem down to its atomic elements to identify high-value solutions.</li>
                <li><strong>Structural Debt Leverage:</strong> How the wealthy utilize strategic leverage to capture assets rather than fear it.</li>
                <li><strong>Friction Points:</strong> Locating cash flow hiding in plain sight within commercial friction.</li>
              </ul>

              <div className="module-footer-info">
                <strong>Checkpoint requirement:</strong> Identify one local structural gap and draft its deconstructed solution map.
              </div>
            </div>
          )}

          {activeCurriculumTab === 'part3' && (
            <div className="curriculum-panel">
              <span className="benefit-index">MODULE 3</span>
              <h3>Scale and Build Systems</h3>
              <p className="panel-lead">Transition from self-employment and high-end freelancing into scalable assets that compound without your direct attendance.</p>
              
              <ul className="syllabus-blueprint-list">
                <li><strong>Zero-Capital Validation:</strong> Lean Startup frameworks to test, validate, and fund offers before incurring development expenses.</li>
                <li><strong>Moat Architecture:</strong> How to build proprietary structures that protect your business system from competitors.</li>
                <li><strong>Deprogramming Audiences:</strong> Rewiring the mindset that confuses flash and visibility with asset value.</li>
              </ul>

              <div className="module-footer-info">
                <strong>Checkpoint requirement:</strong> Launch a validated offer page and secure 5 target users without building the software.
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 3 — THE AUTHORITY (DESIRE) */}
      <section className="section-block padding-y" id="authority">
        <h2>This Is Not Someone's Opinion.</h2>
        <p className="lead-paragraph">
          Every principle inside FoxRevo was extracted from the real, documented, cited lives of:
        </p>
        
        <div className="authority-names-grid">
          <strong>Warren Buffett · Robert Kiyosaki · Elon Musk · Aliko Dangote</strong>
          <strong>Ray Dalio · Simon Sinek · Peter Thiel · Mohnish Pabrai</strong>
          <strong>Tony Robbins · Eric Ries · Jay Shetty · Lewis Howes · Bill Gates</strong>
        </div>

        <p className="lead-paragraph" style={{ marginTop: '24px' }}>
          Their interviews. Their TED Talks. Their books. Their failures. Their frameworks.
        </p>
        <p className="lead-paragraph">
          FoxRevo did not invent this knowledge. We built the bridge that brings it from Silicon Valley to Lagos. From Wall Street to Alaba Market. From Omaha to Onitsha.
        </p>
      </section>

      {/* AUTO-SCROLL STRIP (CHARCOAL BG, OFF-WHITE TEXT) */}
      <div className="social-proof-ticker source-ticker">
        <div className="ticker-track-new slower">
          {authoritySources.map((name, idx) => (
            <span key={idx} style={{ padding: '0 10px' }}>{name}</span>
          ))}
          <span style={{ fontWeight: '700', color: 'var(--accent)' }}>Built on the wisdom of the world's wealthiest people</span>
          {/* Duplicate */}
          {authoritySources.map((name, idx) => (
            <span key={`dup-${idx}`} style={{ padding: '0 10px' }}>{name}</span>
          ))}
          <span style={{ fontWeight: '700', color: 'var(--accent)' }}>Built on the wisdom of the world's wealthiest people</span>
        </div>
      </div>

      {/* FOUNDER QUOTE SECTION */}
      <section className="section-block" style={{ padding: '40px 0' }}>
        <div className="founder-quote-box">
          <blockquote>
            "I see myself standing with Google and Apple, and the world asking: did this really come from Africa? That is what the revolution did, I will say."
          </blockquote>
          <cite>Benedict A. — Founder, FoxRevo</cite>
        </div>
      </section>

      {/* QUOTE SCROLL — AUTO-HORIZONTAL */}
      <div className="quotes-scroll-ticker">
        <div className="ticker-track-new slower">
          {quotesList.map((q, idx) => (
            <span key={idx} className="ticker-quote">
              "{q.text}" <strong>— {q.author}</strong>
            </span>
          ))}
          {/* Duplicate */}
          {quotesList.map((q, idx) => (
            <span key={`dup-${idx}`} className="ticker-quote">
              "{q.text}" <strong>— {q.author}</strong>
            </span>
          ))}
        </div>
      </div>

      {/* SECTION 4 — WHAT MEMBERS SAY (DESIRE) */}
      <section className="section-block padding-y" id="members-say">
        <h2>What Members Say</h2>
        
        {/* MEMBER VOICE SWIPER CAROUSEL */}
        <div className="member-voice-swiper glass-card">
          <div className="swiper-progress-bar"></div>
          <div className="swiper-content">
            <p className="voice-text">"{voiceQuotes[currentVoiceIndex]}"</p>
          </div>
          <div className="swiper-controls">
            {voiceQuotes.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setCurrentVoiceIndex(idx)} 
                className={`swiper-dot ${currentVoiceIndex === idx ? 'active' : ''}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* NOTICE TO CURRENT MEMBERS */}
        <div className="member-notice-box" style={{ marginTop: '48px' }}>
          <h4>NOTICE TO CURRENT MEMBERS</h4>
          <p>
            All accepted members who completed their first lecture last month will be contacted by the FoxRevo team with your personal assessment analysis. Certificates of completion are in progress for members who have reached the final stage.
          </p>
        </div>
      </section>

      {/* SECTION 5 — HOW TO REGISTER (ACTION) */}
      <section className="section-block padding-y" id="how-to-register">
        <h2>The Platform Entry Gate</h2>
        <p className="lead-paragraph">
          FoxRevo OS enforces profile alignment checks. The dashboard workspace is locked until candidates satisfy deprogramming alignment criteria.
        </p>
        
        <p style={{ fontWeight: '700', color: 'var(--text-primary)', marginTop: '24px' }}>Here is how it works:</p>
        <ol className="register-steps">
          <li>Read the platform documentation article we provide.</li>
          <li>Complete the automated Readiness Audit.</li>
          <li>The verification engine analyzes your alignment scores.</li>
          <li>If approved, your credentials activate, granting full database access.</li>
        </ol>
        <p className="text-secondary" style={{ fontSize: '14px', fontStyle: 'italic', marginTop: '12px' }}>
          Candidates are permitted two attempts at the alignment audit. Treat the first one seriously.
        </p>

        <div className="button-group-desktop mt-4">
          <a href="#register" onClick={handleScrollToRegister} className="btn-submit-cta neon-btn" style={{ textDecoration: 'none' }}>
            <span>Initialize FoxRevo OS →</span>
          </a>
          <Link href="/contact" className="desktop-btn-secondary" style={{ border: '1px solid var(--border-medium)', borderRadius: '8px', padding: '12px 24px' }}>
            I Have Questions First →
          </Link>
        </div>
      </section>

      {/* SECTION 6 — TERMS (ACTION) */}
      <section className="section-block register-wrapper" id="register">
        <h2>Five Terms. Read All of Them.</h2>
        
        <div className="fee-increase-banner">
          ⚠️ Profile activation fee increases to ₦5,000 after 1,000 verified builders. The current rate is ₦3,000.
        </div>

        <ul className="terms-list" style={{ marginTop: '24px' }}>
          <li>Registration fee is <strong>₦3,000</strong>. Bank charges may apply by location.</li>
          <li><strong>No refunds.</strong> Commit before you pay.</li>
          <li>Mindset alignment audit is <strong>mandatory</strong>.</li>
          <li>You have <strong>two attempts</strong> at the audit.</li>
          <li><strong>No cheating.</strong> Anyone found compromising the audit is permanently disqualified.</li>
        </ul>

        <p style={{ margin: '24px 0', fontStyle: 'italic', fontWeight: '600', color: 'var(--text-primary)' }}>
          If your response to all five is "that is fair," you are ready.
        </p>

        {/* INLINE REGISTRATION FORM CARD */}
        <div className="registration-card-inline glass-card">
          <div className="form-card-header">
            <h3>Start Your Journey</h3>
            <p>Fill in your credentials to create your student account. Secure your spot at the current ₦3,000 rate.</p>
          </div>

          {regError && (
            <div className="form-alert error">
              <AlertCircle size={16} style={{ marginRight: '6px', flexShrink: 0 }} />
              <span>{regError}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="landing-form">
            <div className="form-input-group">
              <label htmlFor="fullName">Full Legal Name</label>
              <input
                type="text"
                id="fullName"
                placeholder="e.g. John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                disabled={regLoading}
              />
            </div>

            <div className="form-input-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={regLoading}
              />
            </div>

            <div className="form-input-group">
              <label htmlFor="password">Password (Min. 6 characters)</label>
              <input
                type="password"
                id="password"
                placeholder="Choose a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                disabled={regLoading}
              />
            </div>

            <div className="form-checkbox-group" style={{ margin: '12px 0 20px 0' }}>
              <input
                type="checkbox"
                id="terms"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                required
                disabled={regLoading}
              />
              <label htmlFor="terms">
                I agree to the five terms listed above, as well as the <Link href="/terms" target="_blank" className="form-link">Terms of Service</Link> & <Link href="/privacy" target="_blank" className="form-link">Privacy Policy</Link>
              </label>
            </div>

            <button type="submit" disabled={regLoading} className="btn-submit-cta w-full neon-btn" style={{ padding: '14px' }}>
              <span>Proceed to Payment (₦3,000) →</span>
            </button>
          </form>

          <div className="form-card-footer text-center">
            <p>Already registered? <Link href="/login" className="login-inline-link">Log in to dashboard</Link></p>
          </div>
        </div>

        <div className="button-group-desktop" style={{ justifyContent: 'center' }}>
          <Link href="/contact" className="desktop-btn-secondary" style={{ border: '1px solid var(--border-medium)', borderRadius: '8px', padding: '12px 24px' }}>
            Ask a Question →
          </Link>
        </div>
      </section>

      {/* SECTION 7 — FAQ (ACTION) */}
      <section className="faq-section padding-y" id="faq">
        <div className="section-header text-center">
          <h2 className="section-title">Frequently Asked Questions</h2>
        </div>

        <div className="faq-list">
          
          <div className={`faq-item ${openFaq === 0 ? 'active' : ''}`}>
            <button className="faq-question" onClick={() => toggleFaq(0)} type="button">
              <span>Is this relevant if I already have a business?</span>
              <span className="faq-toggle-icon">{openFaq === 0 ? '－' : '＋'}</span>
            </button>
            <div className="faq-answer">
              <p>
                A: Especially. Having a business without the wealth framework is like having a car with no destination. FoxRevo gives you the map for what your business becomes next.
              </p>
            </div>
          </div>

          <div className={`faq-item ${openFaq === 1 ? 'active' : ''}`}>
            <button className="faq-question" onClick={() => toggleFaq(1)} type="button">
              <span>Is this just motivation that fades in a week?</span>
              <span className="faq-toggle-icon">{openFaq === 1 ? '－' : '＋'}</span>
            </button>
            <div className="faq-answer">
              <p>
                A: No. Every module ends with a FoxRevo Checkpoint, a specific, actionable exercise. Motivation fades. Architecture lasts. FoxRevo builds architecture.
              </p>
            </div>
          </div>

          <div className={`faq-item ${openFaq === 2 ? 'active' : ''}`}>
            <button className="faq-question" onClick={() => toggleFaq(2)} type="button">
              <span>Why is there an alignment audit?</span>
              <span className="faq-toggle-icon">{openFaq === 2 ? '－' : '＋'}</span>
            </button>
            <div className="faq-answer">
              <p>
                A: Because who you learn alongside matters. The audit confirms you are ready to receive what is inside, not to reject you. Prepare and you will be fine.
              </p>
            </div>
          </div>

          <div className={`faq-item ${openFaq === 3 ? 'active' : ''}`}>
            <button className="faq-question" onClick={() => toggleFaq(3)} type="button">
              <span>Why no refund?</span>
              <span className="faq-toggle-icon">{openFaq === 3 ? '－' : '＋'}</span>
            </button>
            <div className="faq-answer">
              <p>
                A: Because the moment you pay, the commitment is fulfilled on our end. The no-refund policy is also a feature: every person inside chose to be there. That makes the environment different.
              </p>
            </div>
          </div>

          <div className={`faq-item ${openFaq === 4 ? 'active' : ''}`}>
            <button className="faq-question" onClick={() => toggleFaq(4)} type="button">
              <span>I am a student and ₦3,000 is a stretch. Should I still apply?</span>
              <span className="faq-toggle-icon">{openFaq === 4 ? '－' : '＋'}</span>
            </button>
            <div className="faq-answer">
              <p>
                A: Set a date by which you will have it. Apply then. Do not let the fee stop you. Let it motivate you.
              </p>
            </div>
          </div>

          <div className={`faq-item ${openFaq === 5 ? 'active' : ''}`}>
            <button className="faq-question" onClick={() => toggleFaq(5)} type="button">
              <span>What happens after I complete the training?</span>
              <span className="faq-toggle-icon">{openFaq === 5 ? '－' : '＋'}</span>
            </button>
            <div className="faq-answer">
              <p>
                A: You receive a FoxRevo Certificate of Completion. You retain lifetime access to the vault. You remain in the community. And you begin applying what you know. The principles compound the more you use them.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 8 — THE CLOSE (ACTION) */}
      <section className="section-block padding-y text-center" id="final-close">
        <h2>Africa Will Produce the Next Generation of Global Builders.</h2>
        
        <p className="lead-paragraph">
          The only question is whether you will be one of them.
        </p>
        <p className="lead-paragraph">
          FoxRevo is not asking you to believe in us. We are asking you to believe in the evidence. Sixty years of Warren Buffett compounding. Dangote building an empire in one of the world's hardest business environments. Musk turning first principles into rockets. Every Nigerian who ever built something real and said: I wish someone had told me this earlier.
        </p>
        <p className="lead-paragraph" style={{ fontWeight: '700', color: 'var(--accent)' }}>
          Someone is telling you now.
        </p>

        <div style={{ marginTop: '40px' }}>
          <a href="#register" onClick={handleScrollToRegister} className="btn-cta-scroll full-mobile neon-btn" style={{ padding: '16px 36px', fontSize: '17px' }}>
            <span>Initialize FoxRevo OS (₦3,000) →</span>
          </a>
          <p className="hero-cta-subtext" style={{ maxWidth: '640px', margin: '12px auto 0' }}>
            ₦3,000 | Two Audit Attempts | Certificate on Completion<br />
            Fee increases to ₦5,000 after 1,000 finalists are confirmed.
          </p>
        </div>

        {/* SHARING SECTION */}
        <div className="sharing-section">
          <p className="sharing-label">"Send this to 10 people. Not to help FoxRevo. To help them."</p>
          <div className="sharing-icons">
            <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp"><Send size={24} /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn"><Linkedin size={24} /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Share on Instagram"><Send size={24} /></a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook"><Facebook size={24} /></a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="Share on TikTok"><Send size={24} /></a>
          </div>
          <p className="sharing-text-body" style={{ marginTop: '20px', fontSize: '15px', color: 'var(--text-secondary)' }}>
            <strong>Do not just share a link. Share a door.</strong><br />
            Every person you send this to is not just one person. They are a family. They are a community. They are ten people who build differently because you cared enough to share.
          </p>
        </div>
      </section>

      {/* Sticky Bottom CTA */}
      <div className={`sticky-cta-bar ${showStickyCta ? 'visible' : ''}`}>
        <div className="sticky-cta-container">
          <div className="sticky-cta-left">
            <strong>FoxRevo OS Initializer</strong>
            <span>₦3,000 Profile Fee • Audit Included • No Refunds</span>
          </div>
          <div className="sticky-cta-right">
            <a href="#register" onClick={handleScrollToRegister} className="btn-sticky-cta neon-btn">
              Initialize OS (₦3,000) →
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
