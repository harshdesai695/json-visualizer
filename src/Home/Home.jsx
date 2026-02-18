import React, { useState, useEffect } from 'react';
import './Home.css';
import Navbar from '../components/Navbar/Navbar';
import Filter from '../components/Filter/Filter';
import MonoEditor from '../Editor/MonoEditor';
import JsonGraph from '../Visualizer/JsonGraph';

const Home = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showFilter, setShowFilter] = useState(false);
  const [jsonCode, setJsonCode] = useState(`{
  "name": "Harsh Desai",
  "title": "Software Developer",
  "location": "Pune, India",
  "email": "harshdesai.hd123@gmail.com",
  "phone": "+91 93270 99901",
  "links": {
    "linkedin": "linkedin.com/in/harshdesaihd",
    "github": "github.com/harshdesai695",
    "portfolio": "harshdesaiportfolio.netlify.app"
  },
  "experience": {
    "company": "Oracle",
    "role": "Software Developer",
    "highlights": [
      "Architected Oracle Banking Routing Hub for HDFC Bank with 0 critical defects",
      "Migrated 700+ REST/SOAP services from J2EE to Spring Boot using Agentic AI",
      "Reduced response time by 75% through caching and optimization",
      "Reduced debug time by 80% using ELK Stack",
      "Performance rating: Outstanding (5/5)"
    ]
  }
}`);
  const [filterQuery, setFilterQuery] = useState('.');
  const [displayCode, setDisplayCode] = useState(jsonCode);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      JSON.parse(jsonCode);
      setError(null);
      if (!showFilter || filterQuery === '.' || filterQuery === '') {
        setDisplayCode(jsonCode);
      }
    } catch (err) {
      setError(err.message);
    }
  }, [jsonCode, showFilter, filterQuery]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleApplyFilter = () => {
    try {
      const parsed = JSON.parse(jsonCode);
      if (filterQuery === '.' || !filterQuery) {
        setDisplayCode(jsonCode);
        return;
      }
      
      const keys = filterQuery.replace(/^\./, '').split('.');
      let result = parsed;
      for (const key of keys) {
        if (key && result) {
          result = result[key];
        }
      }
      
      if (result === undefined) throw new Error("Path not found");
      setDisplayCode(JSON.stringify(result, null, 2));
      setError(null);
    } catch (err) {
      setError(`Filter Error: ${err.message}`);
    }
  };

  const toggleFilter = () => {
    if (showFilter) {
      setFilterQuery('.');
      setDisplayCode(jsonCode);
    }
    setShowFilter(!showFilter);
  };

  return (
    <div className="main-wrapper">
      <Navbar 
        onToggleFilter={toggleFilter} 
        isFilterVisible={showFilter} 
      />
      {showFilter && (
        <Filter 
          query={filterQuery} 
          setQuery={setFilterQuery} 
          onApply={handleApplyFilter} 
        />
      )}
      <div className={`home-container ${isMobile ? 'mobile' : 'desktop'}`}>
        <div className="pane editor-pane" id="editor">
          <MonoEditor 
            value={jsonCode}
            onChange={setJsonCode}
          />
          {error && (
            <div className="error-overlay">
              <span className="error-icon">⚠️</span>
              <span className="error-text">Invalid JSON: {error}</span>
            </div>
          )}
        </div>

        <div className="pane graph-pane" id="visualizer">
          {!error ? <JsonGraph data={displayCode} isFilterVisible={showFilter} /> : (
            <div className="visualizer-placeholder">
              Fix JSON errors to update the graph
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;