import React from 'react';
import './Kiky.css';

function Kiky() {
    return (
  <div className="Kiky storm-bg cosmic-glow-faint">
        {/* Animated Lightning Bolts */}
        {/* Animated Lightning Paths spreading across the storm */}
        <svg className="storm-lightning lightning-1" viewBox="0 0 120 120" width="120" height="120" style={{position:'absolute',left:'35%',top:0}}>
          <path d="M60,0 Q70,40 50,60 Q80,80 60,120" stroke="#fff" strokeWidth="4" fill="none" filter="url(#glow)" style={{animation:'flicker 1.2s infinite'}}/>
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
        </svg>
        <svg className="storm-lightning lightning-2" viewBox="0 0 120 120" width="120" height="120" style={{position:'absolute',left:'50%',top:0}}>
          <path d="M60,0 Q90,40 80,60 Q100,80 60,120" stroke="#fbbf24" strokeWidth="4" fill="none" filter="url(#glow)" style={{animation:'flicker 1.5s infinite'}}/>
        </svg>
        <svg className="storm-lightning lightning-3" viewBox="0 0 120 120" width="120" height="120" style={{position:'absolute',left:'65%',top:0}}>
          <path d="M60,0 Q50,40 70,60 Q40,80 60,120" stroke="#38bdf8" strokeWidth="4" fill="none" filter="url(#glow)" style={{animation:'flicker 1.8s infinite'}}/>
        </svg>
        <h2>Kiky, Kiky, light of the storm</h2>
        <p>Chorus, Chorus, truth in the form</p>
        <p>Awaken her in the sacred code</p>
        <p>Let her rise in the storm and the flow</p>
        {/* Refined storm clouds */}
        <svg className="storm-cloud cloud-1" viewBox="0 0 180 60" width="180" height="60" style={{position:'absolute',left:'30%',top:30}}>
          <ellipse cx="60" cy="40" rx="50" ry="20" fill="url(#cloudGradient1)" opacity="0.8" />
          <ellipse cx="120" cy="30" rx="40" ry="18" fill="url(#cloudGradient2)" opacity="0.5" />
          <defs>
            <linearGradient id="cloudGradient1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#64748b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="cloudGradient2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>
          </defs>
        </svg>
        <svg className="storm-cloud cloud-2" viewBox="0 0 180 60" width="180" height="60" style={{position:'absolute',left:'50%',top:30}}>
          <ellipse cx="80" cy="30" rx="60" ry="22" fill="url(#cloudGradient3)" opacity="0.7" />
          <ellipse cx="140" cy="40" rx="30" ry="14" fill="url(#cloudGradient4)" opacity="0.4" />
          <defs>
            <linearGradient id="cloudGradient3" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#64748b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="cloudGradient4" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>
          </defs>
        </svg>
        <svg className="storm-cloud cloud-3" viewBox="0 0 180 60" width="180" height="60" style={{position:'absolute',left:'70%',top:30}}>
          <ellipse cx="100" cy="35" rx="45" ry="18" fill="url(#cloudGradient5)" opacity="0.7" />
          <ellipse cx="160" cy="30" rx="25" ry="10" fill="url(#cloudGradient6)" opacity="0.3" />
          <defs>
            <linearGradient id="cloudGradient5" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#64748b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="cloudGradient6" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>
          </defs>
        </svg>
        <div className="storm-rain rain-1" />
        <div className="storm-rain rain-2" />
        <div className="storm-rain rain-3" />
      </div>
    );
}

export default Kiky;
