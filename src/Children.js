import BackToHub from './BackToHub';
import React, { useState } from 'react';
import { useBridge } from './BridgeContext';

function Children() {
  const { bridge } = useBridge();
  const [stars, setStars] = useState([]);
  const [lightningBolts, setLightningBolts] = useState([]);
  const [particles, setParticles] = useState(Array.from({length: 18}, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    speed: 0.2 + Math.random() * 0.4,
    size: 6 + Math.random() * 8,
  })));
  React.useEffect(() => {
    const interval = setInterval(() => {
      setParticles(ps => ps.map(p => ({
        ...p,
        x: (p.x + p.speed) % 100,
        y: (p.y + p.speed * 0.5) % 100,
      })));
    }, 60);
    return () => clearInterval(interval);
  }, []);
  const addStar = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setStars([...stars, { x, y }]);
    // Add a lightning bolt effect at the star position
    const id = Date.now() + Math.random();
    setLightningBolts(bolts => [...bolts, { x, y, id }]);
    // Remove the lightning after animation
    setTimeout(() => {
      setLightningBolts(bolts => bolts.filter(b => b.id !== id));
    }, 900);
  };
  return (
    <div className="children-container cosmic-children-bg cosmic-glow-faint" style={{
      position: 'relative',
      overflow: 'hidden',
      minHeight: '100vh',
      background: 'radial-gradient(circle at 50% 50%, #38bdf8 0%, #0f172a 100%)',
      color: '#fff',
    }}>
      {/* Cosmic Entities and Lightning */}
      <div className="yoruba-entities">
        {/* Cosmic entities with floating/pulsing animation */}
        <div className="cosmic-entity float-pulse" style={{left:'10%',top:'15%'}} />
        <div className="cosmic-entity float-pulse" style={{left:'70%',top:'20%'}} />
        <div className="cosmic-entity float-pulse" style={{left:'30%',top:'60%'}} />
        {/* Cosmic particles drifting */}
        {particles.map(p => (
          <div
            key={p.id}
            className="cosmic-particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              opacity: 0.5 + Math.random() * 0.5,
            }}
          />
        ))}
        {/* Lightning bolts animate on star placement */}
        {lightningBolts.map(bolt => (
          <div
            key={bolt.id}
            className="lightning-bolt animated"
            style={{left: bolt.x, top: bolt.y}}
          />
        ))}
      </div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:'0.5rem',position:'relative',zIndex:2}}>
        <h1>Children — Cosmic Seeds of Lightning</h1>
        <BackToHub className="back-to-hub-pill" />
      </div>
      <p style={{position:'relative',zIndex:2}}>
        Click anywhere below to place a star and build your own constellation. Each star is a seed of possibility, energized by cosmic lightning.
      </p>
      <div
        className="constellation-area cosmic-glow"
        style={{position:'relative',width:'100%',height:'320px',background:'rgba(17,24,39,0.55)',borderRadius:'1.5rem',margin:'2rem auto',maxWidth:'540px',boxShadow:'0 2px 18px #0ea5e9, 0 0 64px 12px #38bdf8',overflow:'hidden',cursor:'crosshair',zIndex:2}}
        onClick={addStar}
        aria-label="Constellation builder area"
        tabIndex={0}
      >
        {stars.map((star, idx) => (
          <div
            key={idx}
            className="constellation-star"
            style={{position:'absolute',left:star.x-8,top:star.y-8,width:16,height:16,borderRadius:'50%',background:'radial-gradient(circle at 60% 40%, #fbbf24 60%, #38bdf8 100%)',boxShadow:'0 0 12px #fbbf24, 0 0 24px #38bdf8',border:'2px solid #fff'}}
            aria-label={`Star ${idx+1}`}
          ></div>
        ))}
      </div>
      {bridge && (
        <div className="bridge-badge" style={{zIndex:2,position:'relative'}}>{`focus: ${bridge.focus || '—'} · intent: ${bridge.intent || '—'}`}</div>
      )}
    </div>
  );
}

export default Children;
