import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./assets/scss/style.scss";
import { AuthUserProvider } from './contexts/AuthUserContext';
import { SidebarProvider } from './contexts/SidebarContext';
import { ProfileProvider } from './contexts/ProfileContext';
const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <AuthUserProvider>
      <SidebarProvider>
        <ProfileProvider>
          <App />
        </ProfileProvider>
      </SidebarProvider>
    </AuthUserProvider>
  </React.StrictMode>
);

// Only report web vitals in production
reportWebVitals(console.log);
