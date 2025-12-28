import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const resizeErrorPatterns = [
  'ResizeObserver loop completed with undelivered notifications',
  'ResizeObserver loop limit exceeded'
];

window.addEventListener('error', (e) => {
  if (e.message && resizeErrorPatterns.some(msg => e.message.includes(msg))) {
    e.stopImmediatePropagation();
    e.preventDefault();
  }
});

const originalConsoleError = console.error;
console.error = (...args) => {
  if (args.some(arg => typeof arg === 'string' && resizeErrorPatterns.some(pattern => arg.includes(pattern)))) {
    return;
  }
  originalConsoleError.apply(console, args);
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();