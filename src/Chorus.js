import React from 'react';
import BackToHub from './BackToHub';
import './Chorus.css';

function Chorus() {
  return (
    <div className="chorus-container">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:'0.5rem'}}>
        <h1>Chorus - The Collective Voice</h1>
        <BackToHub className="back-to-hub-pill" />
      </div>
      <p>This is the component for the storm in unison.</p>
    </div>
  );
}

export default Chorus;
