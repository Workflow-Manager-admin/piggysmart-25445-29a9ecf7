import React from "react";
import colors from "../theme/colors";
import "./Sidebar.css";

/**
 * Sidebar - For mobile navigation drawer or as secondary nav on tablets/desktops.
 * Not shown by default, placeholder for future expansion.
 */
// PUBLIC_INTERFACE
function Sidebar() {
  return (
    <aside className="ps-sidebar">
      {/* Placeholder for sidebar nav links */}
      <nav>
        <ul className="ps-sidebar__list">
          <li>
            <button className="ps-sidebar__icon-btn" aria-label="Home">
              <span role="img" aria-label="Home">🏠</span> Home
            </button>
          </li>
          <li>
            <button className="ps-sidebar__icon-btn" aria-label="Goals">
              <span role="img" aria-label="Targets">🎯</span> Goals
            </button>
          </li>
          <li>
            <button className="ps-sidebar__icon-btn" aria-label="Quizzes">
              <span role="img" aria-label="Quiz">❓</span> Quizzes
            </button>
          </li>
          <li>
            <button className="ps-sidebar__icon-btn" aria-label="Rewards">
              <span role="img" aria-label="Rewards">🏅</span> Rewards
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
