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

        {/* Part 2 Prep Material Placeholder */}
        {part === 'part2' && (
          <div className="prep-content">
            <div className="status-badge-inline">
              <BookOpen size={14} style={{ marginRight: '6px' }} />
              Module Two Prep Material
            </div>
            
            <h1 className="prep-title">Part Two: The Rewire</h1>
            <p className="prep-subtitle">Reconstructing the Mindset Matrix.</p>

            <div className="prep-body-text">
              <p>Welcome to Module Two. Now that you have completed the Detox in Part One, your mental slate is clear. We are ready to begin the **Rewire**.</p>
              <p>This module focuses on rebuilding your financial intelligence and coding your new system. The content for this module is currently being finalized by the team and will be shared soon.</p>
              <div className="prep-highlight-box">
                <strong>Training Assessment:</strong> The assessment for Part Two is available. You can confirm you have read the preparatory content and test your alignment now.
              </div>
            </div>
          </div>
        )}

        {/* Part 3 Prep Material Placeholder */}
        {part === 'part3' && (
          <div className="prep-content">
            <div className="status-badge-inline">
              <BookOpen size={14} style={{ marginRight: '6px' }} />
              Module Three Prep Material
            </div>
            
            <h1 className="prep-title">Part Three: The Launch</h1>
            <p className="prep-subtitle">Building Systems and Elevating Capital.</p>

            <div className="prep-body-text">
              <p>Welcome to Module Three. The final pillar of <em>The Wealth Revolution</em>. Having cleared the ground and rewired your mindset, we now focus on scaling real assets and generating leverage.</p>
              <p>The core training manual copy for Part Three is currently being prepared. You can start the assessment below once you are ready.</p>
              <div className="prep-highlight-box">
                <strong>Training Assessment:</strong> The assessment for Part Three is available. Pass this assessment to complete the sequence and qualify for graduation.
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
