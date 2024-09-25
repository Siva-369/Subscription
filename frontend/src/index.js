import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Import the main App component

// Create a root for the React application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside the root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
