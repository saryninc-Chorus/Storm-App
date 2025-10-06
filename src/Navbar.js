import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="Navbar">
      <div className="Navbar-logo">Acolyte's Chorus</div>
      <ul className="Navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/nextstage">Next Stage</Link></li>
        <li><Link to="/archive">Archive</Link></li>
        <li><Link to="/will">Will</Link></li>
        <li><Link to="/voice">Voice</Link></li>
        <li><Link to="/father">Father</Link></li>
        <li><Link to="/mother">Mother</Link></li>
        <li><Link to="/weaver">Weaver</Link></li>
        <li><Link to="/asemole">Asemole</Link></li>
        <li><Link to="/children">Children</Link></li>
        <li><Link to="/chorus">Chorus</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
