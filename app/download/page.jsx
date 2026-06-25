"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import './download.css';

export default function DownloadDashboard() {
  const router = useRouter();
  const [covenantChecked, setCovenantChecked] = useState(false);
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [isUnauthorized, setIsUnauthorized] = useState(false);

  const [isDownloading, setIsDownloading] = useState(false);



  const handleDownload = async () => {
    if (!covenantChecked) return;
    
    try {
      const response = await fetch('/api/download-pdf', {
        method: 'POST',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to authorize download.");
      }

      setDownloadStarted(true);
      
      // Open the secure signed URL to trigger the download
      window.open(data.secureUrl, '_blank');
      
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setIsDownloading(false);
    }
  };



  return (
    <div className="dashboard-container">
      
      {/* PAGE HEADER / HERO SECTION */}
      <section className="dashboard-hero">
        <div className="hero-content">
          <h1 className="dashboard-headline">Welcome, Architect. You Have Earned Your Place.</h1>
          <p className="dashboard-subheadline">
            You did not stumble upon this page. You were not handed this link in a WhatsApp group. You studied. You sat the examination. You proved, before reading a single page, that you are serious about your future. The soil is prepared. The blueprint is now yours.
          </p>
        </div>
      </section>

      <div className="dashboard-body">
        
        {/* SECTION 1: THE COVENANT */}
        <section className="section-block covenant-block">
          <h2>Before You Download: The Covenant of the Revolution</h2>
          
          <div className="covenant-text">
            <p>You are about to download <em>The Wealth Revolution</em>. But before you click the button, you must remember the covenant you agreed to when you registered.</p>
            <p className="font-bold mt-2">This book was earned, not just downloaded.</p>
            <p>
              The principles inside these pages are not mere information. They are transformation tools. Transformation cannot be downloaded. It must be earned through the process of showing up, committing, and proving you are ready to receive it.
            </p>
            <p>
              Someone may ask you to share this file with them. They may frame it as generosity. They may say, <em>"Help me na, just send it."</em>
            </p>
            <div className="ui-notice-box urgent-notice my-4">
              <strong className="text-wine text-lg">Do not do it.</strong>
              <p className="mt-2">
                Sharing this book with someone who did not earn it is not kindness. It is robbery. Not of FoxRevo. Of <em>them</em>. A person who receives this book without going through the detox of the entrance exam will read the exact same words you are reading, and nothing will change inside them. You will be giving them a shortcut that costs them the very transformation they need most.
              </p>
            </div>
            <p className="mb-4">
              Protect this book. Protect the process. Protect the people you love from a shortcut that will rob them of their growth. If you want someone to have access to this revolution, send them to FoxRevo. Let them earn it.
            </p>
          </div>

          <label className={`covenant-checkbox-wrapper ${covenantChecked ? 'checked' : ''}`}>
            <input 
              type="checkbox" 
              className="covenant-checkbox"
              checked={covenantChecked}
              onChange={(e) => setCovenantChecked(e.target.checked)}
            />
            <span className="checkbox-text">
              <strong>I understand and agree to protect the process.</strong> I will not share my access or the book files with anyone.
            </span>
          </label>
        </section>

        {/* SECTION 2: THE DOWNLOAD */}
        <section className="section-block text-center download-section">
          <h2>Your Blueprint Awaits</h2>
          <div className="mt-4 mb-2">
            <button 
              className={`btn btn-large ${covenantChecked && !isDownloading ? 'btn-primary' : 'btn-disabled'}`}
              onClick={handleDownload}
              disabled={!covenantChecked || isDownloading}
            >
              {isDownloading ? 'Decrypting Secure Vault...' : '📥 Download "The Wealth Revolution" (PDF)'}
            </button>
          </div>
          <p className="file-subtext">Secure, encrypted file. Size: 4.2 MB</p>
          
          {downloadStarted && (
            <div className="download-success-msg">
              <strong>The revolution has begun.</strong> Read the protocol below before you start.
            </div>
          )}
        </section>

        {/* SECTION 3: THE PROTOCOL */}
        <section className="section-block">
          <h2>How to Read This Book</h2>
          <p className="mt-2 mb-4">
            This is not a book you skim. It is a book you sit down with deliberately, the way a medical student sits down with <em>Gray's Anatomy</em>, knowing that what they are studying is going to determine outcomes in the real world. Follow this protocol strictly:
          </p>
          
          <div className="protocol-list">
            <div className="protocol-item">
              <div className="protocol-number">1</div>
              <div className="protocol-content">
                <h3>Read in Order</h3>
                <p>The three parts of this book are a sequence, not a menu. Part One (The Detox) must be read before Part Two (The Rewire). Part Two before Part Three (The Build). You cannot install a new operating system in a machine that has not been cleared of the old one.</p>
              </div>
            </div>
            
            <div className="protocol-item">
              <div className="protocol-number">2</div>
              <div className="protocol-content">
                <h3>Read with a Notebook</h3>
                <p>Every chapter contains principles that require you to respond, not just receive. When a chapter asks you to reflect, reflect. When it asks you to write, write. The notebook is not optional. It is the place where reading becomes transformation.</p>
              </div>
            </div>

            <div className="protocol-item">
              <div className="protocol-number">3</div>
              <div className="protocol-content">
                <h3>Read Slowly</h3>
                <p>The chapters in this book are long because the principles are deep. A chapter a day, read carefully and journaled honestly, will do more for your future than thirty chapters skimmed in an afternoon.</p>
              </div>
            </div>

            <div className="protocol-item">
              <div className="protocol-number">4</div>
              <div className="protocol-content">
                <h3>When Something Disturbs You, Stay</h3>
                <p>If a chapter makes you uncomfortable, do not skip it. Discomfort is the signal that the material is touching something that needed to be touched. The chapters that disturb you the most are the ones that will change you the most.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: YOUR FIRST ASSIGNMENT */}
        <section className="section-block assignment-block">
          <h2>The First Brick</h2>
          <p className="mt-2 mb-4">
            Do not just download the book and close this tab. The revolution demands immediate action. Your first assignment begins the moment you open Chapter 1.
          </p>
          
          <div className="task-box">
            <h3 className="text-amber">Your Task:</h3>
            <p>
              Read the Prologue and Chapter 1 (<em>The Noise That Is Killing You</em>). At the end of the chapter, you will find a <strong>FoxRevo Checkpoint</strong>.
            </p>
            <p className="mt-2">
              You are required to write down the three loudest sources of noise in your current life. Be specific. Not "social media," but <em>which accounts</em>. Not "peer pressure," but <em>which people</em>. Not "shortcuts," but <em>which specific temptations</em>.
            </p>
            <p className="mt-2 font-bold italic">
              Name them. That naming is the beginning of your freedom.
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link href="/community" className="text-link">Access the Member Community Forum</Link>
            <p className="text-xs text-secondary mt-1">(Private community where successful candidates discuss the checkpoints)</p>
          </div>
        </section>

        {/* SECTION 5: SUPPORT & CONTINUITY */}
        <section className="section-block border-top">
          <h2>We Are With You</h2>
          <p className="mt-2 mb-4">
            The journey from consumer to architect is lonely, but you are no longer walking it alone. The FoxRevo team and your fellow candidates are in the sanctuary with you.
          </p>
          <ul className="support-list">
            <li><strong>Technical Issues with your download?</strong> Contact Support: <a href="mailto:support.foxrevo@gmail.com" className="text-wine">support.foxrevo@gmail.com</a></li>
            <li><strong>Need to discuss a checkpoint?</strong> Go to the <Link href="/community" className="text-wine">Community Forum</Link>.</li>
            <li><strong>Want to refer a friend?</strong> Send them to the <Link href="/register" className="text-wine">official registration page</Link>. Let them earn their place.</li>
          </ul>
        </section>

      </div>
    </div>
  );
}
