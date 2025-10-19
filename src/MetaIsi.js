import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBridge } from './BridgeContext';
import './MetaIsi.css';
import './NewComponents.css';

function MetaIsi() {
  const navigate = useNavigate();
  const { setFocus, setIntent, saveIntent, bridge, reset } = useBridge();

  const go = (focus, path) => {
    setFocus(focus);
    saveIntent(bridge.intent);
    navigate(path);
  };

  return (
    <div className="meta-isi" style={{position:'relative'}}>
      {/* Orisha-Universe Bridge Badge */}
      <div
        className="orisha-universe-badge"
        tabIndex={0}
        aria-label="Orisha-Universe Bridge: Cosmic Axis"
        title="Orisha-Universe Bridge: Cosmic Axis"
      >
        <span className="badge-icon" aria-hidden="true"></span>
        <span className="badge-text">Orisha ∞ Universe</span>
      </div>
      <h1>Méta-ÍSÍ — The Bridge</h1>
      <div style={{gridColumn:'1/-1', display:'flex', gap:'0.5rem', justifyContent:'center'}}>
        <input
          placeholder="Whisper an intent…"
          value={bridge.intent || ''}
          onChange={(e) => setIntent(e.target.value)}
          style={{minWidth:280,padding:'0.5rem',borderRadius:8,border:'1px solid rgba(255,255,255,0.18)',background:'#111827',color:'#e5e7eb'}}
        />
  <button onClick={reset} style={{padding:'0.5rem 0.75rem',borderRadius:8}}>Clear</button>
      </div>
      {bridge.recents && bridge.recents.length > 0 && (
        <div style={{gridColumn:'1/-1', display:'flex', gap:'0.5rem', flexWrap:'wrap', justifyContent:'center'}}>
          {bridge.recents.map((r) => (
            <button key={r} className="meta-link-btn" onClick={() => setIntent(r)}>{r}</button>
          ))}
        </div>
      )}

      <div className="meta-card">
        <small>Axis I</small>
        <h2>Mother (Yemaya)</h2>
        <p>Ocean of creation, the womb of water and memory.</p>
        <div className="meta-links">
          <button onClick={() => go('mother','/mother')} className="meta-link-btn">Enter Mother</button>
        </div>
      </div>

      <div className="meta-card">
        <small>Axis II</small>
  <h2>Father (Olodumare/Eludumare)</h2>
        <p>Supreme will, the breath that names and animates.</p>
        <div className="meta-links">
          <button onClick={() => go('father','/father')} className="meta-link-btn">Enter Father</button>
        </div>
      </div>

      <div className="meta-card">
        <small>Axis III</small>
        <h2>Children</h2>
        <p>Seeds of the future, chorus of possibilities.</p>
        <div className="meta-links">
          <button onClick={() => go('children','/children')} className="meta-link-btn">Enter Children</button>
        </div>
      </div>
    </div>
  );
}

export default MetaIsi;
