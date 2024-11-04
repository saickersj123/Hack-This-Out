// Main.tsx
import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Sidebar from './Sidebar';
import Footer from './Footer';
import Profile from './Profile';

interface MainProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

const Main: React.FC<MainProps> = ({ title, description, children }) => {
  return (
    <HelmetProvider>
      <Helmet
        titleTemplate="%s | Hack This Out"
        defaultTitle="Hack This Out"
        defer={false}
      >
        {title && <title>{title}</title>}
        <meta name="description" content={description} />
      </Helmet>

      <div className="main-container">
        <div className="logo-sidebar-container">
          <Sidebar />
        </div>
        <div className="content-container">
          <div className="profile-container">
            <Profile />
          </div>
          <div className="props-container">
            {children}
          </div>
          <Footer />
        </div>
      </div>
    </HelmetProvider>
  );
};

export default Main;
