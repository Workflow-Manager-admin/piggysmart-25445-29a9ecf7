import React from "react";
import colors from "../theme/colors";
import "./Navbar.css";

/**
 * Navbar - Primary top navigation for PiggySmart.
 * Shows logo, main navigation icons (placeholders), and a parent mode toggle.
 */
// PUBLIC_INTERFACE
function Navbar() {
  return (
    <nav className="ps-navbar">
      <div className="ps-navbar__logo" role="banner" style={{ color: colors.primary }}>
        <span role="img" aria-label="piggy" className="ps-navbar__logo-symbol" style={{ fontSize: 28 }}>
          🐷
        </span>
        PiggySmart
      </div>
      <div className="ps-navbar__links">
        <button className="ps-navbar__icon-btn" aria-label="Home">
          <span role="img" aria-label="Home">🏠</span>
        </button>
        <button className="ps-navbar__icon-btn" aria-label="Goals">
          <span role="img" aria-label="Targets">🎯</span>
        </button>
        <button className="ps-navbar__icon-btn" aria-label="Quizzes">
          <span role="img" aria-label="Quiz">❓</span>
        </button>
        <button className="ps-navbar__icon-btn" aria-label="Rewards">
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
