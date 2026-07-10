"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { parseQuestions } from './questionsData';
import './exam.css';

export default function ExamClient() {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(9000); // 2 hours 30 mins = 9000 seconds
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [candidateEmail, setCandidateEmail] = useState("");
  const [isUnauthorized, setIsUnauthorized] = useState(false);

  useEffect(() => {
    setQuestions(parseQuestions());
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleOptionSelect = (questionId, optionKey) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionKey
    }));
    setErrorMsg(""); // Clear error if any
  };

  const scrollToQuestion = (id) => {
    const el = document.getElementById(`question-${id}`);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 180; // offset for sticky header
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const allAnswered = Object.keys(answers).length === 100;

  const handleSubmitAttempt = () => {
    if (!allAnswered) {
      setErrorMsg("All questions are required to be answered. Please check the grid above for unanswered questions (Red).");
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setShowConfirm(true);
  };

  const handleAutoSubmit = () => {
    submitExamPayload();
  };

  const confirmSubmit = () => {
    setShowConfirm(false);
    submitExamPayload();
  };

  const submitExamPayload = async () => {
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const response = await fetch('/api/submit-exam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: answers
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit examination.");
      }

      if (data.passed) {
        // Success
        router.push(`/result/success?score=${data.score}`);
      } else {
        // Failed
        if (data.attemptsRemaining > 0) {
          router.push(`/result/retry?score=${data.score}&remaining=${data.attemptsRemaining}`);
        } else {
          router.push(`/result/locked?score=${data.score}`);
        }
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "A network error occurred. Your answers were not lost. Please try submitting again.");
      setIsSubmitting(false);
    }
  };



  if (questions.length === 0) return <div className="exam-loading">Initializing Assessment Architecture...</div>;

  return (
    <div className="exam-container">
      
      {/* CONSTANT STICKY HEADER */}
      <div className="exam-sticky-header">
        <div className="exam-header-top">
          <h1 className="exam-title">FoxRevo Mindset Alignment Audit</h1>
          <div className="timer-box">
            <span className="timer-label">TIME REMAINING</span>
            <span className="timer-value">{formatTime(timeLeft)}</span>
          </div>
        </div>

        <div className="exam-grid-container">
          <p className="grid-instructions">Click a number to navigate. <span className="text-wine">Red = Unanswered</span> | <span className="text-green">Green = Answered</span></p>
          <div className="question-grid">
            {Array.from({ length: 100 }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => scrollToQuestion(num)}
                className={`grid-item ${answers[num] ? 'answered' : 'unanswered'}`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="exam-content">
        {errorMsg && (
          <div className="ui-notice-box urgent-notice mb-4">
            <strong>NOTICE:</strong> {errorMsg}
          </div>
        )}

        <div className="questions-list">
          {questions.map((q) => {
            // Render specific sections before certain questions
            let sectionHeader = null;
            if (q.id === 26) {
              sectionHeader = (
                <div className="section-header">
                  <h3>SECTION B: COMPREHENSION PASSAGE</h3>
                  <p className="italic text-secondary mt-2 mb-4">Read the following passage carefully and answer the questions that follow. The passage portrays the internal architecture of a builder.</p>
                  <div className="passage-box">
                    <h4>Passage: The Architect of the Quiet Room</h4>
                    <p>In the heart of a city that never stopped shouting, a young man named Obi sat in a room devoid of applause. Outside his window, the skyline was a monument to the performance of success: rented supercars idling in traffic, influencers broadcasting their manufactured joy, and the relentless, algorithmic hum of a generation optimizing for visibility. Obi's peers had long ago surrendered to the dopamine architecture of the noise. They measured their worth in the fleeting currency of likes and the temporary validation of strangers. But Obi was haunted by a different ghost. Years ago, as a child, he had spent thousands of hours in the quiet dark, not watching movies, but dismantling broken mechanical clocks, obsessed with the invisible gears that dictated the flow of time. His family had called it a waste. The streets had called it madness. Yet, in the silence of his room, Obi realized that his superpower was not in the loud consumption of the world, but in the silent understanding of its hidden systems. He understood that to build a legacy, one must first survive the death of their need for an audience. He chose the mathematics of the long game, accepting that the soil of his mind needed years of dark, unglamorous preparation before anything of value could break the surface. He was no longer a consumer of the city's noise; he was the architect of his own quiet revolution.</p>
                  </div>
                </div>
              );
            } else if (q.id === 51) {
              sectionHeader = (
                <div className="section-header mt-8">
                  <h3>SECTION C: THE ARTICLE ("The Syllabus of the Cage")</h3>
                  <p className="italic text-secondary mt-2">Based on the editorial article exploring the educational system, the paycheck trap, the superpower of obsession, and the mathematics of rebellion.</p>
                </div>
              );
            }

            return (
              <React.Fragment key={q.id}>
                {sectionHeader}
                <div id={`question-${q.id}`} className="question-block">
                  <h4 className="question-text">
                    <span className="question-number">{q.id}.</span> {q.question}
                  </h4>
                  <div className="options-list">
                    {['A', 'B', 'C', 'D'].map((optKey) => (
                      <label 
                        key={optKey} 
                        className={`option-label ${answers[q.id] === optKey ? 'selected' : ''}`}
                      >
                        <input
                          type="radio"
                          name={`question-${q.id}`}
                          value={optKey}
                          checked={answers[q.id] === optKey}
                          onChange={() => handleOptionSelect(q.id, optKey)}
                          className="hidden-radio"
                        />
                        <span className="option-letter">{optKey}</span>
                        <span className="option-text">{q.options[optKey]}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>

        <div className="submit-section mt-8 pt-4 border-top">
          {errorMsg && <p className="text-wine font-bold mb-4">{errorMsg}</p>}
          <button 
            className={`btn btn-large ${allAnswered && !isSubmitting ? 'btn-primary' : 'btn-disabled'}`}
            onClick={handleSubmitAttempt}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Evaluating Alignment...' : 'Submit Audit Answers'}
          </button>
        </div>
      </div>

      {/* CONFIRMATION MODAL */}
      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title text-wine">Final Confirmation</h2>
            <p className="modal-text">You are about to submit your Mindset Alignment Audit. Once submitted, your answers will be sealed and evaluated by the alignment team.</p>
            <p className="modal-text font-bold">Are you absolutely sure you want to proceed?</p>
            <div className="modal-actions mt-4">
              <button className="btn btn-secondary" onClick={() => setShowConfirm(false)}>Cancel & Review</button>
              <button className="btn btn-primary" onClick={confirmSubmit}>Proceed & Submit</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
