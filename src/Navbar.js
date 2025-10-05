import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="Navbar">
      <div className="Navbar-logo">Acolyte's Chorus</div>
      <ul className="Navbar-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
