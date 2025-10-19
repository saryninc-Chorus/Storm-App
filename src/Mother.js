import React, { useState } from 'react';
import { useBridge } from './BridgeContext';
import BackToHub from './BackToHub';
import './Mother.css';

function Mother() {
  const { bridge } = useBridge();
  // Yoruba proverbs and mythic stories
  const proverbs = [
    'The river that forgets its source will dry up. (Odo tí ó gbàgbé orísun rè, yó gbẹ́.)',
    'Patience can cook a stone. (Sùúrù ló le se ewé kìí se àkàrà.)',
    'No matter how far the stream flows, it never forgets its source.',
    'Yemaya’s embrace is the beginning of all journeys.',
    'The ocean is vast, but every drop is remembered.',
    'Wisdom is like the ocean: deep, mysterious, and ever-present.'
  ];
  const [message, setMessage] = useState('');
  const revealMessage = () => {
    const idx = Math.floor(Math.random() * proverbs.length);
    setMessage(proverbs[idx]);
  };

  return (
    <div className="mother-container cosmic-ocean-bg cosmic-glow-faint" style={{
      position: 'relative',
      overflow: 'hidden',
      minHeight: '100vh',
      background: 'radial-gradient(circle at 60% 40%, #1a237e 0%, #0d133d 100%)',
      color: '#fff',
    }}>
      {/* Futuristic Yoruba cosmic symbols */}
      <div className="yoruba-symbols">
        <div className="cowrie-shell" />
        <div className="adire-pattern" />
        <div className="cosmic-waves" />
        <div className="glowing-stars" />
      </div>
      {/* Animated River Effects */}
      <div className="yemaya-river">
        <svg className="river-svg" viewBox="0 0 800 100" width="100%" height="100" style={{position:'absolute',left:0,bottom:0}}>
          <defs>
            <linearGradient id="riverGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#b3e5fc" />
              <stop offset="60%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0ea5e9" />
            </linearGradient>
            <filter id="riverGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <g>
            <path className="river-main-wave" d="M0,80 Q200,40 400,80 T800,80 L800,100 L0,100 Z" fill="url(#riverGradient)" filter="url(#riverGlow)"/>
            <path className="river-highlight" d="M0,85 Q200,55 400,85 T800,85" fill="none" stroke="#fff" strokeWidth="3" opacity="0.5" />
          </g>
        </svg>
        <div className="river-sparkle sparkle-1" />
        <div className="river-sparkle sparkle-2" />
        <div className="river-sparkle sparkle-3" />
      </div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:'0.5rem',position:'relative',zIndex:2}}>
        <h1>Yemaya — Mother of the Cosmic Ocean</h1>
        <BackToHub className="back-to-hub-pill" />
      </div>
      <p style={{position:'relative',zIndex:2}}>
        Welcome to the cosmic ocean. Click below to receive a Yoruba proverb or mythic story from Yemaya’s waters.
      </p>
      <button onClick={revealMessage} style={{margin:'1rem auto',padding:'0.75rem 1.5rem',borderRadius:8,background:'#2563eb',color:'#fff',border:'none',fontWeight:600,boxShadow:'0 2px 8px #1e293b',cursor:'pointer',zIndex:2,position:'relative'}}>Reveal Wisdom</button>
      {message && (
        <div style={{marginTop:'1.5rem',fontSize:'1.15rem',fontStyle:'italic',color:'#fbbf24',background:'rgba(17,24,39,0.85)',padding:'1rem 2rem',borderRadius:12,boxShadow:'0 2px 12px #0ea5e9',maxWidth:480,marginLeft:'auto',marginRight:'auto',zIndex:2,position:'relative'}}>
          {message}
        </div>
      )}
      <section className="mythic-stories" style={{marginTop:'2rem',zIndex:2,position:'relative'}}>
        <h2>Mythic Stories</h2>
        <p>
          Yemaya, the cosmic mother, weaves the universe from the ocean's depths. Her waves carry wisdom, her stars illuminate the path of the Orisha. In the dance of galaxies, her spirit flows through all creation.
        </p>
      </section>
      {bridge && (
        <div className="bridge-badge" style={{zIndex:2,position:'relative'}}>{`focus: ${bridge.focus || '—'} · intent: ${bridge.intent || '—'}`}</div>
      )}
    </div>
  );
}

export default Mother;
