"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '../../utils/supabase/client';
import { 
  BookOpen, ShieldCheck, Award, MessageSquare, Briefcase, 
  TrendingUp, Settings, LogOut, CheckCircle, Clock, 
  ChevronRight, AlertCircle, Plus, Send, ExternalLink, Menu, X, ArrowUpRight
} from 'lucide-react';
import CertificateButton from './CertificateButton';
import CheckoutButton from './CheckoutButton';
import './dashboard.css';

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
    text: "FoxRevo OS is a sequential operating system. You cannot skip chapters. At the completion of each part of the book, you must log into your dashboard and complete the corresponding assessment check. Passing is the only way to unlock the next part.",
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

export default function DashboardClient({ candidate }) {
  const router = useRouter();
  const supabase = createClient();

  const [activeTab, setActiveTab] = useState('academy'); // 'academy' | 'community' | 'tracker' | 'validator' | 'partners' | 'settings'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sessionUser, setSessionUser] = useState(null);

  // Settings tab states
  const [fullName, setFullName] = useState(candidate.full_name || '');
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [settingsError, setSettingsError] = useState('');
  const [settingsSuccess, setSettingsSuccess] = useState('');

  // Community tab states
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('#detox');
  const [feedLoading, setFeedLoading] = useState(false);
  const [feedError, setFeedError] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [myVotes, setMyVotes] = useState(new Set()); // set of post_ids voted by user

  // Asset Tracker states
  const [cashFlow, setCashFlow] = useState(150000); // ₦
  const [assetsVal, setAssetsVal] = useState(350000); // ₦
  const [liabilitiesVal, setLiabilitiesVal] = useState(80000); // ₦
  const [trackerSuccess, setTrackerSuccess] = useState('');

  // Lean Validator wizard states
  const [validatorStep, setValidatorStep] = useState(1);
  const [ideaTitle, setIdeaTitle] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [coreProblem, setCoreProblem] = useState('');
  const [coreSolution, setCoreSolution] = useState('');
  const [signupsCount, setSignupsCount] = useState(0);
  const [validationScore, setValidationScore] = useState(null);

  // Book download states
  const [covenantChecked, setCovenantChecked] = useState(false);
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [activeGuideSlide, setActiveGuideSlide] = useState(0);

  const isPaid = candidate.payment_status === true;
  const hasPassed = candidate.passed_exam === true;
  const attempts = candidate.exam_attempts || 0;
  const isLocked = attempts >= 2 && !hasPassed;

  // Status helpers
  const paymentLabel = isPaid ? { text: 'PAID', color: '#10B981' } : { text: 'UNPAID', color: '#A51C30' };
  const examLabel = hasPassed
    ? { text: 'PASSED', color: '#10B981' }
    : isLocked
    ? { text: 'LOCKED', color: '#A51C30' }
    : { text: 'PENDING', color: '#64748B' };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSessionUser(session.user);
      }
    });
  }, []);

  // Fetch Community Posts
  useEffect(() => {
    if (activeTab === 'community') {
      fetchFeed();
    }
  }, [activeTab]);

  const fetchFeed = async () => {
    setFeedLoading(true);
    setFeedError('');
    try {
      // Fetch posts
      const { data: feedPosts, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        if (error.code === 'PGRST116' || error.message.includes('relation "public.posts" does not exist')) {
          setFeedError('The community database tables have not been created yet. Please run the SQL schema migration in Supabase.');
          setFeedLoading(false);
          return;
        }
        throw error;
      }

      // Fetch votes count and user's votes
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: userVotes } = await supabase
          .from('post_votes')
          .select('post_id')
          .eq('user_id', session.user.id);
        
        if (userVotes) {
          setMyVotes(new Set(userVotes.map(v => v.post_id)));
        }
      }

      // Fetch upvote aggregates
      const resolvedPosts = await Promise.all((feedPosts || []).map(async (post) => {
        // Fetch count
        const { count } = await supabase
          .from('post_votes')
          .select('*', { count: 'exact', head: true })
          .eq('post_id', post.id);

        // Fetch author name from candidates
        const { data: authData } = await supabase
          .from('candidates')
          .select('full_name')
          .eq('email', post.metrics?.author_email || '')
          .single();

        return {
          ...post,
          author_name: authData?.full_name || 'Graduated Builder',
          votes_count: count || 0
        };
      }));

      setPosts(resolvedPosts);
    } catch (err) {
      console.error('Error fetching community feed:', err);
      setFeedError('Failed to load feed entries. Make sure schema.sql has been run on your Supabase dashboard.');
    } finally {
      setFeedLoading(false);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;
    if (!hasPassed) {
      alert('Only certified FoxRevo OS graduates who passed the entrance exam can publish micro-insights.');
      return;
    }

    setSubmitLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('Session invalid. Please re-login.');

      const { error } = await supabase.from('posts').insert({
        author_id: session.user.id,
        content: newPostContent.trim(),
        category: newPostCategory,
        metrics: {
          author_email: session.user.email
        }
      });

      if (error) throw error;
      setNewPostContent('');
      fetchFeed();
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleVotePost = async (postId) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        alert('You must be logged in to vote.');
        return;
      }

      if (myVotes.has(postId)) {
        // Remove vote
        await supabase
          .from('post_votes')
          .delete()
          .eq('user_id', session.user.id)
          .eq('post_id', postId);
        
        setMyVotes((prev) => {
          const next = new Set(prev);
          next.delete(postId);
          return next;
        });
      } else {
        // Add vote
        await supabase.from('post_votes').insert({
          user_id: session.user.id,
          post_id: postId,
          vote_type: 'upvote'
        });

        setMyVotes((prev) => {
          const next = new Set(prev);
          next.add(postId);
          return next;
        });
      }
      fetchFeed();
    } catch (err) {
      console.error('Voting error:', err);
    }
  };

  // Save settings updates
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    setSettingsLoading(true);
    setSettingsError('');
    setSettingsSuccess('');
    try {
      const res = await fetch('/api/profile/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: fullName.trim() })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Update failed.');

      setSettingsSuccess('Name updated successfully on the platform.');
      router.refresh();
    } catch (err) {
      setSettingsError(err.message);
    } finally {
      setSettingsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!covenantChecked) return;
    setIsDownloading(true);
    try {
      const response = await fetch('/api/download-pdf', {
        method: 'POST',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to authorize download.");
      }

      setDownloadStarted(true);
      window.open(data.secureUrl, '_blank');
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  // Calculate Asset Metrics
  const assetRatio = liabilitiesVal > 0 ? (assetsVal / liabilitiesVal).toFixed(1) : assetsVal.toFixed(0);
  const deprogrammingFactor = cashFlow > 0 ? Math.min(100, Math.round(((cashFlow * 12) / (assetsVal || 1)) * 100)) : 0;

  // Wizard evaluation
  const handleEvaluateWizard = () => {
    let score = 20; // baseline
    if (ideaTitle.length > 5) score += 15;
    if (targetAudience.length > 10) score += 15;
    if (coreProblem.length > 15) score += 20;
    if (coreSolution.length > 15) score += 20;
    score += Math.min(10, signupsCount); // signup bonus
    
    setValidationScore(score);
    setValidatorStep(3);
  };

  const handleResetWizard = () => {
    setIdeaTitle('');
    setTargetAudience('');
    setCoreProblem('');
    setCoreSolution('');
    setSignupsCount(0);
    setValidationScore(null);
    setValidatorStep(1);
  };

  return (
    <div className="dashboard-container">
      {/* Mobile nav header */}
      <div className="dashboard-mobile-nav-header">
        <Link href="/" className="logo">FOXREVO</Link>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          style={{ background: 'none', border: 'none', color: 'var(--text-primary)' }}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar navigation */}
      <aside className={`dashboard-sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div>
          <div className="sidebar-brand-title">FOXREVO OS v2.0</div>
          <nav className="sidebar-menu">
            <button 
              onClick={() => { setActiveTab('academy'); setMobileMenuOpen(false); }}
              className={`sidebar-menu-btn ${activeTab === 'academy' ? 'active' : ''}`}
            >
              <BookOpen size={18} />
              <span>Academy Vault</span>
            </button>

            <button 
              onClick={() => { setActiveTab('community'); setMobileMenuOpen(false); }}
              className={`sidebar-menu-btn ${activeTab === 'community' ? 'active' : ''}`}
            >
              <MessageSquare size={18} />
              <span>TikTok of Wealth</span>
            </button>

            <button 
              onClick={() => { setActiveTab('tracker'); setMobileMenuOpen(false); }}
              className={`sidebar-menu-btn ${activeTab === 'tracker' ? 'active' : ''}`}
            >
              <TrendingUp size={18} />
              <span>Asset Tracker</span>
            </button>

            <button 
              onClick={() => { setActiveTab('validator'); setMobileMenuOpen(false); }}
              className={`sidebar-menu-btn ${activeTab === 'validator' ? 'active' : ''}`}
            >
              <Briefcase size={18} />
              <span>Lean Validator</span>
            </button>

            <button 
              onClick={() => { setActiveTab('partners'); setMobileMenuOpen(false); }}
              className={`sidebar-menu-btn ${activeTab === 'partners' ? 'active' : ''}`}
            >
              <ArrowUpRight size={18} />
              <span>Partner Services</span>
            </button>

            <button 
              onClick={() => { setActiveTab('settings'); setMobileMenuOpen(false); }}
              className={`sidebar-menu-btn ${activeTab === 'settings' ? 'active' : ''}`}
            >
              <Settings size={18} />
              <span>System Settings</span>
            </button>
          </nav>
        </div>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="sidebar-menu-btn w-full" style={{ color: 'var(--text-tertiary)' }}>
            <LogOut size={18} />
            <span>Sign Out Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="dashboard-main-content">
        <div className="tab-panel-container">
          
          {/* TAB 1: ACADEMY ROADMAP */}
          {activeTab === 'academy' && (
            <div className="animate-fade">
              <div className="panel-header-section">
                <h2>Academy Vault Dashboard</h2>
                <p>Track your assessment checkpoints, alignment audit statuses, and graduate certifications.</p>
              </div>

              {/* Status grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
                <div className="glass-card" style={{ padding: '20px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: '700', textTransform: 'uppercase' }}>Readiness Audit</span>
                  <h4 style={{ color: examLabel.color, fontSize: '20px', fontWeight: '800', margin: '4px 0 0 0' }}>{examLabel.text}</h4>
                </div>
                <div className="glass-card" style={{ padding: '20px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: '700', textTransform: 'uppercase' }}>Attempts Taken</span>
                  <h4 style={{ color: 'var(--text-primary)', fontSize: '20px', fontWeight: '800', margin: '4px 0 0 0' }}>{attempts} / 2</h4>
                </div>
                <div className="glass-card" style={{ padding: '20px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: '700', textTransform: 'uppercase' }}>Payment Clearance</span>
                  <h4 style={{ color: paymentLabel.color, fontSize: '20px', fontWeight: '800', margin: '4px 0 0 0' }}>{paymentLabel.text}</h4>
                </div>
              </div>

              {/* Steps panel logic */}
              <div className="glass-card" style={{ padding: '32px' }}>
                
                {/* 1. Not paid */}
                {!isPaid && (
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '12px' }}>Activate Platform Access</h3>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '24px' }}>
                      Your identity record is saved. To unlock the preparatory library and satisfy the Readiness Audit, you must settle the clearance fee.
                    </p>
                    <CheckoutButton />
                  </div>
                )}

                {/* 2. Paid, pending exam */}
                {isPaid && !hasPassed && !isLocked && (
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '12px' }}>Alignment Audit Required</h3>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '24px' }}>
                      Payment validated. You are permitted {2 - attempts} attempt{2 - attempts !== 1 ? 's' : ''} to clear the mindset alignment check. Open the preparatory chapters and complete the audit when ready.
                    </p>
                    <Link href="/exam-prep" className="btn-submit-cta neon-btn" style={{ display: 'inline-flex', textDecoration: 'none' }}>
                      <span>Enter Prep Library & Audit →</span>
                    </Link>
                  </div>
                )}

                {/* 3. Passed */}
                {isPaid && hasPassed && (
                  <div>
                    <div style={{ backgroundColor: 'rgba(16,185,129,0.06)', border: '1px solid #10B981', borderRadius: '8px', padding: '20px', marginBottom: '28px' }}>
                      <h4 style={{ color: '#10B981', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <CheckCircle size={18} />
                        <span>Alignment Clearance Confirmed</span>
                      </h4>
                      <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                        You cleared the alignment audit with a score of {candidate.exam_score}/50. The modular training sequences are fully unlocked below.
                      </p>
                      {/* EMBEDDED BOOK DOWNLOAD CENTER (EMPHASIZED) */}
                      <div style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid rgba(255, 62, 108, 0.3)', borderRadius: '12px', padding: '32px', marginBottom: '32px', boxShadow: '0 0 20px rgba(255, 62, 108, 0.05)', textAlign: 'left' }}>
                        <span style={{ fontSize: '11px', color: 'var(--accent-neon)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>CORE PLATFORM ASSET UNLOCKED</span>
                        <h3 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '12px', fontFamily: 'var(--font-outfit), sans-serif' }}>
                          📥 Download: The Wealth OS (Official Blueprint)
                        </h3>
                        
                        <div style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px', backgroundColor: 'rgba(0,0,0,0.2)', padding: '16px 20px', borderRadius: '8px', borderLeft: '3px solid var(--accent)' }}>
                          <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>The Covenant of the Revolution</strong>
                          This blueprint was earned, not just downloaded. Sharing this file with someone who has not deprogrammed through the alignment audit is not generosity — it is a shortcut that robs them of their transformation. If you want someone to have access to this, send them to the platform. Let them earn their place.
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer', textAlign: 'left' }}>
                            <input 
                              type="checkbox" 
                              checked={covenantChecked}
                              onChange={(e) => setCovenantChecked(e.target.checked)}
                              style={{ marginTop: '3px', cursor: 'pointer' }}
                            />
                            <span style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                              <strong>I understand and agree to protect the process.</strong> I will not share my access or the book files with anyone.
                            </span>
                          </label>

                          <div style={{ marginTop: '8px' }}>
                            <button 
                              onClick={handleDownload}
                              disabled={!covenantChecked || isDownloading}
                              className={`btn-submit-cta ${covenantChecked && !isDownloading ? 'neon-btn' : ''}`}
                              style={{ 
                                padding: '14px 28px', 
                                fontSize: '15px', 
                                width: '100%',
                                backgroundColor: covenantChecked ? 'var(--accent)' : 'var(--bg-secondary)',
                                color: covenantChecked ? '#fff' : 'var(--text-tertiary)',
                                border: covenantChecked ? 'none' : '1px solid var(--border-light)',
                                cursor: covenantChecked && !isDownloading ? 'pointer' : 'not-allowed',
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <span>{isDownloading ? 'Decrypting Secure Vault...' : '📥 Download the Wealth OS (PDF)'}</span>
                            </button>
                            <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: 'var(--text-tertiary)' }}>Secure, encrypted file. Size: 4.2 MB</p>
                          </div>
                        </div>

                        {downloadStarted && (
                          <div style={{ marginTop: '16px', backgroundColor: 'rgba(16,185,129,0.08)', border: '1px solid #10B981', color: '#10B981', padding: '12px', borderRadius: '6px', fontSize: '13px', fontWeight: '600' }}>
                            ✓ Decryption successful. Your download has started in a new tab.
                          </div>
                        )}

                        {/* INTEGRATED 6-SLIDE GUIDE */}
                        <div style={{ marginTop: '32px', borderTop: '1px solid var(--border-light)', paddingTop: '24px' }}>
                          <span style={{ fontSize: '11px', color: 'var(--accent-neon)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>SYSTEM USER MANUAL</span>
                          <h4 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '16px', margin: '0 0 16px 0' }}>
                            How to Deploy and Use the Wealth OS
                          </h4>

                          <div style={{ backgroundColor: 'rgba(0,0,0,0.15)', border: '1px solid var(--border-light)', borderRadius: '8px', padding: '24px', position: 'relative' }}>
                            <div style={{ fontSize: '32px', marginBottom: '12px' }}>
                              {osSlides[activeGuideSlide].icon}
                            </div>
                            
                            <span style={{ fontSize: '10px', color: 'var(--accent-neon)', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                              {osSlides[activeGuideSlide].badge}
                            </span>
                            
                            <h5 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '8px', margin: '0 0 8px 0' }}>
                              {osSlides[activeGuideSlide].title}
                            </h5>

                            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6', margin: '0 0 20px 0' }}>
                              {osSlides[activeGuideSlide].text}
                            </p>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <button 
                                onClick={() => setActiveGuideSlide((prev) => (prev > 0 ? prev - 1 : osSlides.length - 1))}
                                className="btn-submit-cta mini-btn outlined-btn"
                                style={{ padding: '6px 12px', fontSize: '11px', border: '1px solid var(--border-light)', background: 'transparent', color: 'var(--text-primary)' }}
                              >
                                ← Prev
                              </button>

                              <div style={{ display: 'flex', gap: '6px' }}>
                                {osSlides.map((_, idx) => (
                                  <button 
                                    key={idx}
                                    onClick={() => setActiveGuideSlide(idx)}
                                    style={{
                                      width: '8px',
                                      height: '8px',
                                      borderRadius: '50%',
                                      backgroundColor: activeGuideSlide === idx ? 'var(--accent-neon)' : 'var(--border-light)',
                                      border: 'none',
                                      cursor: 'pointer',
                                      padding: 0
                                    }}
                                    aria-label={`Go to slide ${idx + 1}`}
                                  />
                                ))}
                              </div>

                              <button 
                                onClick={() => setActiveGuideSlide((prev) => (prev < osSlides.length - 1 ? prev + 1 : 0))}
                                className="btn-submit-cta mini-btn"
                                style={{ padding: '6px 12px', fontSize: '11px', border: 'none', background: 'var(--accent)', color: '#fff' }}
                              >
                                Next →
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Academy Roadmap */}
                    <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '28px' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '12px' }}>Revolution Academy Roadmap</h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' }}>
                        Complete the assessment sequence for each book module below. Successfully passing all checks qualifies you for certification.
                      </p>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {[
                          { num: 1, title: 'Module 1: The Detox', desc: 'Expose active-income fallacies and audit structural overhead leaks.', passed: candidate.part1_passed, route: '/training/part1/prep' },
                          { num: 2, title: 'Module 2: The Rewire', desc: 'Install mental models to identify opportunities in friction.', passed: candidate.part2_passed, route: '/training/part2/prep' },
                          { num: 3, title: 'Module 3: The Build', desc: 'Structure and validate scalable business offerings without capital.', passed: candidate.part3_passed, route: '/training/part3/prep' },
                        ].map((m) => (
                          <div key={m.num} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', borderRadius: '8px' }}>
                            <div>
                              <h5 style={{ margin: '0 0 4px 0', fontSize: '14.5px', color: 'var(--text-primary)' }}>{m.title}</h5>
                              <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--text-tertiary)' }}>{m.desc}</p>
                            </div>
                            <Link href={m.route} className="btn-submit-cta mini-btn" style={{ textDecoration: 'none' }}>
                              {m.passed ? 'Review' : 'Enter'}
                            </Link>
                          </div>
                        ))}
                      </div>

                      <CertificateButton
                        p1Passed={candidate.part1_passed || false}
                        p2Passed={candidate.part2_passed || false}
                        p3Passed={candidate.part3_passed || false}
                        certPaid={candidate.cert_paid || false}
                      />
                    </div>
                  </div>
                )}

                {/* 4. Locked */}
                {isPaid && isLocked && (
                  <div>
                    <div style={{ backgroundColor: 'rgba(165,28,48,0.06)', border: '1px solid #A51C30', borderRadius: '8px', padding: '20px', marginBottom: '24px' }}>
                      <h4 style={{ color: '#A51C30', margin: '0 0 6px 0' }}>Clearance Attempt Limit Exceeded</h4>
                      <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                        Both attempts have been exhausted. You must reset your alignment logs and re-register to sit the audit again.
                      </p>
                    </div>
                    <CheckoutButton type="exam" label="Re-Register & Reset Audit — ₦3,000" />
                  </div>
                )}

              </div>
            </div>
          )}

          {/* TAB 2: TIKTOK OF WEALTH FEED */}
          {activeTab === 'community' && (
            <div className="animate-fade">
              <div className="panel-header-section">
                <h2>The TikTok of Wealth</h2>
                <p>A curated feed of micro-insights, deprogramming rules, and metrics validation shared by graduates.</p>
              </div>

              <div className="community-feed-layout">
                {/* Publish Composer (Only for passed candidates) */}
                {hasPassed ? (
                  <div className="glass-card post-composer-card">
                    <form onSubmit={handleCreatePost}>
                      <textarea 
                        placeholder="Share a wealth micro-lesson, validation metric, or deprogramming rule... (max 280 chars)"
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value.slice(0, 280))}
                        className="post-input-textarea"
                        required
                      />
                      <div className="composer-bottom-row">
                        <div className="category-select-wrapper">
                          <select 
                            value={newPostCategory} 
                            onChange={(e) => setNewPostCategory(e.target.value)}
                          >
                            <option value="#detox">#detox (Metrics & Overhead)</option>
                            <option value="#rewire">#rewire (Models & Gaps)</option>
                            <option value="#build">#build (Validation & Scaling)</option>
                            <option value="#qa">#qa (Technical Questions)</option>
                          </select>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span className="char-counter">{newPostContent.length} / 280</span>
                          <button type="submit" disabled={submitLoading} className="btn-submit-cta mini-btn">
                            <Send size={12} style={{ marginRight: '6px' }} />
                            <span>Publish</span>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="glass-card" style={{ padding: '20px', display: 'flex', gap: '12px', alignItems: 'center', backgroundColor: 'rgba(245,158,11,0.06)', borderColor: 'rgba(245,158,11,0.2)' }}>
                    <AlertCircle size={20} style={{ color: '#F59E0B' }} />
                    <p style={{ margin: 0, fontSize: '13.5px', color: 'var(--text-secondary)' }}>
                      <strong>Read-Only Mode:</strong> Only certified graduates who have cleared the entrance examination can post to the feed. Keep studying to unlock posting rights!
                    </p>
                  </div>
                )}

                {/* Feed list */}
                {feedLoading ? (
                  <div className="text-center" style={{ padding: '40px' }}><div className="spinner"></div></div>
                ) : feedError ? (
                  <div className="glass-card text-center" style={{ padding: '40px' }}>
                    <AlertCircle size={32} style={{ color: '#A51C30', marginBottom: '12px' }} />
                    <p style={{ margin: 0, fontSize: '14.5px', color: 'var(--text-secondary)' }}>{feedError}</p>
                  </div>
                ) : posts.length === 0 ? (
                  <div className="glass-card text-center" style={{ padding: '40px', color: 'var(--text-tertiary)' }}>
                    <p>No micro-insights shared yet. Be the first to publish a wealth post!</p>
                  </div>
                ) : (
                  <div className="feed-posts-list">
                    {posts.map((post) => (
                      <div key={post.id} className="glass-card post-card">
                        <div className="post-card-header">
                          <div className="post-author-info">
                            <span className="post-author-name">{post.author_name}</span>
                            <span className="post-author-badge">CERTIFIED BUILDER</span>
                          </div>
                          <div className="post-meta-details">
                            <span className="post-category-tag">{post.category}</span>
                            <span className="post-timestamp">{new Date(post.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <div className="post-card-body">
                          {post.content}
                        </div>

                        <div className="post-card-actions">
                          <button 
                            onClick={() => handleVotePost(post.id)}
                            className={`post-action-btn ${myVotes.has(post.id) ? 'voted' : ''}`}
                          >
                            ▲ Log Asset ({post.votes_count})
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: ASSET TRACKER */}
          {activeTab === 'tracker' && (
            <div className="animate-fade">
              <div className="panel-header-section">
                <h2>Asset Column Tracker</h2>
                <p>Log, structure, and visualize your balance sheet metrics based on first principles.</p>
              </div>

              <div className="tracker-setup-grid">
                <div className="glass-card asset-form-card">
                  <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px' }}>Update Balance Ledger</h3>
                  
                  <div className="wizard-form-fields">
                    <div className="form-item">
                      <label>Monthly Unproductive Overheads (₦)</label>
                      <input 
                        type="number" 
                        value={liabilitiesVal} 
                        onChange={(e) => setLiabilitiesVal(Math.max(0, parseInt(e.target.value) || 0))}
                      />
                    </div>
                    <div className="form-item">
                      <label>Total Compounding Assets Column (₦)</label>
                      <input 
                        type="number" 
                        value={assetsVal} 
                        onChange={(e) => setAssetsVal(Math.max(0, parseInt(e.target.value) || 0))}
                      />
                    </div>
                    <div className="form-item">
                      <label>Active Productive Cash Flow / Month (₦)</label>
                      <input 
                        type="number" 
                        value={cashFlow} 
                        onChange={(e) => setCashFlow(Math.max(0, parseInt(e.target.value) || 0))}
                      />
                    </div>
                  </div>
                </div>

                <div className="tracker-metrics-results">
                  <div className="tracker-result-card">
                    <span className="tracker-result-label">Asset-to-Liability Ratio</span>
                    <span className="tracker-result-value" style={{ color: parseFloat(assetRatio) >= 3 ? '#10B981' : '#F59E0B' }}>
                      {assetRatio}x
                    </span>
                  </div>

                  <div className="tracker-result-card">
                    <span className="tracker-result-label">Deprogramming Index</span>
                    <span className="tracker-result-value" style={{ color: deprogrammingFactor >= 50 ? '#10B981' : '#F59E0B' }}>
                      {deprogrammingFactor}%
                    </span>
                  </div>

                  <div className="glass-card tracker-chart-container">
                    <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '700' }}>Balance Architecture Visual</h4>
                    
                    <div className="visual-bar-chart">
                      <div className="chart-bar-item">
                        <div className="chart-bar-labels"><span>Asset Strength</span><span>{assetsVal.toLocaleString()} ₦</span></div>
                        <div className="chart-bar-track">
                          <div className="chart-bar-fill" style={{ width: `${Math.min(100, assetsVal > 0 ? (assetsVal / (assetsVal + liabilitiesVal)) * 100 : 0)}%` }}></div>
                        </div>
                      </div>

                      <div className="chart-bar-item">
                        <div className="chart-bar-labels"><span>Unproductive Overhead</span><span>{liabilitiesVal.toLocaleString()} ₦</span></div>
                        <div className="chart-bar-track">
                          <div className="chart-bar-fill liability" style={{ width: `${Math.min(100, liabilitiesVal > 0 ? (liabilitiesVal / (assetsVal + liabilitiesVal)) * 100 : 0)}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: LEAN VALIDATOR */}
          {activeTab === 'validator' && (
            <div className="animate-fade">
              <div className="panel-header-section">
                <h2>Lean Validation Wizard</h2>
                <p>Test your business offers, structures, and metrics against the Module 3 framework before writing code.</p>
              </div>

              <div className="wizard-steps-container">
                {validatorStep === 1 && (
                  <div className="glass-card wizard-card">
                    <div className="wizard-progress-header">
                      <h3>Step 1: Offer Architecture</h3>
                      <span className="wizard-step-indicator">1 / 3</span>
                    </div>

                    <div className="wizard-form-fields">
                      <div className="form-item">
                        <label>Business / Offer Title</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Lagos Virtual Logistics System" 
                          value={ideaTitle}
                          onChange={(e) => setIdeaTitle(e.target.value)}
                        />
                      </div>
                      <div className="form-item">
                        <label>Target Audience (Who pays for this?)</label>
                        <textarea 
                          placeholder="e.g. Small scale cosmetics vendors selling on Instagram in Lagos." 
                          value={targetAudience}
                          onChange={(e) => setTargetAudience(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="wizard-navigation-buttons">
                      <div></div>
                      <button 
                        onClick={() => setValidatorStep(2)} 
                        className="btn-submit-cta mini-btn"
                        disabled={!ideaTitle.trim() || !targetAudience.trim()}
                      >
                        Next Step
                      </button>
                    </div>
                  </div>
                )}

                {validatorStep === 2 && (
                  <div className="glass-card wizard-card">
                    <div className="wizard-progress-header">
                      <h3>Step 2: Gaps & Signups</h3>
                      <span className="wizard-step-indicator">2 / 3</span>
                    </div>

                    <div className="wizard-form-fields">
                      <div className="form-item">
                        <label>Core Structural Friction (What problem is solved?)</label>
                        <textarea 
                          placeholder="e.g. Current delivery riders cancel orders last minute, causing sellers to lose payments."
                          value={coreProblem}
                          onChange={(e) => setCoreProblem(e.target.value)}
                        />
                      </div>
                      <div className="form-item">
                        <label>Minimum Viable Solution (No code, manual execution)</label>
                        <textarea 
                          placeholder="e.g. A WhatsApp dispatch brokerage group where delivery routes are mapped manually."
                          value={coreSolution}
                          onChange={(e) => setCoreSolution(e.target.value)}
                        />
                      </div>
                      <div className="form-item">
                        <label>Vetted Customer Pre-Signups</label>
                        <input 
                          type="number" 
                          value={signupsCount}
                          onChange={(e) => setSignupsCount(Math.max(0, parseInt(e.target.value) || 0))}
                        />
                      </div>
                    </div>

                    <div className="wizard-navigation-buttons">
                      <button onClick={() => setValidatorStep(1)} className="btn-submit-cta mini-btn outlined-btn">Back</button>
                      <button 
                        onClick={handleEvaluateWizard} 
                        className="btn-submit-cta mini-btn"
                        disabled={!coreProblem.trim() || !coreSolution.trim()}
                      >
                        Evaluate Validation Index
                      </button>
                    </div>
                  </div>
                )}

                {validatorStep === 3 && (
                  <div className="glass-card wizard-card text-center animate-scale">
                    <div className="cert-award-icon">
                      <Award size={48} className="neon-icon-glow" />
                    </div>
                    <h3>Validation Evaluation Complete</h3>
                    
                    <div className="validation-scorecard-box">
                      <div className="scorecard-item">
                        <strong>Offer Title:</strong>
                        <span>{ideaTitle}</span>
                      </div>
                      <div className="scorecard-item">
                        <strong>Vetted Signups:</strong>
                        <span>{signupsCount} leads</span>
                      </div>
                      <div className="scorecard-item">
                        <strong>Validation Strength Index:</strong>
                        <span style={{ fontWeight: '700', color: validationScore >= 60 ? '#10B981' : '#F59E0B' }}>
                          {validationScore} / 100
                        </span>
                      </div>
                    </div>

                    <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.5', margin: '0 0 24px 0' }}>
                      {validationScore >= 70 
                        ? 'Pass. Your validation strength meets standard parameters. You are ready to deploy your minimum viable offer to market.' 
                        : 'Warning: Validation index below standard criteria. Expand target lead signups or adjust your friction definition.'
                      }
                    </p>

                    <div className="wizard-navigation-buttons" style={{ justifyContent: 'center', gap: '16px' }}>
                      <button onClick={handleResetWizard} className="btn-submit-cta mini-btn outlined-btn">Reset Wizard</button>
                      {validationScore >= 70 && (
                        <button onClick={() => alert('Validation score card logged.')} className="btn-submit-cta mini-btn">Save Scorecard</button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: PARTNER DIRECTORY */}
          {activeTab === 'partners' && (
            <div className="animate-fade">
              <div className="panel-header-section">
                <h2>Partner Services Registry</h2>
                <p>Direct connectivity with vetted operators to resolve friction points during business registration and setup.</p>
              </div>

              <div className="partner-directory-grid">
                <div className="glass-card partner-card">
                  <div className="partner-card-header">
                    <span className="partner-tag">Legal</span>
                  </div>
                  <div className="partner-card-body">
                    <h4>Vetted CAC Agent Network</h4>
                    <p>Direct contact with certified corporate lawyers to handle corporate CAC name reservation, filing, and tax registration in Nigeria.</p>
                  </div>
                  <button onClick={() => alert('Routing request to support...')} className="partner-action-btn">Request CAC Setup →</button>
                </div>

                <div className="glass-card partner-card">
                  <div className="partner-card-header">
                    <span className="partner-tag">Banking</span>
                  </div>
                  <div className="partner-card-body">
                    <h4>Dollar Corporate Setup</h4>
                    <p>Integrated partnership channels to register dollar corporate banking records and payment collection pathways for global clients.</p>
                  </div>
                  <button onClick={() => alert('Routing request to support...')} className="partner-action-btn">Request Account Setup →</button>
                </div>

                <div className="glass-card partner-card">
                  <div className="partner-card-header">
                    <span className="partner-tag">Tech</span>
                  </div>
                  <div className="partner-card-body">
                    <h4>API Integrations Vetting</h4>
                    <p>Certified developer contractors to connect Flutterwave, Paystack, or Stripe APIs into your custom validated checkout flow.</p>
                  </div>
                  <button onClick={() => alert('Routing request to support...')} className="partner-action-btn">Request Tech Partner →</button>
                </div>

                <div className="glass-card partner-card">
                  <div className="partner-card-header">
                    <span className="partner-tag">Admin</span>
                  </div>
                  <div className="partner-card-body">
                    <h4>Virtual Assistant Sourcing</h4>
                    <p>Highly qualified, deprogrammed operational assistants to handle administrative tasks while you focus on system building.</p>
                  </div>
                  <button onClick={() => alert('Routing request to support...')} className="partner-action-btn">Request Assistant Setup →</button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="animate-fade">
              <div className="panel-header-section">
                <h2>System Settings</h2>
                <p>Manage your account configuration, identity records, and security details.</p>
              </div>

              <div className="glass-card" style={{ padding: '32px' }}>
                {settingsError && (
                  <div style={{ color: '#A51C30', fontSize: '13.5px', marginBottom: '16px', fontWeight: '600' }}>
                    {settingsError}
                  </div>
                )}
                {settingsSuccess && (
                  <div style={{ color: '#10B981', fontSize: '13.5px', marginBottom: '16px', fontWeight: '600' }}>
                    {settingsSuccess}
                  </div>
                )}

                <form onSubmit={handleSaveSettings}>
                  <div className="wizard-form-fields">
                    <div className="form-item">
                      <label htmlFor="fullName">Full Legal Name</label>
                      <input 
                        type="text" 
                        id="fullName" 
                        value={fullName} 
                        onChange={(e) => setFullName(e.target.value)}
                        disabled={settingsLoading}
                        required
                      />
                      <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '4px', display: 'block' }}>
                        This name must match your official ID for dynamic certificate credential generation.
                      </span>
                    </div>

                    <div className="form-item">
                      <label>Email (Read-only)</label>
                      <input 
                        type="email" 
                        value={candidate.email} 
                        disabled 
                        style={{ opacity: 0.6, cursor: 'not-allowed' }}
                      />
                    </div>
                  </div>

                  <div style={{ marginTop: '24px' }}>
                    <button type="submit" disabled={settingsLoading} className="btn-submit-cta mini-btn">
                      <span>{settingsLoading ? 'Saving Settings...' : 'Save Settings'}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
