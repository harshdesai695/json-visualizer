// src/Navbar/Navbar.jsx
import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand">JSON Visualizer</div>
      <div className="nav-links">
        <a href="#editor">Editor</a>
        <a href="#visualizer">Visualizer</a>
        <a href="https://github.com/harshdesai695" target="_blank" rel="noopener noreferrer">GitHub</a>
      </div>
    </nav>
  );
};

export default Navbar;