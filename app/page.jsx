import React from 'react';
import Link from 'next/link';
import './page.css';
import FaqSection from '../components/FaqSection';
import FlipSection from '../components/FlipSection';

export default function Home() {
  return (
    <div className="home-container">
      
      {/* HERO SECTION */}
      <section className="section-block hero-section">
        <h1 className="hero-headline">The Revolution Has Always Asked You One Question: Why Are You Here?</h1>
        <p className="hero-subheadline">
          FoxRevo: The revolution building Africa's next billionaires. Translating centuries of global wealth principles into the African context.
        </p>
        
        <div className="badge">
          <div className="flags-container">
            <img src="https://flagcdn.com/w40/za.png" alt="South Africa" className="flag-icon-img" />
            <img src="https://flagcdn.com/w40/ke.png" alt="Kenya" className="flag-icon-img" />
            <img src="https://flagcdn.com/w40/gh.png" alt="Ghana" className="flag-icon-img" />
            <img src="https://flagcdn.com/w40/eg.png" alt="Egypt" className="flag-icon-img" />
            <span style={{ margin: '0 4px', fontSize: '12px' }}>➕</span>
            <img src="https://flagcdn.com/w40/ng.png" alt="Nigeria" className="flag-icon-img highlight-flag" />
          </div>
          <span className="badge-text">We're thrilled to announce that the revolution is now open to Nigerians (the one recognized giant of Africa)</span>
        </div>

        <div className="image-placeholder main-image" style={{ padding: 0, overflow: 'hidden' }}>
          <img src="/image001.jpg" alt="FoxRevo Hero Architecture" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </section>

      {/* SECTION 1: WHY ARE YOU HERE & PROJECTIONS */}
      <section className="section-block" id="mission">
        <h2>Why Are You Here?</h2>
        <p>
          We will not answer that for you. It is your responsibility to discover what drove you to this exact moment. But our mission is clear: To deprogram the noise, install the wealth mindset, and build the legacy architects of Africa.
        </p>
        <a href="#register" className="btn btn-primary cta-btn">Join the Revolution</a>
        
        <p className="wisdom-intro" style={{ marginTop: '48px', marginBottom: '8px' }}>Estimated records by 2035</p>
        <div className="projection-ticker">
          <div className="ticker-track">
            <span><strong>1,000</strong> African Billionaires Produced</span>
            <span><strong>50,000</strong> African Millionaires Produced</span>
            <span><strong>500</strong> Tech Companies By Africa</span>
            <span><strong>100</strong> Globally Recognized Companies from Africa</span>
            <span><strong>10,000</strong> World Competing Entrepreneurs</span>
            <span><strong>5,000</strong> Visionary Leaders</span>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE VISION & QUOTES */}
      <section className="vision-quote-section">
        <h2 className="sr-only">The Vision</h2>
        <blockquote className="featured-quote">
          "I envision a day when I see myself standing with Google and Apple, and the world asking, 'Did this really come from Africa?' A transformation they never imagined Africans to be capable of. That is what this revolution will deliver."
          <cite>— Kenneth A., CEO</cite>
        </blockquote>
        
        <div className="legends-quote-block">
          <blockquote>
            "It always seems impossible until it's done. Money won't create success, the freedom to make it will."
          </blockquote>
          <cite>— Nelson Mandela</cite>
        </div>
      </section>

      {/* SECTION 3: WHAT WE'VE DONE */}
      <section className="section-block">
        <h2>What We've Done, We Will Do For You</h2>
        <p>
          We have extracted the blueprints of the world's greatest wealth builders. Now, we are handing them to you. We stand on our mission to change the world by building what—and who—Africa will become.
        </p>
        <div className="button-group">
          <a href="#register" className="btn btn-primary">Be Part of This Revolution</a>
          <Link href="/about" className="btn btn-secondary">Read Our Full Mission</Link>
        </div>

        <div className="image-placeholder main-image" style={{ height: '300px', padding: 0, overflow: 'hidden' }}>
          <img src="/image002.jpg" alt="Revolution Progress" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <div className="ui-notice-box urgent-notice">
          <strong>Notice:</strong> All the accepted members who completed their first lecture last month, you will be contacted by FoxRevo team with your assessment analysis. We're also working towards issuing certificate of completion for the members who've made it to the final stage.
        </div>
      </section>

      {/* SECTIONS 4 & 5: THE REGISTRATION ENGINE (3D FLIP) */}
      <FlipSection />

      {/* CHOOSE THE STATEMENT THAT MOTIVATES YOU */}
      <section className="section-block" style={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}>
        <p className="wisdom-intro">Choose the statement that motivates you.</p>
        <div className="mindset-carousel">
          <div className="mindset-card">"I wouldn't mind paying more for this, it's worth it"</div>
          <div className="mindset-card">"I've always known there's a system sold to African's that isn't built for them, and that's why we're still where we are"</div>
          <div className="mindset-card">"For me, sharing this with every member of my families is important, because I wouldn't want them to miss out on this"</div>
          <div className="mindset-card">"I am done performing success. I am ready to build it."</div>
          <div className="mindset-card">"I refuse to let the noise of my environment dictate the architecture of my future."</div>
        </div>
      </section>

      {/* SECTION 6: FAQS */}
      <FaqSection />

      <div className="separator-image" style={{ overflow: 'hidden', borderRadius: '4px', border: '1px solid var(--border-medium)' }}>
        <img src="/image003.jpg" alt="Advocate the Revolution" style={{ width: '100%', height: 'auto', display: 'block' }} />
      </div>

      {/* SECTION 7: ADVOCACY & WISDOM SCROLL */}
      <section className="section-block">
        <h2>The Revolution Protects Its Own. And It Expands Through Advocates.</h2>
        <p>
          Do not just share a link to "help 10 people." Send this to 10 people who need to wake up. Share it with families. Build a community of builders. Be an advocate of the revolution.
        </p>
        
        <div className="button-group mb-4">
          <a href="#register" className="btn btn-primary">Join the Revolution</a>
        </div>

        <p className="text-secondary" style={{ fontSize: '13px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Share / Send To:</p>
        <div className="social-sharing">
          <span>Facebook</span> | <span>TikTok</span> | <span>LinkedIn</span> | <span>Instagram</span> | <span>WhatsApp</span>
        </div>

        <div className="wisdom-scroll-container">
          <p className="wisdom-intro">....built on the wisdom, knowledge, and insights of the world's most successful leaders and wealthiest people.</p>
          <div className="wisdom-scroll">
            <div className="wisdom-track">
              <span>Napoleon Hill</span> • <span>Robert Kiyosaki</span> • <span>Aliko Dangote</span> • <span>Charles Beem</span> • <span>Reeves</span> • <span>Elon Musk</span> • <span>Jeff Bezos</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
