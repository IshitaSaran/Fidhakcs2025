import React from 'react';
import './Landing.css';

function Landing() {
  return (
    <div className="landing-container">
      <div className="text-top">
        <h1 className="main-title">More Than Ready</h1>
        <p className="tagline">“HELPING YOU HIT SEND–EVEN AT 60%”</p>
      </div>

      <img
        src="/images/landing.png"
        alt="Landing design"
        className="landing-image"
      />

      <p className="footer-text">
        a resume tool helping women apply with <span className="highlight">confidence</span>
      </p>
    </div>
  );
}

export default Landing;
