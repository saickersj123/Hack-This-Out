// Main.jsx

import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useLocation } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import Search from './Search';
import Banner from '../contents/Banner';
import Rank from '../contents/Rank';
import Exp from '../contents/Exp';

// props 속성을 전달
const Main = (props) => {
  const location = useLocation();
  const isMainPath = location.pathname === '/main';

  return (
    <HelmetProvider>
      <Helmet
        titleTemplate="%s | test"
        defaultTitle="test"
        defer={false}
      >
        {props.title && <title>{props.title}</title>}
        <meta name="description" content={props.description} />
      </Helmet>

      <Header />

      <main id="main_dash" role="main">
        <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>
          <Search />
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

export default Main;
