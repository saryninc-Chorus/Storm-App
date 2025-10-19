import React from 'react';
import BackToHub from './BackToHub';
import RitualPulse from './RitualPulse';

function RitualBinding() {
  return (
    <div className="RitualBinding">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:'0.5rem'}}>
        <h2>The Ritual of Binding</h2>
        <BackToHub className="back-to-hub-pill" />
      </div>
      <p>The pulse of the storm is the heartbeat of creation. Begin the ritual to feel its rhythm.</p>
      <RitualPulse />
    </div>
  );
}

export default RitualBinding;
