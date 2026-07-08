"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '../utils/supabase/client';
import { ShieldCheck, Lock, Users, Mail, AlertCircle, ArrowRight, CheckCircle2, TrendingUp, DollarSign, BookOpen } from 'lucide-react';
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

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      setRegError('You must agree to the Terms of Service & Privacy Policy.');
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

  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    { q: "What exactly is FoxRevo?", a: "FoxRevo is an intensive training and system platform focused on practical skill monetization and client acquisition for freelancers, designers, copywriters, developers, and virtual assistants in Nigeria." },
    { q: "Is the training really free?", a: "Yes, the core training modules, worksheets, and resources are 100% free. You only pay a one-time ₦3,000 identity and database registration fee to verify your profile and access the learning dashboard." },
    { q: "Who is this program for?", a: "It is designed for Nigerian freelancers, UI/UX designers, writers, developers, and virtual assistants who already have a skill but struggle to position themselves, find high-paying global clients, and build a predictable business model." },
    { q: "How do I get my certificate?", a: "Once you complete the three training parts and submit the assessments in your dashboard, you can request and download your official digital graduation certificate (subject to processing validation)." },
    { q: "Are there any hidden fees?", a: "No. The registration fee is a one-time ₦3,000 payment. If you choose to request and download a certified certificate of completion after graduation, there is a standard processing fee of ₦1,000, but it is entirely optional." }
  ];

  if (!mounted) {
    return (
      <div className="home-loading">
        <div className="spinner"></div>
        <p>Loading FoxRevo Ecosystem...</p>
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

      {/* HERO SECTION */}
      <header className="hero-section">
        <div className="hero-grid">
          
          {/* Hero Left: Strategic Positioning Copy */}
          <div className="hero-content">
            <div className="badge-promo">
              <span className="badge-accent">Free Training</span>
              <span className="badge-details">One-Time Registration: ₦3,000</span>
            </div>
            
            <h1 className="hero-headline-new">
              Stop Performing Success.<br />
              Start Building Real Capability.
            </h1>
            
            <p className="hero-subheadline-new">
              <em>The Wealth Revolution</em> is a rigorous, three-part operational blueprint built for ambitious Nigerian builders, professionals, and freelancers. Dismantle the employee matrix, reprogram your financial operating system, and master the exact mechanics of launching validated, zero-capital businesses.
            </p>

            <div className="benefit-bullets">
              <div className="benefit-item">
                <CheckCircle2 size={20} className="benefit-icon" />
                <div>
                  <strong>Part 1: The Detox</strong> — Eradicate performance noise, uncover unconscious money wounds, and escape the paycheck trap.
                </div>
              </div>
              <div className="benefit-item">
                <CheckCircle2 size={20} className="benefit-icon" />
                <div>
                  <strong>Part 2: The Rewire</strong> — Design your inputs environment, map your compound runway, and program your nervous system for abundance.
                </div>
              </div>
              <div className="benefit-item">
                <CheckCircle2 size={20} className="benefit-icon" />
                <div>
                  <strong>Part 3: The Build</strong> — Launch using zero-capital validation, develop productized moats, and capture asymmetrical returns in Africa.
                </div>
              </div>
            </div>
          </div>

          {/* Hero Right: Inline Registration Form */}
          <div className="hero-form-panel" id="register">
            <div className="form-card">
              <div className="form-card-header">
                <h2>Begin Your Rewire</h2>
                <p>Create your student credentials to register your profile and access the dashboard.</p>
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

                <div className="form-checkbox-group">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    required
                    disabled={regLoading}
                  />
                  <label htmlFor="terms">
                    I agree to the <Link href="/terms" target="_blank" className="form-link">Terms of Service</Link> & <Link href="/privacy" target="_blank" className="form-link">Privacy Policy</Link>
                  </label>
                </div>

                <button type="submit" disabled={regLoading} className="btn-submit-cta">
                  <span>Register & Proceed to Payment (₦3,000)</span>
                  <ArrowRight size={18} />
                </button>
              </form>

              <div className="form-card-footer text-center">
                <p>Already registered? <Link href="/login" className="login-inline-link">Log in to dashboard</Link></p>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* VALUE GRID SECTION */}
      <section className="value-grid-section">
        <div className="section-header text-center">
          <h2 className="section-title">The Three Pillars of The Wealth Revolution</h2>
          <p className="section-subtitle">Examine the exact structure of the modules, books, and blueprints waiting inside your learning workspace.</p>
        </div>

        <div className="features-grid">
          
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Lock size={24} />
            </div>
            <h3>Pillar 1: The Detox</h3>
            <p>Eradicate the 5 levels of Performance Noise. Confront subconscious money wounds, understand the 1971 money shift (how cash becomes debt), and dismantle the psychological safety leash of the paycheck trap.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <TrendingUp size={24} />
            </div>
            <h3>Pillar 2: The Rewire</h3>
            <p>Install compound thinking systems over instant gratification. Perform an environmental input audit, design your daily builder day structure, and train your nervous system to stay calm under scale.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <BookOpen size={24} />
            </div>
            <h3>Pillar 3: The Build</h3>
            <p>Master the Two-Hour Startup validation framework to validate client demand before building. Establish productized service moats, deploy Sinek's limbic circle communication, and learn the rules that break traditional corporate playbooks.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Users size={24} />
            </div>
            <h3>Pillar 4: Geopolitical Advantage</h3>
            <p>Extract structural patterns of success from global case studies. Map the asymmetrical opportunities of the African Century (following models like Paystack, Flutterwave, and Andela) to build local assets.</p>
          </div>

        </div>
      </section>

      {/* RESULTS & TESTIMONIALS */}
      <section className="testimonials-section">
        <div className="section-header text-center">
          <h2 className="section-title">The Transitions</h2>
          <p className="section-subtitle">Real results from Nigerian professionals who stopped performing success and started building it.</p>
        </div>

        <div className="testimonials-grid">
          
          <div className="testimonial-card">
            <p className="testimonial-body">
              "I was charging local startups ₦50,000 per project. After implementing Part 3's productization systems, I packaged my work as a subscription and landed my first US SaaS client at $1,200/month."
            </p>
            <div className="testimonial-author">
              <strong>Oluwaseun A.</strong>
              <span>UI/UX Designer</span>
            </div>
          </div>

          <div className="testimonial-card">
            <p className="testimonial-body">
              "I spent months trying to find gigs on freelance sites. Moving my positioning and applying the zero-capital validation test helped me land 2 retainer contracts in less than 3 weeks."
            </p>
            <div className="testimonial-author">
              <strong>Chidi O.</strong>
              <span>Virtual Assistant</span>
            </div>
          </div>

          <div className="testimonial-card">
            <p className="testimonial-body">
              "Stop writing 1,000-word articles for pennies. Productizing my output structure allowed me to charge premium fees per project instead of counting words."
            </p>
            <div className="testimonial-author">
              <strong>Blessing E.</strong>
              <span>Freelance Writer</span>
            </div>
          </div>

        </div>
      </section>

      {/* CORE VISION QUOTE */}
      <section className="cta-action-banner text-center" style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', marginBottom: '40px' }}>
        <blockquote style={{ fontSize: '18px', fontStyle: 'italic', color: 'var(--text-primary)', border: 'none', padding: 0, margin: '0 0 16px 0', lineHeight: '1.6' }}>
          "I envision a day when I see myself standing with Google and Apple, and the world asking, 'Did this really come from Africa?' A transformation they never imagined Africans to be capable of. That is what this revolution will deliver."
        </blockquote>
        <cite style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--text-secondary)' }}>— Kenneth A., CEO</cite>
      </section>

      {/* FAQ SECTION */}
      <section className="faq-section" id="faq">
        <div className="section-header text-center">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Everything you need to know about the registration, modules, and platform access.</p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className={`faq-item ${openFaq === index ? 'active' : ''}`}>
              <button className="faq-question" onClick={() => toggleFaq(index)} type="button">
                <span>{faq.q}</span>
                <span className="faq-toggle-icon">{openFaq === index ? '－' : '＋'}</span>
              </button>
              <div className="faq-answer">
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION FOR REGISTRATION */}
      <section className="cta-action-banner text-center">
        <h2>Ready to build real capability?</h2>
        <p>Register your student profile and secure your access to the wealth revolution playbook.</p>
        <Link href="#register" className="btn-cta-scroll">
          <span>Secure My Spot Now</span>
          <ArrowRight size={18} style={{ marginLeft: '8px' }} />
        </Link>
      </section>

    </div>
  );
}
