import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import SavingsGoals from './features/savingsGoals/SavingsGoals';
import './features/savingsGoals/SavingsGoals.css';
// import Sidebar from './components/Sidebar'; // Enable if using sidebar navigation

/**
 * PiggySmart App Root
 * Sets up main theming, navbar, and page container for navigation/content.
 */
// PUBLIC_INTERFACE
function App() {
  return (
    <div className="app piggy-dark-theme">
      <Navbar />
      {/* <Sidebar /> */}
      {/* Main Content Layout */}
      <main className="ps-main-content">
        <div className="ps-center-content">
          {/* Savings Goals CRUD UI */}
          <SavingsGoals />
        </div>
      </main>
    </div>
  );
}

export default App;