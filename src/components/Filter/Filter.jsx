import React from 'react';
import './Filter.css';

const Filter = ({ query, setQuery, onApply }) => {
  return (
    <div className="filter-container">
      <div className="filter-input-wrapper">
        <span className="filter-prefix">jq</span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter data (e.g. .links)"
          className="filter-input"
        />
      </div>
      <button onClick={onApply} className="apply-btn">Apply</button>
    </div>
  );
};

export default Filter;