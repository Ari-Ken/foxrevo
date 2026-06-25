"use client";

import React, { useState } from 'react';

export default function FaqSection() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    { q: "Q1: Why is there an entrance exam?", a: "FoxRevo is not a seminar you attend and forget. The exam is not gatekeeping; it is soil preparation. Transformation cannot be downloaded. The exam proves, before the lesson begins, that you are ready to receive it." },
    { q: "Q2: What happens if I fail the exam?", a: "The required pass mark is 45 out of 100. You have two chances. If you do not pass, it means you are not ready for this specific revolution at this time. We protect the integrity of the process and the community." },
    { q: "Q3: Why are there no refunds?", a: "Because the value is in the commitment, the detox, and the process—not just the information. You are investing in the deliberate dismantling of your old mindset." },
    { q: "Q4: Can I share my login or the book with my friends and family?", a: "No. Sharing this with someone who did not earn it is not kindness; it robs them of the transformation. If you want someone to have access, send them to FoxRevo to register and earn it." },
    { q: "Q5: Is this just another motivational program?", a: "No. We are not here to motivate you. We are here to change you. This is the deliberate installation of the principles that built the world's greatest companies, translated for the African context." },
    { q: "Q6: What is the ultimate goal of FoxRevo?", a: "To be the starting point of the story that a Nigerian billionaire tells in an interview thirty years from now when they say: 'It all started when I encountered the FoxRevo revolution.'" }
  ];

  return (
    <section className="section-block" id="faq">
      <h2>FAQS</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className={`faq-item ${openFaq === index ? 'active' : ''}`}>
            <button className="faq-question" onClick={() => toggleFaq(index)} type="button">
              {faq.q}
              <span className="faq-icon">＋</span>
            </button>
            <div className="faq-answer">
              <p>{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
