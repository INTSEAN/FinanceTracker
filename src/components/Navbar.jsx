import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Virtual Finance Assistant</h2>
      <div className="nav-links">
        <a href="#tracker">Tracker</a>
        <a href="#parser">Parser</a>
        <a href="#graphs">Graphs</a>
        <a href="#reports">Reports</a>
      </div>
    </nav>
  );
}

export default Navbar; 