import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';

// Initialize i18n configuration and global styles
import './i18n';
import './index.css';

/**
 * Application entry point.
 * 
 * Initializes the React root, wraps the application in necessary providers 
 * (ThemeProvider for global state, StrictMode for development checks), 
 * and renders it into the DOM.
 */
const rootElement = document.getElementById('root');

// Guard clause to prevent runtime errors if the HTML structure is incorrect
if (!rootElement) {
  throw new Error('Failed to find the root element. Ensure a div with id="root" exists in index.html.');
}

const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);