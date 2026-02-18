import React from 'react';
import './Navbar.css';

const Navbar = ({ onToggleFilter, isFilterVisible }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon">📦</span>
        <span className="brand-name">JSON Visualizer</span>
      </div>
      <div className="navbar-actions">
        <button 
          className={`filter-toggle-btn ${isFilterVisible ? 'active' : ''}`}
          onClick={onToggleFilter}
        >
          {isFilterVisible ? 'Hide Filter' : 'Show Filter'}
        </button>
        <a 
          href="https://github.com/harshdesai695/json-visualizer" 
          target="_blank" 
          rel="noopener noreferrer"
          className="github-link"
        >
          GitHub
        </a>
      </div>
    </nav>
  );
};

export default Navbar;