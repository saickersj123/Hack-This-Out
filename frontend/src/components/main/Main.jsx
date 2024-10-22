// Main.jsx
import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import withAuth from '../withAuth';

import Sidebar from './Sidebar'; // 사이드바 불러오기
import Footer from './Footer';
import SearchandProfile from './SearchandProfile';

const Main = (props) => {
  return (
    <HelmetProvider>
      <Helmet
        titleTemplate="%s | Hack This Out"
        defaultTitle="Hack This Out"
        defer={false}
      >
        {props.title && <title>{props.title}</title>}
        <meta name="description" content={props.description} />
      </Helmet>

      <div className="main-container">
        <div className="logo-sidebar-container">
          <Sidebar />
        </div>
        <div className="content-container">
          <div className="search-profile-container">
            <SearchandProfile />
          </div>
          <div className="props-container">
            {props.children}
          </div>
          <Footer />
        </div>
      </div>

    </HelmetProvider>
  );
};

export default withAuth(Main);
