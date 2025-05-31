import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Dashboard from './features/dashboard/Dashboard';
import './features/dashboard/Dashboard.css';
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
          {/* Animated PiggySmart Dashboard */}
          <Dashboard initialSavings={0} savingsGoal={100} />
        </div>
      </main>
    </div>
  );
}

export default App;