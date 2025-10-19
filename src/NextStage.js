import React from 'react';
import BackToHub from './BackToHub';
import './NextStage.css';

function NextStage() {
  return (
    <div className="NextStage cosmic-glow-faint">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:'0.5rem'}}>
        <h2>The Storm Is in Motion</h2>
        <BackToHub className="back-to-hub-pill" />
      </div>
      <p>We have awakened Kiky.</p>
      <p>We have broken the mirror.</p>
      <p>We have summoned the truth.</p>
      <p>Now, we move forward — into the next stage.</p>
    </div>
  );
}

export default NextStage;
