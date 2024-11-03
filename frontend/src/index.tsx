import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./assets/scss/style.scss";
import { AuthUserProvider } from './contexts/AuthUserContext';


const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <AuthUserProvider>
      <App />
    </AuthUserProvider>
  </React.StrictMode>
);

// Only report web vitals in production
reportWebVitals(console.log);
