"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '../utils/supabase/client';
import { ShieldCheck, Lock, Users, Mail, AlertCircle, ArrowRight, CheckCircle2, TrendingUp, DollarSign } from 'lucide-react';
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
              <span className="badge-details">Identity & Registration Fee: ₦3,000</span>
            </div>
            
            <h1 className="hero-headline-new">
              Stop Performing Success.<br />
              Start Monetizing Your Skills Like a Business.
            </h1>
            
            <p className="hero-subheadline-new">
              A no-fluff playbook built for Nigerian UI/UX designers, freelance writers, developers, and virtual assistants. Learn the exact mechanics of global client acquisition, professional positioning, and international billing. No hype. No "millions in 3 days" claims. Just pure business systems.
            </p>

            <div className="benefit-bullets">
              <div className="benefit-item">
                <CheckCircle2 size={20} className="benefit-icon" />
                <div>
                  <strong>Skill to Asset:</strong> Package your existing capabilities into structured service offerings that global clients trust.
                </div>
              </div>
              <div className="benefit-item">
                <CheckCircle2 size={20} className="benefit-icon" />
                <div>
                  <strong>LinkedIn & Twitter Pipelines:</strong> Systematically attract high-paying client retainers without bidding wars.
                </div>
              </div>
              <div className="benefit-item">
                <CheckCircle2 size={20} className="benefit-icon" />
                <div>
                  <strong>Global Invoicing & Banking:</strong> Learn how to legally set up professional invoicing, international bank accounts, and contracts.
                </div>
              </div>
            </div>
          </div>

          {/* Hero Right: Inline Registration Form */}
          <div className="hero-form-panel" id="register">
            <div className="form-card">
              <div className="form-card-header">
                <h2>Get Instant Access</h2>
                <p>Create your student credentials and proceed to secure verification.</p>
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
          <h2 className="section-title">Build Real Capability. Not Motivation.</h2>
          <p className="section-subtitle">A SaaS-style view of the business building systems you will learn and implement inside your personal dashboard.</p>
        </div>

        <div className="features-grid">
          
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Users size={24} />
            </div>
            <h3>Global Client Sourcing</h3>
            <p>Learn the exact content frameworks and cold outreach systems that grab the attention of international founders and marketing directors. Stop fighting in the race to the bottom on Upwork or Fiverr.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <CheckCircle2 size={24} />
            </div>
            <h3>Productized Services</h3>
            <p>Turn your design, writing, development, or VA work into defined service packages with flat rates and specific timelines. Shift the conversation from "what is your hourly rate" to "here is the outcome you get."</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <TrendingUp size={24} />
            </div>
            <h3>Operational Infrastructure</h3>
            <p>Develop standard operating procedures to manage multiple international clients without breaking down. Learn to run your freelance profile with the structure of a premium digital agency.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <DollarSign size={24} />
            </div>
            <h3>Foreign Invoicing & Contracts</h3>
            <p>Establish legal service agreements that protect your work. Configure foreign currency invoice pathways and multi-currency billing setups so global clients can pay you seamlessly.</p>
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
              "I was charging local startups ₦50,000 per design project. After implementing these systems, I packaged my work as a subscription and landed my first US SaaS client at $1,200/month."
            </p>
            <div className="testimonial-author">
              <strong>Oluwaseun A.</strong>
              <span>UI/UX Designer</span>
            </div>
          </div>

          <div className="testimonial-card">
            <p className="testimonial-body">
              "I spent months trying to find gigs on Upwork. Moving my positioning to LinkedIn and productizing my VA offering helped me land 2 retainer contracts in less than 3 weeks."
            </p>
            <div className="testimonial-author">
              <strong>Chidi O.</strong>
              <span>Virtual Assistant</span>
            </div>
          </div>

          <div className="testimonial-card">
            <p className="testimonial-body">
              "Stop writing 1,000-word articles for pennies. Productizing content strategy allowed me to charge premium fees per project instead of counting words."
            </p>
            <div className="testimonial-author">
              <strong>Blessing E.</strong>
              <span>Freelance Writer</span>
            </div>
          </div>

        </div>
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
        <p>Register your student profile and secure your access to the skills monetization playbook.</p>
        <Link href="#register" className="btn-cta-scroll">
          <span>Secure My Spot Now</span>
          <ArrowRight size={18} style={{ marginLeft: '8px' }} />
        </Link>
      </section>

    </div>
  );
}
