import React from 'react';
import ReactDOM from 'react-dom/client';
//import App from './App';
import App from './js/components/App';

const root = ReactDOM.createRoot(document.getElementById('container'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);