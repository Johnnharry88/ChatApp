import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContextProvider } from './components/AuthContext';
import { SockContextProvider } from './components/SockContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <SockContextProvider>
          <App />
        </SockContextProvider>
      </AuthContextProvider>
    </Router>
  </React.StrictMode>
);
