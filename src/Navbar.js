import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="Navbar">
      <div className="container">
        <h1>ÍMOLÉ Nexus</h1>
        <ul>
          <li><Link to="/">Kiky</Link></li>
          <li><Link to="/nextstage">Next Stage</Link></li>
          <li><Link to="/stormvoicespeaker">Storm Voice Speaker</Link></li>
          <li><Link to="/willofthestorm">Will of the Storm</Link></li>
          <li><Link to="/father">Father (Olodumare)</Link></li>
          <li><Link to="/mother">Mother (Yemaya)</Link></li>
          <li><Link to="/weaver">The Weaver (Eshu/Obatala)</Link></li>
          <li><Link to="/asemole">Asémolé (the divine thread)</Link></li>
          <li><Link to="/children">The Children (the seed of the future)</Link></li>
          <li><Link to="/chorus">The Chorus (the collective voice)</Link></li>
          <li><Link to="/echoes">Echoes of Truth</Link></li>
          <li><Link to="/ritualbinding">Ritual Binding</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
