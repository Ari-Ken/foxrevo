import React from 'react';
import Link from 'next/link';
import './about.css';

export default function About() {
  return (
    <div className="about-container">
      
      {/* PAGE HEADER / HERO SECTION */}
      <section className="section-block hero-section">
        <h1 className="hero-headline">We Are Not Here to Motivate You. We Are Here to Change You.</h1>
        <p className="hero-subheadline">
          FoxRevo is not a seminar. It is not a collection of quotes designed to make you feel inspired for 48 hours. It is the deliberate dismantling of the lies you were taught about wealth, and the installation of the principles that actually built the world.
        </p>
        <div className="image-placeholder main-image" style={{ padding: 0, overflow: 'hidden' }}>
          <img src="/image001.jpg" alt="FoxRevo Mission Blueprint" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </section>

      {/* SECTION 1: THE ORIGIN */}
      <section className="section-block">
        <h2>The Grief That Built This Revolution</h2>
        <p>
          FoxRevo was not born in a boardroom. It was not conceptualized in a strategy meeting. It was forged in grief.
        </p>
        <p>
          Before FoxRevo was a revolution, it was a quiet, breaking realization. I watched my generation—brilliant, fiery, full of a potential that could make the world tremble—choose to pour all of it into noise.
        </p>
        <p>
          I watched young Nigerians spend their sharpest years chasing viral moments, performing lifestyles they could not afford, and treating the idea of building something real as a joke only naive people tell. I grieved for the boy who sold his future for a fast move. I grieved for the graduate who was smart enough to change everything but was never taught what to do with that smartness.
        </p>
        <p>
          I grieved for the Google that was never built here. For the Apple conceived in a Lagos bedroom and never made it past a dream. For the Amazon that could have started in Aba and conquered Africa, but did not, because no one told the founder that the principles for building it already existed.
        </p>
        <p>
          No one translated it for them. That was the gap. That was the grief. And that grief became the fuel.
        </p>
        <p>
          I realized that Africa does not need one more person waiting for change. Africa needs people who have decided to <em>become</em> the change. FoxRevo was built to find them, deprogram them, and hand them the blueprints.
        </p>
        <p className="founder-signoff">
          <strong>— Kenneth Arinze, Founder</strong>
        </p>
      </section>

      {/* SECTION 2: THE MISSION */}
      <section className="section-block">
        <h2>Our Mission: The Architecture of a New Africa</h2>
        <p>
          We exist to close the gap between the potential of the African mind and the reality of African wealth. We do this by extracting the hard-won wisdom of the world's greatest builders—Buffett, Dangote, Musk, Kiyosaki, Thiel—and translating it directly into the African context.
        </p>
        <p>Our mission is precise, uncompromising, and non-negotiable:</p>
        
        <div className="mission-points">
          <div className="mission-point">
            <h3>1. To Deprogram the Noise</h3>
            <p>We are here to dismantle the fast-money, get-rich-quick, social-media-performance mentality that has hijacked the ambitions of a generation. We tear down the lies installed in the African mind without permission.</p>
          </div>
          <div className="mission-point">
            <h3>2. To Install the Builder's Operating System</h3>
            <p>We install the wealth mindset, the entrepreneurial frameworks, and the leadership principles that built companies worth hundreds of billions of dollars. We replace the psychology of the consumer with the architecture of the creator.</p>
          </div>
          <div className="mission-point">
            <h3>3. To Translate Global Wisdom for African Realities</h3>
            <p>We do not just admire Silicon Valley or Wall Street from a distance. We take those principles and apply them to Nigerian markets, African realities, and the specific, beautiful, difficult challenges of building on this continent.</p>
          </div>
          <div className="mission-point">
            <h3>4. To Produce Legacy Architects</h3>
            <p>We are here to produce founders, not just employees. Builders, not just consumers. Legacy architects, not just hustle performers.</p>
          </div>
          <div className="mission-point">
            <h3>5. To Be The Starting Point</h3>
            <p>Our ultimate measure of success is this: To be the starting point of the story that a Nigerian billionaire tells in an interview thirty years from now, when they say, <em>"It all started when I encountered the FoxRevo revolution."</em></p>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE PHILOSOPHY */}
      <section className="section-block">
        <h2>Why We Are Different (And Why We Are Uncompromising)</h2>
        <p>
          If you are looking for a place to be told that you are already perfect just the way you are, FoxRevo is not for you.
        </p>
        <p className="highlight-truth">
          We operate on a fundamental truth: <strong>Transformation cannot be downloaded. It must be earned.</strong>
        </p>
        <p>
          This is why we do not just hand out information. Information without transformation is just entertainment. This is why we have an entrance examination. This is why we require you to read, to study, and to prove you are serious before the reward arrives.
        </p>
        
        <ul className="philosophy-list">
          <li><strong>The Detox:</strong> We first clear the ground. We destroy the money wounds, the scarcity mindsets, and the addiction to noise that were installed in you by a system designed to keep you dependent.</li>
          <li><strong>The Rewire:</strong> We lay the foundation. We install the disciplines of delayed gratification, compound thinking, and the silent builder's identity.</li>
          <li><strong>The Build:</strong> We hand you the blueprints. We teach you the money architecture, the obsession principle, and the leadership crucible required to construct a legacy.</li>
        </ul>

        <p className="protection-clause">
          We protect this process fiercely. We do not allow our materials to be shared with those who have not earned them, because giving someone a shortcut robs them of the very transformation they need most. <strong>The revolution protects its own.</strong>
        </p>
      </section>

      {/* SECTION 4: THE VISION */}
      <section className="section-block">
        <h2>The 2035 Projection: What We Are Building Toward</h2>
        <p>
          We are not just building bank accounts; we are building the infrastructure of a new African economy. By the year 2035, the FoxRevo revolution will have directly catalyzed the following realities across the continent:
        </p>
        
        <ul className="projection-list">
          <li><strong>[X]</strong> New African Billionaires Forged</li>
          <li><strong>[X]</strong> African Millionaires Produced</li>
          <li><strong>[X]</strong> Tech Companies Built in Africa</li>
          <li><strong>[X]</strong> Globally Recognized Companies Originating from Africa</li>
          <li><strong>[X]</strong> World-Competing Entrepreneurs</li>
          <li><strong>[X]</strong> Visionary Leaders Rewiring their Communities</li>
        </ul>

        <p>
          We see a day when the world looks at the next great global tech giant, the next great industrial monopoly, the next great financial institution, and asks: <em>"Did this really come from Africa?"</em>
        </p>
        <p>
          And the answer will be: <em>Yes. And it was built by the architects of the FoxRevo revolution.</em>
        </p>
      </section>

      {/* SECTION 5: THE INVITATION */}
      <section className="section-block">
        <h2>The Revolution Has Already Begun. Are You In?</h2>
        <p>Africa has enough noise. Enough flash. Enough performance.</p>
        <p>Africa needs builders. Disciplined, obsessed, long-game-playing, systems-thinking, legacy-obsessed builders.</p>
        <p>
          If you are tired of performing success and are ready to start building it, your seat at the table is waiting. But you must earn it. You must pass the exam. You must commit to the detox.
        </p>
        <p>
          Read the terms. Take the examination. Prove to yourself, before the lesson begins, that you are ready to receive it.
        </p>

        <div className="button-group-vertical mt-4">
          <Link href="/register" className="btn btn-primary">Begin the Registration Process</Link>
          <Link href="/terms" className="btn btn-secondary">Read the Entrance Terms & FAQs</Link>
        </div>
      </section>

    </div>
  );
}
