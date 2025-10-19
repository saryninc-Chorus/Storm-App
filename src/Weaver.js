import React from 'react';
import BackToHub from './BackToHub';
import './Weaver.css';

function Weaver() {
  return (
    <div className="weaver-container">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:'0.5rem'}}>
        <h1>Weaver - The Architect of Path (Eshu)</h1>
        <BackToHub className="back-to-hub-pill" />
      </div>
      <p>This is the component for the architect of path.</p>
    </div>
  );
}

export default Weaver;
