"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Moon, Sun } from 'lucide-react';
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

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });

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

  const handleRegisterClick = (e) => {
    setIsMenuOpen(false);
    if (typeof window !== 'undefined') {
      if (window.location.pathname === '/') {
        e.preventDefault();
        const el = document.getElementById('register');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="logo">
          FOXREVO
        </Link>

        {/* Desktop Navigation Links */}
        <div className="desktop-nav-links">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/about" className="nav-link">About</Link>
          <Link href="/about#mission" className="nav-link">Mission</Link>
          <Link href="/?scroll=register" onClick={handleRegisterClick} className="nav-link">Register</Link>
          <Link href="/#faq" className="nav-link">FAQ</Link>
          <Link href="/contact" className="nav-link">Contact</Link>
        </div>

        <div className="navbar-actions">
          {user ? (
            <Link href="/dashboard" className="desktop-btn-secondary">
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/login" className="desktop-btn-secondary">
                Login
              </Link>
              <Link href="/?scroll=register" onClick={handleRegisterClick} className="desktop-btn-primary">
                Begin Your Application
              </Link>
            </>
          )}
          
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          
          <button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="mobile-menu">
          <Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link href="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link href="/about#mission" onClick={() => setIsMenuOpen(false)}>Mission</Link>
          <Link href="/?scroll=register" onClick={handleRegisterClick}>Register</Link>
          <Link href="/#faq" onClick={() => setIsMenuOpen(false)}>FAQ</Link>
          <Link href="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          
          {user ? (
            <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className="menu-btn-primary-mob">Dashboard</Link>
          ) : (
            <>
              <Link href="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
              <Link href="/?scroll=register" onClick={handleRegisterClick} className="menu-btn-primary-mob">Begin Your Application</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
