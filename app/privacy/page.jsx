import React from 'react';
import Link from 'next/link';
import './privacy.css';

export default function PrivacyPolicy() {
  return (
    <div className="privacy-container">
      
      {/* PAGE HEADER / HERO SECTION */}
      <section className="section-block hero-section">
        <h1 className="hero-headline">The Architecture of Trust: Your Privacy, Our Standard.</h1>
        <p className="hero-subheadline">
          In a digital world that routinely trades your attention, your data, and your privacy for profit, FoxRevo operates on a fundamentally different principle. Your information is not a commodity to be sold. It is the raw material of your transformation, and it remains strictly within the walls of the revolution.
        </p>
      </section>

      {/* SECTION 1: THE PHILOSOPHY OF PRIVACY */}
      <section className="section-block">
        <h2>Why We Guard Your Information</h2>
        <p>
          Most privacy policies are written by lawyers to protect the company from liability. This document is written by the founders of FoxRevo to protect <em>you</em>, and to protect the integrity of the process.
        </p>
        <p>
          When you apply to join the revolution, you are not just handing over an email address. You are submitting to an assessment. You are revealing your current mindset, your financial understanding, and your readiness to change. That level of vulnerability requires absolute trust.
        </p>
        <p>
          FoxRevo exists to build legacy architects. We cannot build a community of builders if the foundation of trust is compromised. Therefore, our privacy standard is as uncompromising as our entrance examination.
        </p>
      </section>

      {/* SECTION 2: THE SANCTITY OF THE ENTRANCE EXAM */}
      <section className="section-block">
        <h2>Your Answers Remain Safe. Your Process is Sealed.</h2>
        <p>This is the most critical aspect of our privacy architecture, and we want to state it with absolute clarity:</p>
        <div className="ui-notice-box mb-4">
          <strong>Your entrance examination answers are never shared, sold, or exposed.</strong>
        </div>
        <p>
          When you submit your exam, your answers are not fed into a public database. They are not used to train third-party algorithms. They are not shared with external educators, marketers, or data brokers.
        </p>
        <p>
          Your answers are reviewed by exactly one entity: <strong>The FoxRevo Exam Team.</strong>
        </p>
        <p>
          They are used for one singular, specific purpose: <strong>to analyze your qualification, your mindset, and your readiness to receive the revolution.</strong>
        </p>
        <p>
          Once the assessment team has evaluated your readiness and communicated your results, the specific mechanics of your answers remain sealed within our internal assessment architecture.
        </p>
        <ul className="bullet-list">
          <li>We do not share your results with your friends or family.</li>
          <li>We do not publish your failures or your starting point.</li>
          <li>We do not use your exam answers for any purpose other than determining your next step in the revolution.</li>
        </ul>
        <p className="mt-4 italic text-secondary">
          The exam is a mirror showing you who you are. We ensure that what the mirror reflects stays between you and the process.
        </p>
      </section>

      {/* SECTION 3: WHAT WE COLLECT & WHY */}
      <section className="section-block">
        <h2>The Minimum Necessary Data</h2>
        <p>We do not collect your data for the sake of collecting it. We only gather the information strictly necessary to execute the revolution's process.</p>
        
        <div className="data-list-container">
          <div className="data-item">
            <h3>1. Registration & Identity Data</h3>
            <p>When you register, we collect your name, email address, and phone number. This is required to create your secure portal, communicate your exam results, and deliver the revolution materials to the right person.</p>
          </div>
          
          <div className="data-item">
            <h3>2. Examination Data</h3>
            <p>We collect and securely store your answers to the Entrance Examination. As stated above, this is used solely by the FoxRevo Exam Team to analyze your qualification and readiness.</p>
          </div>
          
          <div className="data-item">
            <h3>3. Transaction Data</h3>
            <p>To process the non-refundable registration fee, we collect the necessary billing details required by our secure payment gateways.</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-top">
          <h3 className="mb-2 text-wine">What We Do NOT Collect:</h3>
          <p>
            We do not track your personal browsing history. We do not demand access to your social media accounts. We do not collect data that does not serve the direct purpose of your enrollment and assessment.
          </p>
        </div>
      </section>

      {/* SECTION 4: THE ABSOLUTE RULE OF NON-SHARING */}
      <section className="section-block">
        <h2>We Do Not Sell. We Do Not Share. Period.</h2>
        <p>Let there be no ambiguity: <strong>FoxRevo does not sell your personal information to third parties.</strong></p>
        <ul className="bullet-list mt-4">
          <li>Your email will not be added to external marketing lists.</li>
          <li>Your phone number will not be shared with affiliate partners.</li>
          <li>Your assessment data will not be handed over to external educational institutions or data aggregators.</li>
        </ul>
        <p className="mt-4">
          The only time your data leaves our direct control is when it is strictly necessary to process your payment (handled by highly regulated, secure payment gateways) or to deliver a service you have explicitly requested (such as our hosting providers). Even then, those third parties are bound by strict confidentiality agreements and are forbidden from using your data for their own purposes.
        </p>
      </section>

      {/* SECTION 5: THE VAULT (DATA SECURITY) */}
      <section className="section-block">
        <h2>Protecting the Process</h2>
        <p>We treat your data with the same rigor that we expect you to treat your financial architecture.</p>
        <p>
          We utilize industry-standard encryption and secure server infrastructure to protect your personal information and examination data from unauthorized access, alteration, or destruction. Access to your data within the FoxRevo organization is strictly limited to the personnel who require it to administer the entrance exam and manage your registration.
        </p>
        <p>
          However, while we build the strongest vaults we can, no digital system is entirely immune to the efforts of determined actors. We commit to continuously upgrading our security architecture to protect the revolution and its members.
        </p>
      </section>

      {/* SECTION 6: YOUR RIGHTS & THE EXIT */}
      <section className="section-block">
        <h2>You Control Your Data</h2>
        <p>You are the architect of your own life, and you retain rights over your personal data.</p>
        <ul className="bullet-list mt-4">
          <li><strong>Access:</strong> You can request to see the personal data we hold about you.</li>
          <li><strong>Correction:</strong> If your information is inaccurate, you can request that we update it.</li>
          <li><strong>Deletion:</strong> If you choose to withdraw from the revolution, you can request the deletion of your personal data from our active marketing and communication lists. <em>(Note: We will retain anonymized examination data strictly for internal statistical analysis of the revolution's impact, but your personal identifiers will be removed).</em></li>
        </ul>
        <p className="mt-4">To exercise any of these rights, contact our support team directly.</p>
      </section>

      {/* SECTION 7: UPDATES TO THIS ARCHITECTURE */}
      <section className="section-block">
        <h2>Evolving With the Revolution</h2>
        <p>
          As the FoxRevo revolution grows and our systems evolve, we may update this Privacy Policy. When we do, we will revise the date at the bottom of this page. We encourage you to review this policy periodically to stay informed about how we are protecting your information.
        </p>
      </section>

      {/* SECTION 8: CONTACT THE REVOLUTION */}
      <section className="section-block">
        <h2>Questions About Your Privacy?</h2>
        <p>
          If you have any questions, concerns, or require clarity regarding how your data is handled, do not hesitate to reach out. Transparency is a core pillar of the builder's ethos.
        </p>
        <div className="contact-details mt-4">
          <p><strong>Email:</strong> support.foxrevo@gmail.com</p>
          <p><strong>Contact Page:</strong> <Link href="/contact" className="text-wine">Contact Us</Link></p>
        </div>
      </section>

    </div>
  );
}
