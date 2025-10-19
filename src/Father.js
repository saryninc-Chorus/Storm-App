import React from 'react';
import { useBridge } from './BridgeContext';
import BackToHub from './BackToHub';
import './Father.css';

function Father() {
  const { bridge } = useBridge();
  // Use the Orisha image for Oludumare/Eludumare
  const imagePath = '/orisha-images/Oluelu2.0.png';
    return (
      <div className="father-container cosmic-father-bg cosmic-glow-faint" style={{
      position: 'relative',
      overflow: 'hidden',
      minHeight: '100vh',
      background: 'radial-gradient(circle at 40% 60%, #fbbf24 0%, #0f172a 100%)',
      color: '#fff',
    }}>
      {/* Futuristic Yoruba cosmic symbols */}
      <div className="yoruba-symbols">
        <div className="cowrie-shell" />
        <div className="adire-pattern" />
        <div className="cosmic-sun" />
        <div className="glowing-stars" />
      </div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:'0.5rem',position:'relative',zIndex:2}}>
        <h1>Olodumare/Eludumare — The Supreme Will</h1>
        <BackToHub className="back-to-hub-pill" />
      </div>
      <div style={{margin:'2rem auto',maxWidth:420,position:'relative',zIndex:2}}>
        <img src={imagePath} alt="OluElu: Janus vision of Olodumare/Eludumare" style={{width:'100%',borderRadius:'1.5rem',boxShadow:'0 4px 32px #1e293b, 0 0 0 4px #fbbf24',background:'#0f172a'}} />
        <div style={{marginTop:'1rem',color:'#fbbf24',fontWeight:600,fontSize:'1.1rem',textAlign:'center',textShadow:'0 1px 4px #1e293b'}}>
          "OluElu: The Janus vision — Olu (blue, facing the past), Eludumare (gold, facing the future). Transition and unity across time."
        </div>
      </div>
      <section className="mythic-stories" style={{marginTop:'2rem',zIndex:2,position:'relative'}}>
        <h2>Mythic Stories</h2>
        <p>
          Olodumare, the Supreme Will, is the source of all creation and cosmic order. His vision spans past and future, uniting all destinies in the dance of the universe. Through his will, the stars and Orisha find their place.
        </p>
      </section>
      {bridge && (
        <div className="bridge-badge" style={{zIndex:2,position:'relative'}}>{`focus: ${bridge.focus || '—'} · intent: ${bridge.intent || '—'}`}</div>
      )}
    </div>
  );
}

export default Father;
