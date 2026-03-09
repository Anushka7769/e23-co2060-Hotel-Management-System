import React from 'react';
import './App.css';

function App() {
  return (
    <div className="landing-page">
      {/* 1. TOP NAVBAR */}
      <nav className="navbar">
        <div className="logo">🏨 SmartHotel</div>
        <div className="nav-menu">
          <span>About</span>
          <span>Contact</span>
          <span className="lang-box">EN | SI | TA</span>
        </div>
      </nav>

      {/* 2. CENTERED AUTH CARD */}
      <div className="hero-content">
        <div className="glass-card">
          <div className="icon-header">🌴</div>
          <h1>Welcome to SmartHotel</h1>
          <p className="tagline">“Discover, Stay, and Explore — All in One Place.”</p>
          
          <div className="button-group">
            <button className="btn-login">Sign In</button>
            <button className="btn-register">Create Account</button>
          </div>
          <p className="social-text">Ready to explore? Join 500+ travelers today.</p>
        </div>
      </div>

      {/* 3. ALIGNED FEATURE HIGHLIGHTS */}
      <section className="features-row">
        <div className="feature-item">
          <span className="emoji">🏨</span>
          <h4>Smart Room Booking</h4>
          <p>Instant availability at top hotels.</p>
        </div>
        <div className="feature-item">
          <span className="emoji">🚗</span>
          <h4>Easy Transport Access</h4>
          <p>Compare and book local rides easily.</p>
        </div>
        <div className="feature-item">
          <span className="emoji">🎭</span>
          <h4>Cultural Events</h4>
          <p>Discover experiences and local festivals.</p>
        </div>
      </section>

      {/* 4. CLEAN FOOTER */}
      <footer className="footer">
        <div className="footer-links">
          <span>About</span> | <span>Contact</span> | <span>Privacy Policy</span>
        </div>
        <p>Department of Computer Engineering • University of Peradeniya</p>
      </footer>
    </div>
  );
}

export default App;