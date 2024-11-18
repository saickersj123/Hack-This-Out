import React from 'react';
import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import "./assets/scss/style.scss";
import { AuthUserProvider } from './contexts/AuthUserContext';
import { SidebarProvider } from './contexts/SidebarContext';
import { ProfileProvider } from './contexts/ProfileContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './routes';
import Loading from './components/public/Loading';
const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

const router = createBrowserRouter(routes, {
  // Enable the v7_relativeSplatPath future flag
  future: {
    v7_relativeSplatPath: true,
  },
});

root.render(
  <React.StrictMode>
    <AuthUserProvider>
      <SidebarProvider>
        <ProfileProvider>
          <RouterProvider router={router} fallbackElement={<Loading />} />
        </ProfileProvider>
      </SidebarProvider>
    </AuthUserProvider>
  </React.StrictMode>
);

// Only report web vitals in production
reportWebVitals(console.log);
