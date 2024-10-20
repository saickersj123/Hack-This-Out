import React, { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useLocation, useNavigate } from 'react-router-dom';
import withAuth from '../withAuth';

import Header from './Header';
import Footer from './Footer';
import SearchAndProfile from './SearchAndProfile';
import Banner from '../contents/Banner';
import Rank from '../contents/Rank';
import Exp from '../contents/Exp';

// props 속성을 전달
const Main = (props) => {
  const location = useLocation();
  const isMainPath = location.pathname === '/';

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

      <Header />

      <main id="main_dash" role="main">
        <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>
          <SearchAndProfile />
        </div>
        {isMainPath && (
          <div className="banner-container">
            <Banner />
            <div className="rank-exp-container">
              <Rank />
              <Exp />
            </div>
          </div>
        )}
        {props.children}
      </main>

      <div style={{ position: 'fixed', bottom: 0, width: '100%', zIndex: 100 }}>
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default withAuth(Main);
