"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '../utils/supabase/client';
import { ShieldCheck, Lock, Users, Mail, AlertCircle, ArrowRight, CheckCircle2, TrendingUp, DollarSign, BookOpen, Facebook, Linkedin, Send } from 'lucide-react';
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

  // Sticky CTA state
  const [showStickyCta, setShowStickyCta] = useState(false);

  const voiceQuotes = [
    { text: "I would not mind paying more for this. It is worth it.", author: "Member Voice" },
    { text: "I have always known there is a system sold to Africans that is not built for us. That is why we are still where we are. FoxRevo is the first thing that actually addressed it.", author: "Member Voice" },
    { text: "Sharing this with every member of my family is important to me. I would not want them to miss out on this.", author: "Member Voice" },
    { text: "I have paid for courses before. None of them told me the truth the way FoxRevo does. In the first module alone, I saw three things I had been doing completely wrong for years.", author: "Member Voice" },
    { text: "I am a developer. I build things for clients all day. FoxRevo was the first time someone told me how to make my skills compound instead of just trading them for hours.", author: "Member Voice" },
    { text: "I thought I was ahead because I had international clients. FoxRevo showed me I was still thinking small. That was uncomfortable. And it changed everything.", author: "Member Voice" },
    { text: "The entrance exam made me take this seriously from day one. By the time I got inside, I was already in a different headspace.", author: "Member Voice" },
    { text: "I came in thinking I wanted to start a business. I left knowing I was building a legacy. That distinction matters more than I can explain.", author: "Member Voice" }
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
            You Have Been Working Hard.<br />
            But Nobody Taught You How to Build Wealth.
          </h1>
          
          <p className="hero-body-full">
            Every morning you wake up and push. You freelance. You hustle. You send proposals. You take global clients. You build websites for other people's businesses while yours stays stuck in your head. You have spent years developing skills that should be making you rich, and you are still wondering why the income does not match the effort.
          </p>
          <p className="hero-body-full">
            The problem is not your skill. The problem is that nobody ever taught you the system that converts effort into lasting, compounding, generational wealth. That is the only thing standing between you and the income you know you deserve.
          </p>

          <div style={{ marginTop: '40px' }}>
            <a href="#register" onClick={handleScrollToRegister} className="btn-cta-scroll full-mobile">
              <span>I Want to Learn the Wealth System →</span>
            </a>
            <p className="hero-cta-subtext">
              Application + Entrance Exam | ₦3,000 one-time | No refunds | Two attempts
            </p>
          </div>
        </div>
      </header>

      {/* SOCIAL PROOF TICKER */}
      <div className="social-proof-ticker">
        <div className="ticker-track-new">
          <span>Projected by 2035: <strong>500+</strong> African Billionaires Produced</span>
          <span><strong>10,000+</strong> African Millionaires Produced</span>
          <span><strong>1,000+</strong> Tech Companies Founded by Africans</span>
          <span><strong>500+</strong> Globally Recognised Companies from Africa</span>
          <span><strong>10,000+</strong> World-Competing Entrepreneurs</span>
          <span>Visionary Leaders Across <strong>20+</strong> African Nations</span>
          {/* Duplicate for infinite effect */}
          <span>Projected by 2035: <strong>500+</strong> African Billionaires Produced</span>
          <span><strong>10,000+</strong> African Millionaires Produced</span>
          <span><strong>1,000+</strong> Tech Companies Founded by Africans</span>
          <span><strong>500+</strong> Globally Recognised Companies from Africa</span>
          <span><strong>10,000+</strong> World-Competing Entrepreneurs</span>
          <span>Visionary Leaders Across <strong>20+</strong> African Nations</span>
        </div>
      </div>

      {/* SECTION 1 — WHY ARE YOU HERE */}
      <section className="section-block padding-y" id="why-are-you-here">
        <h2>Why Are You Here?</h2>
        <p className="lead-paragraph">
          We do not answer that for you. That is your first assignment. But if you are honest with yourself, you already know.
        </p>
        <p style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '18px', marginTop: '24px' }}>
          You are here because you are tired.
        </p>
        <ul className="tired-list">
          <li>Tired of being skilled but not paid what your skills are worth.</li>
          <li>Tired of building other people's businesses while yours never leaves your notes app.</li>
          <li>Tired of watching people with less knowledge than you drive past in cars you cannot yet afford.</li>
          <li>Tired of saving money that inflation quietly destroys before you can use it.</li>
          <li>Tired of searching for the "secret" on YouTube and getting nothing that actually changes your account balance.</li>
        </ul>

        <p style={{ marginTop: '24px' }}>
          Or maybe you are here because you have already started. You have a business, or the beginning of one. You have global clients, freelance income, a digital product. And you still feel like you are one bad month away from starting all over.
        </p>
        <p>
          Either way, you are in the right place.
        </p>
        <p>
          FoxRevo was built for exactly this moment. Not to teach you how to hustle harder. To teach you how the wealthiest people in the world think, decide, and build. And to translate that knowledge into something that actually works in the Nigerian and African context you are operating in.
        </p>
        <p className="mission-accent-box">
          <strong>FoxRevo Mission:</strong> To produce the founders of Africa's next Google, Amazon, and Apple. Not someday. In the next thirty years. Starting with the people who are reading this right now.
        </p>

        <div className="button-group-desktop mt-4">
          <a href="#register" onClick={handleScrollToRegister} className="btn-submit-cta" style={{ textDecoration: 'none' }}>
            <span>Join the Revolution →</span>
          </a>
          <Link href="/about" className="desktop-btn-secondary" style={{ border: '1px solid var(--border-medium)', borderRadius: '8px', padding: '12px 24px' }}>
            Read Our Full Mission →
          </Link>
        </div>
      </section>

      {/* SECTION 2 — BENEFITS (NOT FEATURES) */}
      <section className="section-block padding-y" id="benefits">
        <h2>What Changes When You Complete FoxRevo</h2>
        <p className="section-subtitle">Not what you will study. What will change. Because that is what you actually came for.</p>

        <div className="benefits-stack">
          
          <div className="benefit-card-full">
            <span className="benefit-index">BENEFIT 1</span>
            <h3>You Will Finally Understand Why Your Money Keeps Disappearing</h3>
            <p>
              Most Nigerians earn and spend. Earn and spend. The cycle continues for decades because nobody ever explained the difference between income and wealth, between a liability and an asset, between money that works for you and money that works against you.
            </p>
            <p>
              After FoxRevo, you will know exactly where your money should go. You will understand why saving in a naira account is losing money. You will understand what an asset column is and how to start building one. You will understand, for the first time, why some people seem to get richer as the economy gets harder.
            </p>
            <p className="benefit-footer">That knowledge is the single most valuable thing you can own in Nigeria right now.</p>
          </div>

          <div className="benefit-card-full">
            <span className="benefit-index">BENEFIT 2</span>
            <h3>You Will Stop Chasing Opportunities and Start Recognising Them</h3>
            <p>
              The wealthiest builders in history were not the ones with the best ideas. They were the ones who knew how to identify a real problem, validate a real solution, and move before the market caught up. Elon Musk used this. Jeff Bezos used this. Aliko Dangote used this.
            </p>
            <p>
              FoxRevo extracts the exact thinking frameworks these people used and teaches you to apply them to real Nigerian and African market opportunities. Not theoretical case studies. Actual, applicable mental models for finding where money is hiding in plain sight.
            </p>
            <p className="benefit-footer">You will leave FoxRevo seeing problems everywhere. And you will know that problems are money.</p>
          </div>

          <div className="benefit-card-full">
            <span className="benefit-index">BENEFIT 3</span>
            <h3>You Will Build the Discipline That Your Income Requires</h3>
            <p>
              The uncomfortable truth that most courses will not tell you: your income is currently a reflection of your discipline level. Not your talent. Not your connections. Not your country. Your discipline.
            </p>
            <p>
              FoxRevo teaches the daily architecture of the world's most successful builders. Not motivation. Not affirmations. The specific, repeatable daily systems that Warren Buffett, Aliko Dangote, and Ray Dalio all share, and that produced the results the world now calls extraordinary.
            </p>
            <p className="benefit-footer">Six months from completing FoxRevo, the version of you that shows up every morning will be unrecognisable to the version that started.</p>
          </div>

          <div className="benefit-card-full">
            <span className="benefit-index">BENEFIT 4</span>
            <h3>You Will Know How to Start, Build, and Scale — With or Without Capital</h3>
            <p>
              You do not need funding to start. You need frameworks. FoxRevo teaches the exact methods that the world's smartest entrepreneurs used to validate ideas without spending money, get customers to fund their product before it was built, and build businesses that grow while they sleep.
            </p>
            <p>
              Mohnish Pabrai built his first business from 100,000 US dollars borrowed from investors and returned 1,000% in ten years. Eric Ries built the Lean Startup methodology that has helped thousands of founders build with zero waste. Peter Thiel built PayPal from the contrarian belief that everyone else was thinking wrong about money.
            </p>
            <p className="benefit-footer">All of it is in FoxRevo. All of it is translated for the African entrepreneur.</p>
          </div>

          <div className="benefit-card-full">
            <span className="benefit-index">BENEFIT 5</span>
            <h3>You Will Stop Being Impressed by Fake Wealth and Start Building Real Wealth</h3>
            <p>
              The noise that is keeping Nigerians poor is not poverty. It is the performance of wealth. The rented cars. The hotel lobby photos. The fake flexing that makes you feel behind when you are actually ahead of everyone performing and ahead of where you would be if you kept following them.
            </p>
            <p>
              FoxRevo rewires the part of your brain that confuses visibility with value. By the end of your first module, you will be looking at flashy lifestyles with something closer to pity than envy. Not because you are better than them. Because you now understand what they are sacrificing and what it will cost them.
            </p>
            <p className="benefit-footer">That shift alone is worth more than any course fee.</p>
          </div>

          <div className="benefit-card-full">
            <span className="benefit-index">BENEFIT 6</span>
            <h3>You Will Join a Network of African Builders Who Are Playing the Long Game</h3>
            <p>
              The most expensive thing about being in the wrong environment is what it costs you in ambition. When everyone around you is optimising for looking successful, you subconsciously start doing the same.
            </p>
            <p>
              FoxRevo members are different. They are the people who read this page and felt something unlock instead of something rebel. They are in your corner. They are comparing notes on real businesses, real frameworks, real progress. They are the environment upgrade that most people pay a decade of bad decisions to find.
            </p>
            <p className="benefit-footer">Your network is your net worth. FoxRevo is where your network begins.</p>
          </div>

        </div>
      </section>

      {/* SECTION 3 — CREDIBILITY AND SOURCE AUTHORITY */}
      <section className="section-block padding-y" id="authority">
        <h2>This Is Not Someone's Opinion. This Is Decades of Documented Proof.</h2>
        <p className="lead-paragraph">
          FoxRevo did not invent any of the principles you are about to receive. We extracted them. From the real, documented lives, real interviews, real failures, and real victories of the people who built the world's most valuable companies.
        </p>

        <p style={{ fontWeight: '600', color: 'var(--text-primary)', marginTop: '24px' }}>
          The knowledge inside FoxRevo was sourced directly from:
        </p>

        <ul className="source-list">
          <li><strong>Warren Buffett</strong> — on discipline, long-term thinking, and the science of investing.</li>
          <li><strong>Robert Kiyosaki</strong> — on why the school system keeps people poor, and how the wealthy actually use debt and assets.</li>
          <li><strong>Elon Musk</strong> — on first principles thinking, building through impossibility, and the physics of ambition.</li>
          <li><strong>Aliko Dangote</strong> — on industrial discipline, backward integration, and why Africa must build what it consumes.</li>
          <li><strong>Ray Dalio</strong> — on radical transparency, idea meritocracy, and building an organisation that survives its founder.</li>
          <li><strong>Simon Sinek</strong> — on purpose-led leadership and why people follow those who start with Why.</li>
          <li><strong>Peter Thiel</strong> — on monopoly thinking, secrets, and going from zero to one.</li>
          <li><strong>Mohnish Pabrai</strong> — on risk reduction, the mathematics of persistence, and the ethics of a giver mindset.</li>
          <li><strong>Tony Robbins</strong> — on the psychology of state, story, and strategy that produce breakthroughs.</li>
          <li><strong>Eric Ries</strong> — on lean entrepreneurship, validated learning, and building without waste.</li>
          <li><strong>Lewis Howes and Jay Shetty</strong> — on the money wounds that keep intelligent people financially stuck.</li>
          <li><strong>Bill Gates</strong> — on intellectual curiosity, compound learning, and global stewardship.</li>
        </ul>

        <p style={{ marginTop: '32px' }}>
          These are not motivational quotes from an Instagram page. These are frameworks extracted from documented interviews, TED Talks, books, and recorded conversations. Everything in FoxRevo is attributed, cited, and traceable to its origin.
        </p>
        <p>
          FoxRevo's contribution is the bridge: from their world to yours. From Silicon Valley to Lagos. From Wall Street to Alaba Market. From Omaha to Onitsha.
        </p>

        {/* FOUNDER QUOTE — SECTION 3 */}
        <div className="founder-quote-box">
          <blockquote>
            "I see myself standing with Google and Apple, and the world asking: did this really come from Africa? A transformation they never imagined Africans to be capable of. That is what the revolution did, I will say."
          </blockquote>
          <cite>Benedict A. | Founder, FoxRevo</cite>
        </div>
      </section>

      {/* QUOTES SCROLL — AUTO-HORIZONTAL */}
      <div className="quotes-scroll-ticker">
        <div className="ticker-track-new slower">
          {quotesList.map((q, idx) => (
            <span key={idx} className="ticker-quote">
              "{q.text}" <strong>— {q.author}</strong>
            </span>
          ))}
          {/* Duplicate for infinite effect */}
          {quotesList.map((q, idx) => (
            <span key={`dup-${idx}`} className="ticker-quote">
              "{q.text}" <strong>— {q.author}</strong>
            </span>
          ))}
        </div>
      </div>

      {/* SECTION 4 — RESULTS AND WHAT FOXREVO HAS DONE */}
      <section className="section-block padding-y" id="results">
        <h2>What We Have Done Is What We Will Do For You</h2>
        <p>
          Every member who has gone through FoxRevo's first module describes the same experience: something shifts. The way they see money. The way they see opportunity. The way they see time. The way they see themselves.
        </p>
        <p>
          That is not an accident. It is architecture.
        </p>
        <p>
          FoxRevo is built on the belief that the average Nigerian is not poor because of lack of intelligence or lack of effort. They are poor because they were handed a playbook that was never designed to make them wealthy. FoxRevo removes that playbook and replaces it with the one that actually works.
        </p>

        {/* MEMBER NOTICE */}
        <div className="member-notice-box">
          <h4>NOTICE TO ALL MEMBERS</h4>
          <p>
            All accepted members who completed their first lecture last month will be contacted by the FoxRevo team with your personal assessment analysis. We are also working towards issuing certificates of completion for members who have reached the final stage. The revolution honours its commitments.
          </p>
        </div>

        <p style={{ marginTop: '24px' }}>
          We stand on our mission to change the world by building what and who Africa will become. Not with words. With curriculum. With standards. With the refusal to accept that Africa cannot produce the next generation of globally competitive builders.
        </p>

        <div className="button-group-desktop mt-4">
          <a href="#register" onClick={handleScrollToRegister} className="btn-submit-cta" style={{ textDecoration: 'none' }}>
            <span>Be Part of This Revolution →</span>
          </a>
          <Link href="/about" className="desktop-btn-secondary" style={{ border: '1px solid var(--border-medium)', borderRadius: '8px', padding: '12px 24px' }}>
            Read Our Full Mission →
          </Link>
        </div>
      </section>

      {/* SECTION 5 — HOW TO REGISTER */}
      <section className="section-block padding-y" id="how-to-register">
        <h2>How to Register</h2>
        <p className="lead-paragraph text-center">FoxRevo is not for everybody.</p>
        <p>
          We are building billionaires, not filling seats. Every person who enters this revolution goes through a selection process, because the transformation inside is too serious to be wasted on someone who is not ready to receive it.
        </p>
        <p style={{ fontWeight: '600', margin: '20px 0 10px 0' }}>Here is how it works:</p>
        <ol className="register-steps">
          <li>Read the article we give you. It will give you a clear picture of what FoxRevo is building and what kind of person belongs here.</li>
          <li>Take the entrance examination. Not to trick you. To confirm that you have the mindset that this training is designed to develop. If you are ready, you will know it.</li>
          <li>The FoxRevo review team assesses your submission and determines your next step.</li>
          <li>If accepted, you gain access to the full training, the FoxRevo community, and the knowledge vault.</li>
        </ol>
        <p className="text-secondary" style={{ fontSize: '14px', fontStyle: 'italic', marginTop: '12px' }}>
          The entrance exam has two attempts. Use the first one seriously.
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

      {/* SECTION 6 — TERMS BEFORE APPLYING (The Register Block) */}
      <section className="section-block register-wrapper" id="register">
        <h2>Before You Apply, Know What You Are Agreeing To</h2>
        <p className="lead-paragraph">
          FoxRevo does not hide its terms in small print. We say them clearly. If you cannot agree to all five, do not apply. If you can, you are already thinking like someone who belongs here.
        </p>

        {/* NOTICE — FEE INCREASE */}
        <div className="fee-increase-banner">
          <strong>NOTICE:</strong> The registration fee will increase to ₦5,000 once we confirm our first 1,000 finalists for 2026. The current ₦3,000 fee is available now, while it lasts.
        </div>

        <p style={{ fontWeight: '700', color: 'var(--text-primary)', marginTop: '24px' }}>The five terms:</p>
        <ul className="terms-list">
          <li><strong>Registration fee is ₦3,000.</strong> Bank charges may apply depending on your location. This is a one-time payment.</li>
          <li><strong>No refunds.</strong> The knowledge you are paying for will not be returned to our heads. We ask that you honour what you are committing to before you pay.</li>
          <li><strong>You will be required to take and pass an entrance examination.</strong> This is not optional. It is the gate that ensures you and the people learning alongside you are operating at the same standard.</li>
          <li><strong>You have two attempts at the exam.</strong> One of them should be enough if you are ready.</li>
          <li><strong>No cheating.</strong> The revolution is built on integrity. Anyone found compromising the examination process will be disqualified permanently, with no refund.</li>
        </ul>

        <p style={{ margin: '24px 0', fontStyle: 'italic', fontWeight: '500' }}>
          If you have read all five and your response is "that is fair," you are ready to proceed.
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
              <span>Proceed to Payment (₦3,000)</span>
              <ArrowRight size={18} style={{ marginLeft: '8px' }} />
            </button>
          </form>

          <div className="form-card-footer text-center">
            <p>Already registered? <Link href="/login" className="login-inline-link">Log in to dashboard</Link></p>
          </div>
        </div>

        {/* MEMBER VOICE SWIPE CAROUSEL */}
        <div className="member-voice-swiper">
          <div className="swiper-progress-bar"></div>
          <div className="swiper-content">
            <p className="voice-text">"{voiceQuotes[currentVoiceIndex].text}"</p>
            <p className="voice-author">— {voiceQuotes[currentVoiceIndex].author}</p>
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
      </section>

      {/* SECTION 7 — FAQS */}
      <section className="faq-section padding-y" id="faq">
        <div className="section-header text-center">
          <h2 className="section-title">Questions People Ask Before They Apply</h2>
        </div>

        <div className="faq-list">
          
          <div className={`faq-item ${openFaq === 0 ? 'active' : ''}`}>
            <button className="faq-question" onClick={() => toggleFaq(0)} type="button">
              <span>FAQ 1: I already have a business and some income. Is FoxRevo still relevant to me?</span>
              <span className="faq-toggle-icon">{openFaq === 0 ? '－' : '＋'}</span>
            </button>
            <div className="faq-answer">
              <p>
                A: Especially relevant. Having a business without the wealth frameworks inside FoxRevo is like having a car without knowing where you are going. You are moving. But you are not compounding. FoxRevo teaches the architecture of businesses that grow while you sleep, attract the right customers automatically, and build genuine asset value over time. What you have built so far is the starting point. FoxRevo is the map for what comes next.
              </p>
            </div>
          </div>

          <div className={`faq-item ${openFaq === 1 ? 'active' : ''}`}>
            <button className="faq-question" onClick={() => toggleFaq(1)} type="button">
              <span>FAQ 2: Is this just another motivational course that makes me feel good for a week and then nothing changes?</span>
              <span className="faq-toggle-icon">{openFaq === 1 ? '－' : '＋'}</span>
            </button>
            <div className="faq-answer">
              <p>
                A: No. And we say that with the willingness to be tested on it. FoxRevo is built entirely on the documented, cited, real-world frameworks of people who built companies worth hundreds of billions of dollars. Every module contains a FoxRevo Checkpoint, a specific, actionable exercise that forces application, not just inspiration. Motivation fades. Architecture lasts. FoxRevo builds architecture.
              </p>
            </div>
          </div>

          <div className={`faq-item ${openFaq === 2 ? 'active' : ''}`}>
            <button className="faq-question" onClick={() => toggleFaq(2)} type="button">
              <span>FAQ 3: Why is there an entrance exam? What if I fail?</span>
              <span className="faq-toggle-icon">{openFaq === 2 ? '－' : '＋'}</span>
            </button>
            <div className="faq-answer">
              <p>
                A: The entrance exam exists because the quality of what you learn inside is directly affected by the quality of the people learning alongside you. FoxRevo is not a passive experience. It is a community of builders. The exam is a standard, not a punishment. It is designed to confirm that you are ready to receive what is inside, not to reject anyone who genuinely wants to build. You have two attempts. Prepare, and you will be fine.
              </p>
            </div>
          </div>

          <div className={`faq-item ${openFaq === 3 ? 'active' : ''}`}>
            <button className="faq-question" onClick={() => toggleFaq(3)} type="button">
              <span>FAQ 4: Why is there no refund?</span>
              <span className="faq-toggle-icon">{openFaq === 3 ? '－' : '＋'}</span>
            </button>
            <div className="faq-answer">
              <p>
                A: Because transformation is not a product you return. The entrance process, the exam, the access to the knowledge vault, and the FoxRevo community are deployed the moment you pay. We have fulfilled the commitment. What you do with it is now your responsibility. The no-refund policy is also a feature, not a punishment: it means every person inside chose to be there and is committed to being there. That commitment is part of what makes the environment powerful.
              </p>
            </div>
          </div>

          <div className={`faq-item ${openFaq === 4 ? 'active' : ''}`}>
            <button className="faq-question" onClick={() => toggleFaq(4)} type="button">
              <span>FAQ 5: I am a student and ₦3,000 is a lot. Should I still apply?</span>
              <span className="faq-toggle-icon">{openFaq === 4 ? '－' : '＋'}</span>
            </button>
            <div className="faq-answer">
              <p>
                A: Let us be direct with you: the ₦3,000 you are considering spending on FoxRevo will produce more value per naira than almost anything else you spend money on as a student. A plate of rice and chicken at the right restaurant costs close to that. What FoxRevo gives you in return for that amount is a framework for the next thirty years of your financial life, built from the real knowledge of the wealthiest people on earth. If ₦3,000 is a stretch for you right now, set a specific date by which you will have it, and apply then. Do not let the fee stop you. Let the fee motivate you.
              </p>
            </div>
          </div>

          <div className={`faq-item ${openFaq === 5 ? 'active' : ''}`}>
            <button className="faq-question" onClick={() => toggleFaq(5)} type="button">
              <span>FAQ 6: What happens after I complete the training?</span>
              <span className="faq-toggle-icon">{openFaq === 5 ? '－' : '＋'}</span>
            </button>
            <div className="faq-answer">
              <p>
                A: You receive a FoxRevo Certificate of Completion. You retain lifetime access to the knowledge vault. You remain part of the FoxRevo community. And you begin applying. The training does not end when the curriculum ends. It ends when you stop applying it. The builders who came before you have found that the principles compound. The more you use them, the more obvious the next level becomes. That is by design.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 8 — FINAL MISSION CLOSE AND CTA */}
      <section className="section-block padding-y text-center" id="final-close">
        <h2>The Revolution Is Open. <br />The Question Is Whether You Are.</h2>
        
        <p className="lead-paragraph">
          Africa will produce the next generation of globally recognised builders. That is not hope. That is demographics, economics, and the mathematical certainty of a continent with 60 percent of the world's uncultivated land, the largest critical mineral reserves on earth, and 1.6 billion working-age people by 2050.
        </p>
        <p className="lead-paragraph">
          The question is not whether Africa will rise. The question is whether you will be among the architects of that rise. Or whether you will still be watching from the audience, performing wealth while others are building it.
        </p>
        <p className="lead-paragraph">
          FoxRevo is not asking you to believe in us. We are asking you to believe in the evidence. The evidence of Warren Buffett's sixty years of compounding. The evidence of Aliko Dangote's industrial empire built in one of the world's most challenging business environments. The evidence of Elon Musk's decision to attempt the impossible and win. The evidence of every Nigerian who has ever built something real and said: I wish someone had told me this ten years ago.
        </p>
        <p className="lead-paragraph" style={{ fontWeight: '700', color: 'var(--accent)' }}>
          Someone is telling you now.
        </p>

        {/* SHARING SECTION */}
        <div className="sharing-section">
          <p className="sharing-label">Send this to 10 people. Not to help FoxRevo. To help them.</p>
          <div className="sharing-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook"><Facebook size={24} /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn"><Linkedin size={24} /></a>
            <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp"><Send size={24} /></a>
          </div>
        </div>

        <div style={{ marginTop: '48px' }}>
          <a href="#register" onClick={handleScrollToRegister} className="btn-cta-scroll full-mobile">
            <span>Begin Your Application Now →</span>
          </a>
          <p className="hero-cta-subtext" style={{ maxWidth: '640px', margin: '12px auto 0' }}>
            ₦3,000 | Entrance Exam | Two Attempts | No Refunds | Certificate on Completion. <br />
            Fee increases to ₦5,000 after the first 1,000 finalists are confirmed. Apply at the current rate.
          </p>
        </div>
      </section>

      {/* SOURCE AUTHORITY SCROLL */}
      <div className="social-proof-ticker source-ticker">
        <div className="ticker-track-new fast">
          <span>Built on the wisdom, knowledge, and insights of the world's most successful leaders and wealthiest people:</span>
          <span>Napoleon Hill</span>
          <span>Robert Kiyosaki</span>
          <span>Aliko Dangote</span>
          <span>Elon Musk</span>
          <span>Jeff Bezos</span>
          <span>Warren Buffett</span>
          <span>Bill Gates</span>
          <span>Ray Dalio</span>
          <span>Simon Sinek</span>
          <span>Peter Thiel</span>
          <span>Mohnish Pabrai</span>
          <span>Tony Robbins</span>
          <span>Lewis Howes</span>
          <span>Jay Shetty</span>
          <span>Eric Ries</span>
          <span>Walter Isaacson</span>
          <span>Charlie Munger</span>
          <span>Adam Grant</span>
          <span>Carol Dweck</span>
          <span>James Clear</span>
          {/* Duplicate */}
          <span>Built on the wisdom, knowledge, and insights of the world's most successful leaders and wealthiest people:</span>
          <span>Napoleon Hill</span>
          <span>Robert Kiyosaki</span>
          <span>Aliko Dangote</span>
          <span>Elon Musk</span>
          <span>Jeff Bezos</span>
          <span>Warren Buffett</span>
          <span>Bill Gates</span>
          <span>Ray Dalio</span>
          <span>Simon Sinek</span>
          <span>Peter Thiel</span>
          <span>Mohnish Pabrai</span>
          <span>Tony Robbins</span>
          <span>Lewis Howes</span>
          <span>Jay Shetty</span>
          <span>Eric Ries</span>
          <span>Walter Isaacson</span>
          <span>Charlie Munger</span>
          <span>Adam Grant</span>
          <span>Carol Dweck</span>
          <span>James Clear</span>
        </div>
      </div>

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
