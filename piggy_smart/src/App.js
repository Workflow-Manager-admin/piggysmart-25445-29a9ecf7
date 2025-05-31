import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
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
          {/* Placeholder for animated piggy and main dashboard */}
          <div
            style={{
              marginTop: 50,
              padding: 30,
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '32px',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '3.6rem', marginBottom: 20 }}>🐷</div>
            <h1 style={{ color: 'var(--piggy-sky-blue, #4FC3F7)', fontSize: 34, fontWeight: 700, margin: '0 0 7px' }}>
              Welcome to PiggySmart!
            </h1>
            <p style={{ color: '#FFD54F', fontWeight: 500, margin: '0 0 22px' }}>
              Playful piggy bank for smarter savings.
            </p>
            <button
              style={{
                background: '#4FC3F7',
                color: '#fff',
                border: 'none',
                fontSize: '1.1rem',
                borderRadius: 18,
                padding: '14px 32px',
                fontWeight: 600,
                cursor: 'pointer',
                marginTop: 6,
                boxShadow: '0 1px 10px 0 #4FC3F72a'
              }}
            >
              Start Saving
            </button>
          </div>
          {/* Navigation and features will appear here */}
        </div>
      </main>
    </div>
  );
}

export default App;