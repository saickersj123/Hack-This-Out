import React from 'react';
import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import "./assets/scss/style.scss";
import { AuthUserProvider } from './contexts/AuthUserContext';
import { SidebarProvider } from './contexts/SidebarContext';
import { ProfileProvider } from './contexts/ProfileContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './routes';
import './utils/i18n';

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

const router = createBrowserRouter(routes, {
  // Enable the v7_relativeSplatPath future flag
  future: {
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_relativeSplatPath: true,
    v7_skipActionErrorRevalidation: true,
  },
});

root.render(
  <React.StrictMode>
    <AuthUserProvider>
      <SidebarProvider>
        <ProfileProvider>
          <RouterProvider
            router={router} 
          />
        </ProfileProvider>
      </SidebarProvider>
    </AuthUserProvider>
  </React.StrictMode>
);

// Only report web vitals in production
reportWebVitals(console.log);
