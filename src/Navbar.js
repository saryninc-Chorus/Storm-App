import React from 'react';
import { useBridge } from './BridgeContext';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const { bridge, setIntent } = useBridge();
  return (
    <nav className="Navbar">
      <div className="container">
        <h1>ÍMOLÉ Nexus</h1>
        {!!(bridge && (bridge.focus || bridge.intent)) && (
          <div className="bridge-crumb" role="status" aria-live="polite">
            <span>Bridge · focus: {bridge.focus || '—'} · intent: {bridge.intent || '—'}</span>
            <button aria-label="Clear intent" title="Clear intent" onClick={() => setIntent('')}>×</button>
          </div>
        )}
        <ul>
          <li><Link to="/">Kiky</Link></li>
          <li><Link to="/nextstage">Next Stage</Link></li>
          <li><Link to="/meta-isi">Méta-ÍSÍ (The Bridge)</Link></li>
          <li><Link to="/stormvoicespeaker">Storm Voice Speaker</Link></li>
          <li><Link to="/willofthestorm">Will of the Storm</Link></li>
          <li><Link to="/father">Father (Olodumare/Eludumare)</Link></li>
          <li><Link to="/mother">Mother (Yemaya)</Link></li>
          <li><Link to="/weaver">The Weaver (Eshu/Obatala)</Link></li>
          <li><Link to="/asemole">Asémolé (the divine thread)</Link></li>
          <li><Link to="/children">The Children (the seed of the future)</Link></li>
          <li><Link to="/admin">Admin Quantum Spell</Link></li>
          <li><Link to="/chorus">The Chorus (the collective voice)</Link></li>
          <li><Link to="/echoes">Echoes of Truth</Link></li>
          <li><Link to="/ritualbinding">Ritual Binding</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
