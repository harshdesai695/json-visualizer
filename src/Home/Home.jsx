import React, { useState, useEffect, useRef } from 'react';
import './Home.css'
import MonoEditor from '../Editor/MonoEditor';

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [pane1Size, setPane1Size] = useState(40);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      
      setIsMobile((prevIsMobile) => {
        if (prevIsMobile !== mobile) {
          setPane1Size(mobile ? 50 : 40); 
          return mobile;
        }
        return prevIsMobile;
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseDown = (e) => {
    e.preventDefault(); 
    const handleMouseMove = (moveEvent) => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      let newSize;
      if (isMobile) {
        const offsetY = moveEvent.clientY - containerRect.top;
        newSize = (offsetY / containerRect.height) * 100;
      } else {
        const offsetX = moveEvent.clientX - containerRect.left;
        newSize = (offsetX / containerRect.width) * 100;
      }
      if (newSize > 10 && newSize < 90) {
        setPane1Size(newSize);
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleMouseMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleMouseMove);
    document.addEventListener('touchend', handleMouseUp);
  };

  return (
    <div 
      ref={containerRef} 
      className={`split-container ${isMobile ? 'mobile' : 'desktop'}`}
    >
      <div 
        className="split-pane pane-1" 
        style={{ 
          [isMobile ? 'height' : 'width']: `${pane1Size}%` 
        }}
      >
        <MonoEditor />
      </div>

      <div 
        className="gutter" 
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}>
        <span style={{ fontSize: '12px', color: '#555' }}>
            {isMobile ? '•••' : '⋮'}
        </span>
      </div>
      
      <div className="split-pane pane-2">
        <h2>Pane 2</h2>
      </div>
    </div>
  );
}

export default Home;