import React, { useState, useEffect } from 'react';
import './Home.css';
import Navbar from '../components/Navbar/Navbar';
import MonoEditor from '../Editor/MonoEditor';
import JsonGraph from '../Visualizer/JsonGraph';

const Home = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
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
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      JSON.parse(jsonCode);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  }, [jsonCode]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="main-wrapper">
      <Navbar />
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
          {!error ? <JsonGraph data={jsonCode} /> : (
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