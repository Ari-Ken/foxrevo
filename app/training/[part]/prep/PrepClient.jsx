"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, CheckSquare, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import './prep.css';

export default function PrepClient({ part, candidate }) {
  const [hasConfirmed, setHasConfirmed] = useState(false);
  const partNumber = part === 'part1' ? 1 : part === 'part2' ? 2 : 3;

  return (
    <div className="prep-container">
      <div className="prep-card">
        
        {/* Navigation Breadcrumb */}
        <div className="prep-breadcrumb">
          <Link href="/dashboard" className="back-link">
            <ArrowLeft size={16} style={{ marginRight: '6px' }} />
            Back to Dashboard
          </Link>
        </div>

        {/* Part 1 Prep Material */}
        {part === 'part1' && (
          <div className="prep-content">
            <div className="status-badge-inline">
              <BookOpen size={14} style={{ marginRight: '6px' }} />
              Module One Prep Material
            </div>
            
            <h1 className="prep-title">The Architecture of the Demolition: Proving You Have Cleared the Ground</h1>
            <p className="prep-subtitle">Welcome to the threshold.</p>

            <div className="prep-body-text">
              <p>You have just completed Part One of <em>The Wealth Revolution</em>. You have walked through the fire of <strong>The Detox</strong>.</p>
              <p>Over the last five chapters, we did not try to motivate you. We did not try to make you feel good. We systematically dismantled the illusions, the inherited traumas, and the systemic lies that have been quietly sabotaging your potential since the day you were born. We tore down the Noise. We exposed the Theatre of Wealth. We excavated your Money Wounds. We revealed the Employee Matrix. And we demanded that you make the Exit.</p>
              <p>But reading about a demolition is not the same as clearing the land.</p>
              <p>Many people will read Part One, feel a temporary spike of adrenaline, nod in agreement, and then immediately return to the exact same habits, the exact same environment, and the exact same financial reality. They will consume the detox as entertainment.</p>
              <p>FoxRevo does not deal in entertainment. We deal in transformation.</p>
              
              <div className="prep-highlight-box">
                <strong>The Module One Assessment:</strong> It is not a test of your memory. We do not care if you can memorize the five types of noise or recite Robert Kiyosaki’s definition of an asset. The assessment is a <strong>mirror</strong>. It is designed to test your <em>alignment</em>. It will probe the depths of your subconscious to see if the Detox actually took root, or if the old programming has already reasserted itself.
              </div>

              <h3>PILLAR 1: The Biological Hijacking and the Death of the Noise</h3>
              <p>The first great lie of the modern age is that your attention belongs to you. It does not. It is being strip-mined by an algorithmic economy designed to keep you docile, distracted, and consuming.</p>
              <p>In Chapter One, we exposed the <strong>Dopamine Architecture of Distraction</strong>. Your brain was hijacked not by a lack of willpower, but by a biological vulnerability. Every time you scroll, you are pulling the lever on a slot machine, trading the slow, compounding dopamine of <em>building</em> for the cheap, instant dopamine of <em>consuming</em>.</p>
              <p>The assessment will test your ability to ruthlessly identify the <strong>Five Types of Noise</strong> operating in your life:</p>
              <ul>
                <li><strong>Performance Noise:</strong> The expensive, destructive habit of looking successful instead of becoming capable.</li>
                <li><strong>Shortcut Noise:</strong> The desperation for fast money that leads you into schemes, traps, and moral compromise.</li>
                <li><strong>Fame Noise:</strong> The obsession with being known before you have built anything worth knowing.</li>
                <li><strong>Peer Pressure Noise:</strong> The ambient expectations of your environment that demand you conform to their timeline of mediocrity.</li>
                <li><strong>Entertainment Noise:</strong> The quiet rot of passive consumption disguised as rest.</li>
              </ul>

              <h3>PILLAR 2: The Theatre of Wealth vs. The Asset Column</h3>
              <p>Society has sold you a counterfeit definition of wealth. In Nigeria, we have mastered the Theatre of Wealth. We celebrate the rented Benz, the bottled service, the airport photos. We optimize for the reaction we produce in others.</p>
              <p>But as Robert Kiyosaki brutally exposed in Chapter Two, <strong>Income is not Wealth.</strong> Income is what flows in. Wealth is what remains when the flow stops.</p>
              <p>The foundation of your financial future rests entirely on your ability to distinguish between an <strong>Asset</strong> and a <strong>Liability</strong>.</p>
              <ul>
                <li>An <strong>Asset</strong> puts money into your pocket, regardless of whether you are working.</li>
                <li>A <strong>Liability</strong> takes money out of your pocket, regardless of how impressive it looks to your peers.</li>
              </ul>
              <p>The Detox demands that you accept the <strong>Five Markers of Real Wealth</strong>: Time Freedom, Financial Security Without Employment, Compounding Capacity, Internal Financial Peace, and Legacy Capacity.</p>

              <h3>PILLAR 3: The Invisible Scripts (Confronting the Money Wounds)</h3>
              <p>This is where the Detox becomes deeply personal. You can know all the mechanical rules of money, but if your subconscious mind equates wealth with danger, guilt, or moral corruption, you will self-sabotage every opportunity that comes your way.</p>
              <p>In Chapter Three, we excavated the <strong>Money Wounds</strong> installed in you before you were old enough to question them. We explored the trauma of scarcity, the false association between wealth and corruption, the shame of talking about money, the trap of tying your self-worth to your net worth, and the deep-seated belief that you simply do not deserve it.</p>
              <p>Drawing from the insights of Jay Shetty and Lewis Howes, we established that your relationship with money is an emotional signature. If your nervous system treats abundance as a threat, it will engineer your return to the familiar comfort of lack.</p>

              <h3>PILLAR 4: The Employee Matrix and the 1971 Shift</h3>
              <p>In Chapter Four, we pulled back the curtain on the educational and economic systems. We exposed the foundational omission: the system was not designed to produce owners; it was designed to produce compliant, financially dependent employees.</p>
              <p>We explored the <strong>1971 Money Shift</strong>, when money was decoupled from gold and became debt. We revealed the devastating truth that saving cash in a bank account in an inflationary economy is not a wealth-building strategy; it is a wealth-erosion strategy. The middle class saves cash and gets poorer; the wealthy acquire assets and get richer.</p>
              <p>Most importantly, we exposed the <strong>Paycheck Trap</strong>. The paycheck is not your reward; it is a leash. It provides a false sense of security that drops your risk tolerance to zero and expands your lifestyle to match your income, keeping you permanently dependent on the matrix.</p>

              <h3>PILLAR 5: The Exit Protocol — From Information to Intention</h3>
              <p>Information without execution is just entertainment. Chapter Five was the crucible. It demanded that you transition from a passive consumer of knowledge to an active architect of your life.</p>
              <p>Leaving the Matrix requires three non-negotiable decisions:</p>
              <ol>
                <li><strong>The Environmental Audit:</strong> Ruthlessly curating your inputs, your media, and your inner circle. You are the average of the five people you spend the most time with. If your environment is committed to the Noise, you will remain in the Noise.</li>
                <li><strong>The Identity Shift:</strong> Moving from the "performed identity" to the "builder's identity." You must stop describing yourself as someone <em>trying</em> to make money, and start operating as someone who <em>builds systems</em>.</li>
                <li><strong>The First Action:</strong> The Detox is not complete until it produces a physical, undeniable action in the real world.</li>
              </ol>

              <div className="prep-final-charge">
                <h4>THE FINAL CHARGE: THE MIRROR AWAITS</h4>
                <p>Do not approach this as a university exam where you cram facts to pass a grade. Approach it as a psychological evaluation of your new identity.</p>
                <p>If you read Part One and nothing changed inside you, this assessment will expose it. But if you have done the work—if you have sat in the discomfort, audited your environment, healed your money wounds, and made the deliberate choice to leave the Matrix—this assessment will be a confirmation. The moment you look in the mirror and recognize the Legacy Architect staring back at you.</p>
              </div>
            </div>
          </div>
        )}

        {/* Part 2 Prep Material */}
        {part === 'part2' && (
          <div className="prep-content">
            <div className="status-badge-inline">
              <BookOpen size={14} style={{ marginRight: '6px' }} />
              Module Two Prep Material
            </div>
            
            <h1 className="prep-title">The Confirmation of The Rewire</h1>
            <p className="prep-subtitle">You have cleared the ground. Now we test the foundation.</p>

            <div className="prep-body-text">
              <p>You completed Part One. You dismantled the Noise. You exposed the Theatre of Wealth. You excavated your Money Wounds. You recognized the Employee Matrix and chose the Exit.</p>
              <p>But a cleared lot does not build itself.</p>
              <p>Part Two was never about inspiration. It was about <strong>installation</strong>. We handed you the blueprints for a new operating system—the psychological, neurological, and environmental architecture required to sustain wealth, not just chase it. We moved you from demolition to construction. We installed delayed gratification. We wired compound thinking. We designed your environment. We reprogrammed your belief system. We trained your nervous system to stop flinching at scale.</p>
              
              <div className="prep-highlight-box">
                <strong>The Module Two Assessment:</strong> It is not a test of whether you remember the chapter titles. It is a diagnostic of whether the new operating system is actually running. It will probe your daily architecture, your environmental inputs, your emotional relationship with abundance, and your commitment to the silent, unglamorous work of compounding.
              </div>

              <h3>PILLAR 1: The Silent Builder’s Identity</h3>
              <p>In a culture that rewards performance, choosing to build something real is a profoundly lonely decision. Part Two demanded that you kill the performer and birth the builder.</p>
              <p>The performer needs an audience. The builder needs a blueprint. The performer optimizes for visibility; the builder optimizes for substance. The performer burns out chasing validation; the builder compounds quietly because the work itself is the reward. This is not a personality trait. It is a deliberate identity shift. You stop describing yourself as someone <em>trying</em> to succeed, and you begin operating as someone who <em>builds systems</em>.</p>

              <h3>PILLAR 2: The Architecture of Delayed Gratification & Compound Thinking</h3>
              <p>Willpower is a finite resource. The noise was engineered to defeat it. The wealthy builder does not rely on motivation; they rely on architecture.</p>
              <p>Part Two replaced vague ambition with two precise tools: <strong>The Vision Anchor</strong> and <strong>The Milestone Map</strong>. A Vision Anchor is not a mood board. It is a specific, written, emotionally charged description of the future you are building toward, read deliberately when short-term temptation strikes. A Milestone Map breaks that vision into compoundable, non-negotiable checkpoints. Delayed gratification stops being painful when the future reward is so vivid and mathematically clear that sacrificing immediate dopamine becomes the only logical choice.</p>

              <h3>PILLAR 3: Reprogramming the Belief System</h3>
              <p>You identified your money wounds in Part One. Part Two handed you the scalpel: <strong>The Belief Audit</strong>.</p>
              <p>The process is surgical: List five beliefs you currently operate from. Rate each one from 1 to 10 on how empowering it is. For any belief rated below 7, write its exact opposite. Then, gather three pieces of undeniable, real-world evidence that support the new, empowering belief. Interrogate the origin of the old belief. Was it complete evidence, or the limited perspective of a child in a survival situation? Read the new belief aloud every morning for thirty days until the nervous system accepts it as truth. Beliefs are not discovered; they are installed through repetition and evidence.</p>

              <h3>PILLAR 4: Environment Is Destiny</h3>
              <p>Your environment is not fixed. It is designed. And you are the architect.</p>
              <p>Part Two’s most critical practical exercise was <strong>The Environmental Audit</strong>. You listed your five most regular human contacts and wrote honestly what each one is teaching you through their presence. You listed your five most-used media inputs and wrote what worldview each one is reinforcing. You identified two inputs from each category to reduce or eliminate, and two to increase. You audited the accounts that sell performance without substance. You changed the physical environment so your phone is not the last thing you see at night and the first thing you see in the morning. You understood that every input is either compounding toward the person you need to become, or eroding that person.</p>

              <h3>PILLAR 5: The Compound Runway & The Daily Operating System</h3>
              <p>Nothing done today is wasted. The Compound Effect is not a theory; it is the mathematics of legacy.</p>
              <p>Part Two demanded you calculate your <strong>Compound Runway</strong>. You projected what consistent investment in your primary skill, your savings, and two key relationships would produce by the time you are forty. You wrote the numbers. You wrote the names. You made the abstract mathematics of compounding real and personal to your specific situation. You also designed your <strong>Ideal Builder’s Day</strong>: a specific, non-negotiable daily architecture with three core actions, committed to for seven consecutive days before evaluation. The daily system is where the vision anchor meets the ground.</p>

              <h3>PILLAR 6: Training the Nervous System for Abundance</h3>
              <p>Wealth is not just a number in an account. It is an emotional signature.</p>
              <p>If your nervous system treats financial security, genuine authority, or large opportunity as foreign, it will engineer your return to the familiar comfort of lack. Part Two’s final installation was <strong>neurological training for abundance</strong>. You rehearsed the emotional reality of scale until your body stopped treating it as a threat. You studied the Four Elements of the Wealthy Aura: calm under pressure, deliberate stewardship, quiet authority, and expansive generosity. You learned that abundance must feel normal before it can be sustained. You do not pretend to have what you do not. You train your nervous system to be at ease with what you are becoming.</p>

              <div className="prep-final-charge">
                <h4>THE FINAL CHARGE: THE MIRROR AWAITS</h4>
                <p>Do not approach this as a checklist of concepts to memorize. Approach it as an operational audit of your new identity.</p>
                <p>If you read Part Two and kept your old habits, if you admired the frameworks but did not install them, this assessment will expose it. But if you have done the work—if you have audited your inputs, rewritten your beliefs, designed your daily architecture, calculated your runway, and trained your nervous system for scale—this assessment will be a confirmation. The moment you realize the new operating system is live. The foundation is poured. The scaffolding is up.</p>
              </div>
            </div>
          </div>
        )}

        {/* Part 3 Prep Material */}
        {part === 'part3' && (
          <div className="prep-content">
            <div className="status-badge-inline">
              <BookOpen size={14} style={{ marginRight: '6px' }} />
              Module Three Prep Material
            </div>
            
            <h1 className="prep-title">The Confirmation of The Build: Proving You Are the Architect</h1>
            <p className="prep-subtitle">The ground is cleared. The foundation is poured. Now, the blueprint goes on the table.</p>

            <div className="prep-body-text">
              <p>You have survived Part One. You dismantled the Noise, exposed the Theatre of Wealth, and excavated your Money Wounds. You have endured Part Two. You installed the Silent Builder’s identity, mastered the mathematics of compounding, and engineered your environment.</p>
              <p>But a cleared lot and a solid foundation do not build a skyscraper.</p>
              <p>Part Three was never about inspiration. It was about <strong>execution</strong>. It was about the physical construction of a legacy. We moved you from the internal architecture of the mind to the external architecture of the market. We handed you the counter-playbook of the entrepreneur, the financial mechanics of the wealthy, the leadership frameworks of the great, and the geopolitical reality of the African century.</p>
              
              <div className="prep-highlight-box">
                <strong>The Module Three Assessment:</strong> It is not a test of whether you can recite the six rules of the entrepreneur or draw the Golden Circle from memory. It is a diagnostic of your readiness to step into the arena. It will probe your understanding of zero-capital validation, your grasp of financial moats, your ability to transition from a doer to a leader, and your strategic alignment with the African continent.
              </div>

              <h3>PILLAR 1: The Zero-Capital Genesis & The Obsession Engine</h3>
              <p>The most common lie in the Nigerian entrepreneurial ecosystem is that you need capital to start. Part Three exposed this as a fundamental misunderstanding of what capital actually does. Capital allows you to buy solutions; the <em>absence</em> of capital forces you to develop capability. And capability, compounded over time, produces capital with a reliability that money invested without skill never matches.</p>
              <p>You were handed the <strong>Two-Hour Startup Test</strong> and the mandate to validate before you build. You learned that the most expensive mistake a founder makes is building a product before confirming the market will pay for it. You were given six zero-capital starting points, from service arbitrage to customer pre-funding, to prove that the only true barrier to entry is a lack of ingenuity.</p>
              <p>But finding the problem is only the beginning. Sustaining the effort through the inevitable years of silence and failure requires <strong>The Obsession Principle</strong>.</p>
              <p>Dreams are nearly universal; obsession is rare. Obsession is what happens when a dream stops being a pleasant possibility and becomes an unavoidable imperative. You studied the eight architects—Musk, Dangote, Bezos, Oprah, Zuckerberg, Buffett, Pabrai, and Thiel—not to idolize them, but to extract the pattern. None of them were optimizing for comfort. They were driven by physics, industrial patriotism, long-term thinking, pain, iteration, joy, mathematics, or secrets.</p>

              <h3>PILLAR 2: The Counter-Playbook & The Financial Architecture</h3>
              <p>Everything you were taught about business in the traditional system was designed for large, established companies playing on a large pitch. You are not. Part Three handed you the <strong>Six Rules That Break the Playbook</strong>: rejecting the core competency trap, putting problems before products, thinking narrow to win broad, using customer cash, borrowing assets, and seeking forgiveness rather than permission. These are not independent tactics; they are the unified mindset of the early-stage builder.</p>
              <p>Once the business is generating value, you must understand the <strong>Money Architecture</strong>. You learned Kiyosaki’s foundational distinction between assets and liabilities, and the <strong>Monopoly Formula</strong> of trading up from small income-generating assets to massive wealth. You learned the critical difference between good debt (which funds income-generating assets) and bad debt (which funds consumption).</p>
              <p>Furthermore, you learned that a business without a moat will eventually be competed into insignificance. You studied the four most powerful moats for the African builder: brand, network effects, switching costs, and cost advantages. You were introduced to the <strong>Business Model Canvas</strong>, the nine-box framework that forces you to see the complete logic of how your business creates and captures value.</p>

              <h3>PILLAR 3: The Leadership Crucible & The Golden Circle</h3>
              <p>There is a specific moment in the journey of every builder that is more dangerous than starting with nothing: the moment you can no longer build it alone. This is the transition from founder to CEO, from solopreneur to leader.</p>
              <p>Part Three exposed the <strong>Leader’s Crucible</strong>. You learned that the skills that make a great founder (personal execution) are often the opposite of the skills that make a great CEO (multiplying the capacity of others). You studied Ray Dalio’s <strong>Idea Meritocracy</strong>, where radical transparency and believability weighting replace corporate politics. You learned that hiring is the most important decision a leader makes, and that character must always precede capability. You understood the necessity of building systems that run without you through documentation, delegation, and genuine accountability.</p>
              <p>Simultaneously, you learned that a leader must communicate from the inside out. Simon Sinek’s <strong>Golden Circle</strong> revealed that people do not buy <em>what</em> you do; they buy <em>why</em> you do it. You learned the biology of the Why—how it speaks directly to the limbic system, the part of the brain that controls decision-making and trust. You studied the Law of Diffusion of Innovation, understanding that to cross the chasm from niche to mainstream, you must first capture the Innovators and Early Adopters who buy beliefs, not products.</p>

              <h3>PILLAR 4: The African Century & The Mandate to Stay</h3>
              <p>The final pillar of The Build is the macro-context. Part Three concluded with a devastatingly clear reality: Africa is the most significant economic opportunity of the twenty-first century.</p>
              <p>This is not optimism; it is data. Sixty percent of the world's uncultivated arable land. The largest reserves of critical minerals required for the global electrification. A population reaching two billion by 2050, with the largest working-age demographic on the planet.</p>
              <p>You learned what China understood before Africans did: the strategic power of showing up first with balance sheet support, infrastructure, and long-term commitment. You studied the African builders who already proved it is possible—Paystack, Flutterwave, Andela—who built billion-dollar valuations by solving specific, painful African problems. And you received the ultimate mandate: <strong>Stay and build here.</strong> The returns to building in Africa right now are asymmetrically large compared to mature, densely competed markets. The doctor, the engineer, the software engineer who stays to build the local infrastructure creates something that employs thousands and generates generational wealth, rather than just a higher personal salary in a foreign land.</p>

              <div className="prep-final-charge">
                <h4>THE FINAL CHARGE: THE BLUEPRINT IS IN YOUR HANDS</h4>
                <p>Do not approach this as a final exam for a course you are about to finish. Approach it as the final inspection before you are handed the keys to the construction site.</p>
                <p>If you read Part Three and treated it as a collection of interesting business stories, this assessment will expose it. It will show you that you still think you need a loan to start, that you still optimize for revenue instead of assets, that you still try to do everything yourself, and that you still look at Africa through the lens of scarcity rather than abundance.</p>
              </div>
            </div>
          </div>
        )}

        <hr className="prep-divider" />

        {/* Confirmation & CTA */}
        <div className="prep-confirmation-box">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={hasConfirmed}
              onChange={(e) => setHasConfirmed(e.target.checked)}
              className="checkbox-input"
            />
            <span className="checkbox-text">
              I confirm that I have fully read, digested, and completed the study of Part {partNumber} of <em>The Wealth Revolution</em> book and am ready to face the confirmation assessment mirror.
            </span>
          </label>

          <div className="prep-cta-container">
            {hasConfirmed ? (
              <Link href={`/training/${part}/exam`} className="btn btn-primary btn-large cta-btn">
                Begin Part {partNumber} Assessment (45 mins)
                <ArrowRight size={18} style={{ marginLeft: '8px' }} />
              </Link>
            ) : (
              <button className="btn btn-disabled btn-large cta-btn" disabled>
                Confirm you have completed reading to unlock assessment
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
