"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppWidget from './WhatsAppWidget';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  
  // Hide marketing navbar & footer on operational app routes
  const isAppRoute = 
    pathname.startsWith('/dashboard') || 
    pathname.startsWith('/training') || 
    pathname.startsWith('/exam') ||
    pathname.startsWith('/verify');

  if (isAppRoute) {
    return (
      <main className="main-content-isolated">
        {children}
      </main>
    );
  }

  return (
    <>
      <Navbar />
      <main className="main-content">
        {children}
      </main>
      <WhatsAppWidget />
      <Footer />
    </>
  );
}
