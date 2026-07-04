"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { parsePart1Questions } from '../../questions/part1';
import { parsePart2Questions } from '../../questions/part2';
import { ShieldCheck, AlertCircle, Clock, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import './trainingExam.css';

export default function TrainingExamClient({ part, candidate }) {
  const router = useRouter();
  const partNumber = part === 'part1' ? 1 : part === 'part2' ? 2 : 3;
  const partTitle = part === 'part1' 
    ? 'Part One: The Detox Confirmation' 
    : part === 'part2' 
    ? 'Part Two: The Rewire Assessment' 
    : 'Part Three: The Launch Assessment';

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(2700); // 45 minutes = 2700 seconds
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Results view states
  const [result, setResult] = useState(null); // { score, passed, correctCount, totalQuestions }

  useEffect(() => {
    // Load appropriate questions set
    if (part === 'part1') {
      setQuestions(parsePart1Questions());
    } else if (part === 'part2') {
      setQuestions(parsePart2Questions());
    } else {
      // Mock questions for development of Part 3
      const mockSet = Array.from({ length: 5 }, (_, i) => ({
        id: i + 1,
        question: `Sample Assessment Question ${i + 1} for Part ${partNumber}. (Placeholder until official copy is loaded)`,
        options: {
          A: 'Option A: The systems-based builder response',
          B: 'Option B: The employee matrix response',
          C: 'Option C: The shortcut noise response',
          D: 'Option D: The theatrical wealth response'
        },
        answer: 'A'
      }));
      setQuestions(mockSet);
    }
  }, [part, partNumber]);

  // Timer loop
  useEffect(() => {
    if (result) return; // Stop timer if exam is submitted

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
  }, [result]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleOptionSelect = (questionId, optionKey) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionKey
    }));
    setErrorMsg('');
  };

  const scrollToQuestion = (id) => {
    const el = document.getElementById(`question-${id}`);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 160;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const allAnswered = Object.keys(answers).length === questions.length;

  const handleSubmitAttempt = () => {
    if (!allAnswered) {
      setErrorMsg(`All questions are required. Please answer all ${questions.length} questions before submitting.`);
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
    setErrorMsg('');

    try {
      const response = await fetch('/api/training/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          part: partNumber,
          answers: answers
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit answers.');
      }

      setResult({
        score: data.score,
        passed: data.passed,
        correctCount: data.correctCount,
        totalQuestions: data.totalQuestions
      });
      window.scrollTo({ top: 0 });

    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Connection error. Please try submitting again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setTimeLeft(2700);
    setResult(null);
    setErrorMsg('');
  };

  if (questions.length === 0) {
    return <div className="exam-loading">Initializing Assessment Portal...</div>;
  }

  // RENDER RESULTS VIEW
  if (result) {
    return (
      <div className="result-view-container">
        <div className="result-card">
          {result.passed ? (
            <div className="result-badge-block pass">
              <ShieldCheck size={48} />
              <h2>Detox Passed & Confirmed</h2>
              <p className="score-display">Score: {result.score}% ({result.correctCount}/{result.totalQuestions})</p>
            </div>
          ) : (
            <div className="result-badge-block fail">
              <AlertCircle size={48} />
              <h2>Clearance Denied</h2>
              <p className="score-display">Score: {result.score}% ({result.correctCount}/{result.totalQuestions})</p>
            </div>
          )}

          <hr className="divider" />

          <div className="result-feedback">
            {result.passed ? (
              <div>
                <p className="feedback-text">
                  Congratulations. You have demonstrated alignment with the core frameworks of <strong>Part {partNumber}</strong>. The ground has been successfully cleared. Your score has been logged in the portal.
                </p>
                <div className="next-action-box">
                  <Link href="/dashboard" className="btn btn-primary btn-large w-full">
                    Return to User Dashboard
                    <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <p className="feedback-text">
                  The mirror does not lie. Your score shows that some remnants of the old programming or distraction noise are still operating. To proceed effectively, we demand that you revisit the chapters of Part {partNumber} in the book, inspect your money wounds, and retake the assessment.
                </p>
                <p className="requirement-note">Required pass mark is 40%.</p>
                <div className="next-action-box button-group-vertical">
                  <button onClick={handleRestart} className="btn btn-primary btn-large w-full">
                    Retake Assessment immediately (Unlimited Retakes)
                  </button>
                  <Link href="/dashboard" className="btn btn-secondary btn-large w-full mt-3">
                    Return to Dashboard to Review Material
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // RENDER TEST TAKING SCREEN
  return (
    <div className="training-exam-container">
      
      {/* Sticky Header */}
      <div className="exam-sticky-header">
        <div className="exam-header-top">
          <div>
            <span className="exam-part-label">BOOK TRAINING SEQUENCE</span>
            <h1 className="exam-title">{partTitle}</h1>
          </div>
          <div className="timer-box">
            <span className="timer-label">TIME REMAINING</span>
            <span className="timer-value">{formatTime(timeLeft)}</span>
          </div>
        </div>

        <div className="exam-grid-container">
          <p className="grid-instructions">
            Questions: {questions.length} | <span className="text-wine">Unanswered</span> / <span className="text-green">Answered</span>
          </p>
          <div className="question-grid">
            {questions.map((q, index) => (
              <button
                key={q.id}
                onClick={() => scrollToQuestion(q.id)}
                className={`grid-item ${answers[q.id] ? 'answered' : 'unanswered'}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="exam-content">
        {errorMsg && (
          <div className="alert error mb-4">
            <strong>NOTICE:</strong> {errorMsg}
          </div>
        )}

        <div className="questions-list">
          {questions.map((q, index) => {
            return (
              <div key={q.id} id={`question-${q.id}`} className="question-block">
                <h4 className="question-text">
                  <span className="question-number">{index + 1}.</span> {q.question}
                </h4>
                <div className="options-list">
                  {['A', 'B', 'C', 'D'].map((optKey) => {
                    // Check if option text exists (e.g. Q26 has only A and B or A/B/C)
                    if (!q.options[optKey]) return null;

                    return (
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
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="submit-section mt-8 pt-4 border-top">
          {errorMsg && <p className="alert error mb-4">{errorMsg}</p>}
          <button 
            className={`btn btn-large ${allAnswered && !isSubmitting ? 'btn-primary' : 'btn-disabled'}`}
            onClick={handleSubmitAttempt}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting Answers...' : 'Submit Assessment'}
          </button>
        </div>
      </div>

      {/* CONFIRMATION MODAL */}
      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title text-wine">Evaluate Assessment?</h2>
            <p className="modal-text">You are about to submit your confirmation test. Once submitted, your answers will be scored and logged.</p>
            <p className="modal-text font-bold">Are you ready to submit?</p>
            <div className="modal-actions mt-4">
              <button className="btn btn-secondary" onClick={() => setShowConfirm(false)}>Review Answers</button>
              <button className="btn btn-primary" onClick={confirmSubmit}>Proceed & Submit</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
