"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Moon, Sun, UserCircle } from 'lucide-react';
import './Navbar.css';
import { createClient } from '../utils/supabase/client';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);
  const supabase = createClient();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="logo">
          FoxRevo<span className="logo-dot">.</span>
        </Link>
        <div className="navbar-actions">
          {user ? (
            <Link href="/dashboard" className="desktop-nav-link" style={{ marginRight: '16px', color: 'var(--text-primary)', fontWeight: 'bold' }}>
              Dashboard
            </Link>
          ) : (
            <Link href="/login" className="desktop-nav-link" style={{ marginRight: '16px', color: 'var(--text-primary)' }}>
              Login
            </Link>
          )}
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="mobile-menu">
          <Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link href="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link href="/about" onClick={() => setIsMenuOpen(false)}>Mission</Link>
          <Link href="/#faq" onClick={() => setIsMenuOpen(false)}>FAQ</Link>
          <Link href="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          
          {user ? (
            <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className="menu-btn-primary">Dashboard</Link>
          ) : (
            <>
              <Link href="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
              <Link href="/#register" onClick={() => setIsMenuOpen(false)} className="menu-btn-primary">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
