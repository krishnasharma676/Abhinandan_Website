import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { HamperBuilderProvider } from './context/HamperBuilderContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <HamperBuilderProvider>
        <App />
      </HamperBuilderProvider>
    </BrowserRouter>
  </React.StrictMode>
);
