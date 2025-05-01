import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./middleware/Intercepteur";
import "./middleware/IntercepteurError";

const originalWarn = console.warn;
console.warn = (...args) => {
  originalWarn("Debug:", ...args); // ✅ appelle l'original sans boucle
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

