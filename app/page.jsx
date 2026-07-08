"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '../utils/supabase/client';
import { AlertCircle, ArrowRight, Facebook, Linkedin, Send } from 'lucide-react';
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

  // FAQ state
  const [openFaq, setOpenFaq] = useState(null);
  
  // Voice swipe state
  const [currentVoiceIndex, setCurrentVoiceIndex] = useState(0);
  const [showStickyCta, setShowStickyCta] = useState(false);

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
        <p>Loading FOXREVO Ecosystem...</p>
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

      {/* HERO SECTION — ABOVE THE FOLD */}
      <header className="hero-section">
        <div className="hero-content-wide text-center">
          <h1 className="hero-headline-full">
            You Have the Skills.<br />
            You Still Do Not Have the Wealth.
          </h1>
          
          <p className="hero-lead-accent">
            That is not your fault. It is your curriculum.
          </p>
          
          <p className="hero-body-full">
            The system you were handed was never designed to make you wealthy. It was designed to make you useful to someone else's wealth. FoxRevo exists to replace that system with the one that actually works.
          </p>
          <p className="hero-body-full">
            Built on the documented wisdom of Warren Buffett, Elon Musk, Aliko Dangote, Robert Kiyosaki, Ray Dalio, Peter Thiel, and twelve other architects of the world's greatest wealth.
          </p>
          <p className="hero-body-full">
            Translated for the Nigerian and African builder. Applied to your reality. Starting now.
          </p>

          <div style={{ marginTop: '40px' }}>
            <a href="#register" onClick={handleScrollToRegister} className="btn-cta-scroll full-mobile">
              <span>I Want In — Begin My Application →</span>
            </a>
            <p className="hero-cta-subtext">
              ₦3,000 | Entrance Exam | Two Attempts | Certificate on Completion
            </p>
            <p className="hero-warning-text">
              ⚠️ Fee increases to ₦5,000 after our first 1,000 finalists are confirmed.
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

      {/* SECTION 1 — THE PAIN */}
      <section className="section-block padding-y" id="pain">
        <h2>You Are Tired. And You Should Be.</h2>
        <p className="lead-paragraph">
          You freelance. You build. You send proposals. You take global clients. You develop skills that should be paying you serious money.
        </p>
        <p className="lead-paragraph">
          And the income still does not match the effort.
        </p>
        <p className="lead-paragraph">
          Because effort without the right framework is just expensive practice.
        </p>
        <p className="lead-paragraph">
          FoxRevo teaches the framework. The one the world's wealthiest people used to stop trading time for money and start building systems that compound. The one no Nigerian school, no LinkedIn course, no YouTube channel ever gave you completely.
        </p>
        <p className="pain-highlight-text">
          <strong>You are not behind. You were just handed the wrong map.</strong>
        </p>

        <div className="button-group-desktop mt-4">
          <a href="#register" onClick={handleScrollToRegister} className="btn-submit-cta" style={{ textDecoration: 'none' }}>
            <span>Join the Revolution →</span>
          </a>
          <Link href="/about" className="desktop-btn-secondary" style={{ border: '1px solid var(--border-medium)', borderRadius: '8px', padding: '12px 24px' }}>
            Read Our Mission →
          </Link>
        </div>
      </section>

      {/* SECTION 2 — WHAT CHANGES */}
      <section className="section-block padding-y" id="what-changes">
        <h2>After FoxRevo, You Will Know:</h2>
        
        <div className="benefits-stack">
          
          <div className="benefit-card-full">
            <h3>Why your money keeps disappearing</h3>
            <p>and exactly what to do instead of saving it in an account that inflation quietly destroys.</p>
          </div>

          <div className="benefit-card-full">
            <h3>How to find business opportunities no one else is seeing</h3>
            <p>using the same first-principles thinking Elon Musk used to build Tesla and SpaceX from ideas everyone called impossible.</p>
          </div>

          <div className="benefit-card-full">
            <h3>How to start and validate a business without capital</h3>
            <p>the same method Eric Ries documented, Mohnish Pabrai proved, and FoxRevo translates into the Nigerian market.</p>
          </div>

          <div className="benefit-card-full">
            <h3>Why wealthy people use debt and you were told to fear it</h3>
            <p>and how Aliko Dangote used this exact knowledge to build the largest industrial empire in African history.</p>
          </div>

          <div className="benefit-card-full">
            <h3>How to build a business that grows while you sleep</h3>
            <p>not a hustle. A system. With a moat. With compounding income. With the architecture of something that lasts.</p>
          </div>

          <div className="benefit-card-full">
            <h3>How to stop being impressed by fake wealth</h3>
            <p>and start building the kind that does not need an audience to confirm it is real.</p>
          </div>

        </div>
      </section>

      {/* SECTION 3 — THE AUTHORITY */}
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

      {/* SECTION 4 — WHAT MEMBERS SAY */}
      <section className="section-block padding-y" id="members-say">
        <h2>What Members Say</h2>
        
        {/* MEMBER VOICE SWIPER CAROUSEL */}
        <div className="member-voice-swiper">
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

      {/* SECTION 5 — HOW TO REGISTER */}
      <section className="section-block padding-y" id="how-to-register">
        <h2>The Revolution Is Not for Everyone.<br />Which Is Exactly Why You Want In.</h2>
        <p className="lead-paragraph">
          FoxRevo has standards. Because the transformation inside is too serious to be wasted on someone who is not ready.
        </p>
        
        <p style={{ fontWeight: '700', color: 'var(--text-primary)', marginTop: '24px' }}>Here is how it works:</p>
        <ol className="register-steps">
          <li>Read the entry article we give you</li>
          <li>Take the entrance examination</li>
          <li>The FoxRevo review team assesses your submission</li>
          <li>If accepted, you gain full access to the training, the knowledge vault, and the community</li>
        </ol>
        <p className="text-secondary" style={{ fontSize: '14px', fontStyle: 'italic', marginTop: '12px' }}>
          Two attempts at the exam. Use the first one seriously.
        </p>

        <div className="button-group-desktop mt-4">
          <a href="#register" onClick={handleScrollToRegister} className="btn-submit-cta" style={{ textDecoration: 'none' }}>
            <span>Begin My Application →</span>
          </a>
          <Link href="/contact" className="desktop-btn-secondary" style={{ border: '1px solid var(--border-medium)', borderRadius: '8px', padding: '12px 24px' }}>
            I Have Questions First →
          </Link>
        </div>
      </section>

      {/* SECTION 6 — TERMS */}
      <section className="section-block register-wrapper" id="register">
        <h2>Five Terms. Read All of Them.</h2>
        
        <div className="fee-increase-banner">
          ⚠️ Fee increases to ₦5,000 after the first 1,000 finalists are confirmed. The current rate is ₦3,000.
        </div>

        <ul className="terms-list" style={{ marginTop: '24px' }}>
          <li>Registration fee is <strong>₦3,000</strong>. Bank charges may apply by location.</li>
          <li><strong>No refunds.</strong> Commit before you pay.</li>
          <li>Entrance examination is <strong>mandatory</strong>.</li>
          <li>You have <strong>two attempts</strong> at the exam.</li>
          <li><strong>No cheating.</strong> Anyone found compromising the exam is permanently disqualified.</li>
        </ul>

        <p style={{ margin: '24px 0', fontStyle: 'italic', fontWeight: '600', color: 'var(--text-primary)' }}>
          If your response to all five is "that is fair," you are ready.
        </p>

        {/* INLINE REGISTRATION FORM CARD */}
        <div className="registration-card-inline">
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

            <button type="submit" disabled={regLoading} className="btn-submit-cta w-full" style={{ padding: '14px' }}>
              <span>Proceed to Payment →</span>
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

      {/* SECTION 7 — FAQ */}
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
              <span>Why is there an entrance exam?</span>
              <span className="faq-toggle-icon">{openFaq === 2 ? '－' : '＋'}</span>
            </button>
            <div className="faq-answer">
              <p>
                A: Because who you learn alongside matters. The exam confirms you are ready to receive what is inside, not to reject you. Prepare and you will be fine.
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

      {/* SECTION 8 — THE CLOSE */}
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
          <a href="#register" onClick={handleScrollToRegister} className="btn-cta-scroll full-mobile" style={{ padding: '16px 36px', fontSize: '17px' }}>
            <span>Begin My Application →</span>
          </a>
          <p className="hero-cta-subtext" style={{ maxWidth: '640px', margin: '12px auto 0' }}>
            ₦3,000 | Two Exam Attempts | Certificate on Completion<br />
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
            <strong>The Wealth Revolution is Open.</strong>
            <span>₦3,000 One-Time Fee • Exam Included • No Refunds</span>
          </div>
          <div className="sticky-cta-right">
            <a href="#register" onClick={handleScrollToRegister} className="btn-sticky-cta">
              Begin Your Application →
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
