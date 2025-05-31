import React, { useState } from "react";
import colors from "../../theme/colors";

// PUBLIC_INTERFACE
/**
 * Dashboard - Animated Piggy Bank Section for PiggySmart
 * Shows a large piggy bank SVG, animated coin drop, "Add Money" button, and total savings/progress
 */
function Dashboard({ initialSavings = 0, savingsGoal = 100 }) {
  const [savings, setSavings] = useState(initialSavings);
  const [isDroppingCoin, setIsDroppingCoin] = useState(false);
  const [lastDropAmount, setLastDropAmount] = useState(1); // Default $1 per tap for demonstration

  // PUBLIC_INTERFACE
  /**
   * Handles the "Add Money" tap — trigger animation and update savings after animation completes.
   */
  const handleAddMoney = () => {
    if (isDroppingCoin) return; // Prevent overlapping coins
    setLastDropAmount(1); // For now, always $1
    setIsDroppingCoin(true);
    // Wait short time for animation, then add
    setTimeout(() => {
      setSavings((prev) => prev + 1);
      setIsDroppingCoin(false);
    }, 800); // Matches CSS animation duration
  };

  const percent = Math.min(100, Math.round((savings / savingsGoal) * 100));

  return (
    <div className="piggy-dashboard__container">
      <div className="piggy-dashboard__piggy-zone">
        {/* Piggy SVG with animated coin */}
        <div className="piggy-dashboard__piggy-bank">
          <PiggyBankSVG />
          {isDroppingCoin && (
            <CoinDropAnimation key={Math.random()} />
          )}
        </div>
      </div>
      <div className="piggy-dashboard__info">
        <div className="piggy-dashboard__progress-bar">
          <div
            className="piggy-dashboard__progress-fill"
            style={{
              width: percent + "%",
              background: "linear-gradient(90deg, #FFD54F 70%, #FF8A65 100%)",
            }}
          />
        </div>
        <div className="piggy-dashboard__amount-section">
          <span className="piggy-dashboard__amount">
            ${savings}
          </span>
          <span className="piggy-dashboard__goal">
            / ${savingsGoal}
          </span>
        </div>
        <button
          className="piggy-dashboard__add-btn"
          onClick={handleAddMoney}
          aria-label="Add $1 to piggy bank"
          disabled={isDroppingCoin}
        >
          <span role="img" aria-label="Coin" style={{ marginRight: 8 }}>
            🪙
          </span>
          Add $1
        </button>
        {percent === 100 && (
          <div className="piggy-dashboard__congrats" aria-live="polite">
            🎉 Goal achieved! Well done! 🎉
          </div>
        )}
      </div>
    </div>
  );
}

// --- SVG Piggy Bank with animated slot highlight ---
function PiggyBankSVG() {
  // Optionally animate the slot to highlight when dropping coin
  return (
    <svg
      className="piggy-svg"
      width="165"
      height="110"
      viewBox="0 0 165 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Body */}
      <ellipse cx="82.5" cy="65" rx="62" ry="40" fill="#FFD54F" stroke="#FF8A65" strokeWidth="3"/>
      {/* Ear */}
      <ellipse cx="36" cy="33" rx="11.2" ry="6.5" fill="#FFD54F" stroke="#FF8A65" strokeWidth="2"/>
      {/* Nose */}
      <ellipse cx="145" cy="70" rx="15" ry="10" fill="#FFD54F" stroke="#FF8A65" strokeWidth="3"/>
      <ellipse cx="152" cy="70" rx="2.8" ry="2" fill="#FF8A65"/>
      <ellipse cx="139" cy="70" rx="2.8" ry="2" fill="#FF8A65"/>
      {/* Eyes */}
      <ellipse cx="105" cy="60" rx="4.5" ry="5" fill="#fff"/>
      <ellipse cx="105" cy="62" rx="2.2" ry="2.8" fill="#231F20"/>
      {/* Slot */}
      <rect x="70" y="42" width="28" height="7" rx="4" fill="#23232b" />
      {/* Smile */}
      <path d="M115 85 Q100 97, 85 87" stroke="#FF8A65" strokeWidth="2" fill="none"/>
      {/* Legs */}
      <rect x="47" y="100" width="7" height="10" rx="2.5" fill="#FFD54F" stroke="#FF8A65" strokeWidth="2"/>
      <rect x="108" y="100" width="7" height="10" rx="2.5" fill="#FFD54F" stroke="#FF8A65" strokeWidth="2"/>
    </svg>
  );
}

// --- Coin Drop Animation ---
function CoinDropAnimation() {
  return (
    <div className="piggy-dashboard__coin-drop">
      {/* Use an emoji, or switch to SVG for enhanced detail */}
      <span role="img" aria-label="Coin" className="piggy-dashboard__coin-emoji">🪙</span>
    </div>
  );
}

export default Dashboard;
