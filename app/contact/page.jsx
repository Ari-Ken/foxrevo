"use client";

import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram, MessageCircle, Video } from 'lucide-react';
import './contact.css';

export default function Contact() {
  const shareMessage = encodeURIComponent("The Revolution Has Begun. Build your legacy. I have secured my spot in FoxRevo, take the test and see if you are ready to join.");
  const siteUrl = "https://www.foxrevo.com/register";

  return (
    <div className="contact-container">
      
      {/* PAGE HEADER / HERO SECTION */}
      <section className="section-block hero-section">
        <h1 className="hero-headline">Direct Communication. No Noise.</h1>
        <p className="hero-subheadline">
          We keep our channels open for serious inquiries, technical support, and registration clarity. If you have a genuine question, we are here. If you are looking for a shortcut, look elsewhere.
        </p>
      </section>

      {/* SECTION 1: QUICK ANSWERS */}
      <section className="section-block">
        <h2>Before You Write: Check the Architecture</h2>
        <p>
          Most of the questions we receive have already been answered in detail. Before reaching out to our support team, review our Frequently Asked Questions. It will save you time and get you the exact information you need immediately.
        </p>
        <Link href="/#faq" className="btn btn-primary mt-4">Read the FAQs</Link>
      </section>

      {/* SECTION 2: DIRECT CONTACT */}
      <section className="section-block">
        <h2>Reach the FoxRevo Team</h2>
        <p>
          If your question is not answered in the FAQs, or if you are experiencing a technical issue with the registration portal or the examination platform, use the direct channels below.
        </p>
        
        <div className="contact-methods mt-4">
          <div className="contact-method">
            <h3>Email Support</h3>
            <p className="contact-highlight">📧 support.foxrevo@gmail.com</p>
            <p className="contact-note">
              Use this for official inquiries, portal access issues, registration verification, and detailed questions. Please include your registered name and email address in your message so we can locate your file.
            </p>
          </div>
          
          <div className="contact-method">
            <h3>WhatsApp Direct</h3>
            <p className="contact-highlight">📱 +234 707 742 2928</p>
            <p className="contact-note">
              Use this for urgent, direct communication regarding your registration or exam status. Please be respectful of the team's time: keep your messages concise, clear, and directly related to your FoxRevo process.
            </p>
          </div>
        </div>

        <p className="mt-4 italic text-secondary border-top pt-4">
          (Note: Our team reviews messages during designated operational hours. We do not provide financial advice, business consulting, or motivational coaching through these channels. We are here to support your entry into the revolution, not to do the building for you.)
        </p>
      </section>

      {/* SECTION 3: REVOLUTION ADVOCATE */}
      <section className="section-block">
        <h2>Be an Advocate of the Revolution</h2>
        <p>
          The revolution expands through those who have been transformed by it. If FoxRevo has shifted your mindset, your greatest act of gratitude is not just telling us—it is bringing others into the process.
        </p>
        <p><strong>Do not just share a link. Send a challenge.</strong></p>
        
        <div className="ui-notice-box urgent-notice mt-4 mb-4">
          <strong className="text-wine">A Crucial Reminder on Sharing:</strong>
          <p className="mt-2">
            Remember the terms you agreed to. <strong>Do not share your login, your PDF, or your access to the revolution materials.</strong> Sharing a shortcut robs them of the transformation. Instead, send them to the official FoxRevo portal to register, pay the fee, take the exam, and earn their place. That is the greatest gift you can give them.
          </p>
        </div>

        <div className="share-link-box">
          <strong>Share the Official Registration Link:</strong>
          <p className="link-text">www.foxrevo.com/register</p>
        </div>

        <h3 className="mt-4 mb-2">Send the Revolution to Your Network:</h3>
        <div className="social-share-grid">
          <a href={`https://wa.me/?text=${shareMessage}%20${siteUrl}`} target="_blank" rel="noopener noreferrer" className="share-btn">
            <MessageCircle size={20} /> Share on WhatsApp
          </a>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${siteUrl}&quote=${shareMessage}`} target="_blank" rel="noopener noreferrer" className="share-btn">
            <Facebook size={20} /> Share on Facebook
          </a>
          <a href={`https://twitter.com/intent/tweet?text=${shareMessage}&url=${siteUrl}`} target="_blank" rel="noopener noreferrer" className="share-btn">
            <Twitter size={20} /> Share on X
          </a>
          <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${siteUrl}`} target="_blank" rel="noopener noreferrer" className="share-btn">
            <Linkedin size={20} /> Share on LinkedIn
          </a>
          <button className="share-btn" onClick={() => navigator.clipboard.writeText(`${shareMessage} ${siteUrl}`)}>
            <Instagram size={20} /> Share on Instagram
          </button>
          <button className="share-btn" onClick={() => navigator.clipboard.writeText(`${shareMessage} ${siteUrl}`)}>
            <Video size={20} /> Share on TikTok
          </button>
        </div>
      </section>

    </div>
  );
}
