import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import SavingsGoals from './features/savingsGoals/SavingsGoals';
import './features/savingsGoals/SavingsGoals.css';
import Quiz from './features/quizzes/Quiz';
import './features/quizzes/Quiz.css';
// import Sidebar from './components/Sidebar'; // Enable if using sidebar navigation

/**
 * PiggySmart App Root
 * Sets up main theming, navbar, and page container for navigation/content.
 */
// PUBLIC_INTERFACE
function App() {
  // Main view: "goals" | "quiz" (optionally add others like "rewards" later)
  const [mainView, setMainView] = useState("goals");

  // Public interface for navbar navigation event
  function handleNav(view) {
    setMainView(view);
  }

  return (
    <div className="app piggy-dark-theme">
      <Navbar onNavigate={handleNav} activeView={mainView} />
      {/* <Sidebar /> */}
      {/* Main Content Layout */}
      <main className="ps-main-content">
        <div className="ps-center-content">
          {mainView === "goals" && <SavingsGoals />}
          {mainView === "quiz" && <Quiz />}
          {/* (Other views: Rewards, Dashboard, etc. to be integrated) */}
        </div>
      </main>
    </div>
  );
}

export default App;