import React from "react";
import colors from "../theme/colors";
import "./Navbar.css";

/**
 * Navbar - Primary top navigation for PiggySmart.
 * Shows logo, main navigation icons (placeholders), and a parent mode toggle.
 * Props:
 *   onNavigate: function(viewName: string) => void
 *   activeView: "goals"|"quiz"|...
 */
// PUBLIC_INTERFACE
function Navbar({ onNavigate, activeView }) {
  return (
    <nav className="ps-navbar">
      <div className="ps-navbar__logo" role="banner" style={{ color: colors.primary, cursor: "pointer" }} onClick={() => onNavigate && onNavigate("goals")}>
        <span role="img" aria-label="piggy" className="ps-navbar__logo-symbol" style={{ fontSize: 28 }}>
          🐷
        </span>
        PiggySmart
      </div>
      <div className="ps-navbar__links">
        <button
          className="ps-navbar__icon-btn"
          aria-label="Home"
          onClick={() => onNavigate && onNavigate("goals")}
          style={activeView === "goals" ? { background: "#FFD54F33" } : {}}
        >
          <span role="img" aria-label="Home">🏠</span>
        </button>
        <button
          className="ps-navbar__icon-btn"
          aria-label="Goals"
          onClick={() => onNavigate && onNavigate("goals")}
          style={activeView === "goals" ? { background: "#FFD54F33" } : {}}
        >
          <span role="img" aria-label="Targets">🎯</span>
        </button>
        <button
          className="ps-navbar__icon-btn"
          aria-label="Quizzes"
          onClick={() => onNavigate && onNavigate("quiz")}
          style={activeView === "quiz" ? { background: "#81C78444", color: "#FFD54F" } : {}}
        >
          <span role="img" aria-label="Quiz">❓</span>
        </button>
        <button
          className="ps-navbar__icon-btn"
          aria-label="Rewards"
          onClick={() => onNavigate && onNavigate("rewards")}
          style={activeView === "rewards" ? { background: "#FFD54F44", color: "#81C784" } : {}}
        >
          <span role="img" aria-label="Rewards">🏅</span>
        </button>
      </div>
      <button className="ps-navbar__parent-toggle" aria-label="Parent Mode">
        <span role="img" aria-label="Parent">👨‍👩‍👧‍👦</span>
      </button>
    </nav>
  );
}

export default Navbar;
