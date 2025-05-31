import React, { useState, useRef } from "react";
import "./Quiz.css";

// --- Sample Quiz Data grouped by difficulty/age ---
const QUIZ_BANK = [
  {
    level: "Easy (Age 6-8)",
    questions: [
      {
        question: "What is a piggy bank used for?",
        choices: ["To store money", "To buy toys", "To eat food", "To play games"],
        answer: 0,
        reward: 1,
      },
      {
        question: "What does it mean to save money?",
        choices: [
          "Keep money for later",
          "Spend everything",
          "Give money to friends",
          "Throw coins away",
        ],
        answer: 0,
        reward: 1,
      },
      {
        question: "Which one is a coin?",
        choices: ["🍕", "💰", "🏀", "🍎"],
        answer: 1,
        reward: 1,
      },
      {
        question: "If you have 2 dollars and get 1 more, how much do you have?",
        choices: ["Three dollars", "Five dollars", "One dollar", "Ten dollars"],
        answer: 0,
        reward: 1,
      },
    ],
  },
  {
    level: "Medium (Age 9-12)",
    questions: [
      {
        question: "Why should you set a savings goal?",
        choices: [
          "To buy what you want later",
          "To spend quickly",
          "To forget your money",
          "No reason",
        ],
        answer: 0,
        reward: 2,
      },
      {
        question: "If an item costs $5 and you have $3, what can you do?",
        choices: [
          "Save more",
          "Steal it",
          "Buy it anyway",
          "Throw coins away",
        ],
        answer: 0,
        reward: 2,
      },
      {
        question: "Which is a good way to track your savings?",
        choices: [
          "Using a notebook/app",
          "Guessing the amount",
          "Never checking",
          "Burying it outside",
        ],
        answer: 0,
        reward: 2,
      },
      {
        question: "If you earn $10 and save half, how much do you save?",
        choices: ["$15", "$5", "$2", "$10"],
        answer: 1,
        reward: 2,
      },
    ],
  },
  {
    level: "Challenging (Age 13+)",
    questions: [
      {
        question: "What does 'interest' mean in a savings account?",
        choices: [
          "Extra money earned over time",
          "A penalty for saving",
          "Buying interesting things",
          "Fees you pay",
        ],
        answer: 0,
        reward: 3,
      },
      {
        question: "Why is budgeting important?",
        choices: [
          "It helps manage spending and savings",
          "So you can shop more",
          "It wastes your time",
          "So you never save",
        ],
        answer: 0,
        reward: 3,
      },
      {
        question: "If you set a goal to save $60 in 3 months, how much should you save each month?",
        choices: [
          "$25",
          "$15",
          "$20",
          "$10",
        ],
        answer: 2,
        reward: 3,
      },
      {
        question: "What is a safe way to store money?",
        choices: [
          "Piggy bank/app",
          "Leaving it in public",
          "Giving to strangers",
          "Forgetting about it",
        ],
        answer: 0,
        reward: 3,
      },
    ],
  },
];

// Sound assets (simple web-compatible alternatives for demo)
const CORRECT_SOUND =
  "data:audio/wav;base64,UklGRhwAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YcAA" +
  "AAAgAAABAgAABAAAEQAAECAAABAgAABCAAAQIAAAQAAAEAAAECAAAEIAABAgAABAAABAAABIAAAQA="; // Soft beep
const INCORRECT_SOUND =
  "data:audio/wav;base64,UklGRhQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YWMQ" +
  "AAAAAAAAAgYAAgAAAAECAAAEIAA="; // Lower buzz

// Confetti Emoji Set
const CONFETTI_EMOJI = ["🎉", "🏅", "👏", "🎊", "💸"];

// --- Play sound utility ---
function playSound(soundURI) {
  const audio = new window.Audio(soundURI);
  audio.volume = 0.3;
  audio.play();
}

/**
 * Learning Zone Quiz Main Component
 * - Multiple choice quiz cards
 * - Difficulty/age selection
 * - Playful animations and sounds for feedback
 * - Simple reward system for correct answers
 */
// PUBLIC_INTERFACE
function Quiz() {
  const [difficultyIdx, setDifficultyIdx] = useState(0);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [rewardBanner, setRewardBanner] = useState("");
  const [answered, setAnswered] = useState([]);
  const [confetti, setConfetti] = useState(false);

  // Reset refs
  const animationTimeout = useRef();

  const { level, questions } = QUIZ_BANK[difficultyIdx];
  const currentQ = questions[currentIdx];

  // PUBLIC_INTERFACE
  /** Called when changing level */
  function handleChangeLevel(e) {
    setDifficultyIdx(Number(e.target.value));
    setCurrentIdx(0);
    setShowFeedback(false);
    setSelected(null);
    setRewardBanner("");
    setAnswered([]);
    setConfetti(false);
  }

  // PUBLIC_INTERFACE
  /** Handles when choice is selected */
  function handleChoice(idx) {
    if (showFeedback || selected !== null) return;
    setSelected(idx);
    setShowFeedback(true);

    if (idx === currentQ.answer) {
      playSound(CORRECT_SOUND);
      setScore((sc) => sc + currentQ.reward);
      setRewardBanner(
        `${CONFETTI_EMOJI[Math.floor(Math.random() * CONFETTI_EMOJI.length)]} +${currentQ.reward} star${currentQ.reward > 1 ? 's' : ''}!`
      );
      setConfetti(true);
      // Auto hide banner after short time
      clearTimeout(animationTimeout.current);
      animationTimeout.current = setTimeout(() => setRewardBanner(""), 1600);
    } else {
      playSound(INCORRECT_SOUND);
    }
  }

  // PUBLIC_INTERFACE
  /** Moves to next question or finishes quiz */
  function handleNext() {
    setAnswered((arr) => [...arr, { idx: currentIdx, correct: selected === currentQ.answer }]);
    setSelected(null);
    setShowFeedback(false);
    setConfetti(false);
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1);
    } 
  }

  // PUBLIC_INTERFACE
  /** Restart quiz from beginning */
  function handleRestart() {
    setCurrentIdx(0);
    setShowFeedback(false);
    setSelected(null);
    setScore(0);
    setRewardBanner("");
    setAnswered([]);
    setConfetti(false);
  }

  // --- Render
  return (
    <div className="quiz-zone__container">
      <div className="quiz-zone__header">
        <h2 style={{ color: "#FF8A65", margin: 0 }}>
          <span role="img" aria-label="quiz">❓</span> Learning Zone Quiz
        </h2>
        <span style={{fontWeight: 500, color: "#4FC3F7"}}>★ {score}</span>
      </div>

      <div className="quiz-zone__difficulty">
        <label htmlFor="difficulty" style={{color: "#FFD54F", marginRight: 6, fontWeight: 550}}>Level:</label>
        <select
          id="difficulty"
          value={difficultyIdx}
          onChange={handleChangeLevel}
          style={{ padding: 5, borderRadius: 7, background: "#23232b", color: "#fff", fontWeight: 500 }}
        >
          {QUIZ_BANK.map((qz, i) => (
            <option value={i} key={qz.level}>{qz.level}</option>
          ))}
        </select>
      </div>

      <div className="quiz-zone__main">
        {/* Progress */}
        <div className="quiz-zone__progress">
          Question {currentIdx + 1} / {questions.length}
        </div>

        {/* Quiz Card */}
        <div className="quiz-card">
          <div className="quiz-card__question">{currentQ.question}</div>
          <div className="quiz-card__choices">
            {currentQ.choices.map((ch, idx) => (
              <button
                key={idx}
                className={
                  "quiz-choice-btn" +
                  (selected !== null
                    ? idx === currentQ.answer
                      ? " correct"
                      : selected === idx
                      ? " incorrect"
                      : ""
                    : "")
                }
                disabled={selected !== null}
                onClick={() => handleChoice(idx)}
                aria-label={ch}
              >
                {ch}
              </button>
            ))}
          </div>
          {/* Feedback/Animation */}
          {showFeedback && selected !== null && (
            <div
              className={
                "quiz-card__feedback" +
                (selected === currentQ.answer ? "" : " incorrect")
              }
              aria-live="polite"
            >
              {selected === currentQ.answer ? "Correct! Great job!" : "Oops! Try the next one!"}
              {confetti && (
                <span style={{marginLeft: 8, fontSize: "1.2em"}}>{CONFETTI_EMOJI[Math.floor(Math.random()*CONFETTI_EMOJI.length)]}</span>
              )}
            </div>
          )}
        </div>

        {/* Reward Banner */}
        {rewardBanner && (
          <div className="quiz-zone__reward-banner" aria-live="polite">{rewardBanner}</div>
        )}

        {/* Next Button/Finish */}
        <div className="quiz-zone__controls">
          {currentIdx + 1 < questions.length ? (
            showFeedback && (
              <button
                className="quiz-zone__next-btn"
                onClick={handleNext}
                aria-label="Next Question"
              >
                Next →
              </button>
            )
          ) : (
            showFeedback && (
              <button
                className="quiz-zone__next-btn"
                onClick={handleRestart}
                aria-label="Finish Quiz"
              >
                Play Again
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Quiz;
