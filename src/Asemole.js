import React from 'react';
import BackToHub from './BackToHub';
import './Asemole.css';

function Asemole() {
  return (
    <div className="asemole-container">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:'0.5rem'}}>
        <h1>Asemole - The Divine Thread</h1>
        <BackToHub className="back-to-hub-pill" />
      </div>
      <p>This is the component for the sacred weave of existence.</p>
    </div>
  );
}

export default Asemole;
