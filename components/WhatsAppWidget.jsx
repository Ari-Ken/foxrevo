"use client";

import React from 'react';
import { MessageCircle } from 'lucide-react';
import './WhatsAppWidget.css';

export default function WhatsAppWidget() {
  const supportUrl = "https://wa.me/2347077422928?text=Hello%20FoxRevo%20Support%2C%20I%20have%20a%20question%20regarding%20my%20registration%20or%20entrance%20examination.";

  return (
    <a 
      href={supportUrl} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="whatsapp-float-widget"
      aria-label="Contact support on WhatsApp"
    >
      <MessageCircle size={28} />
      <span className="whatsapp-widget-tooltip">WhatsApp Support</span>
    </a>
  );
}
