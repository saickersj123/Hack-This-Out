import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

import Header from './Header'
import Footer from './Footer'
import Search from './Search'

// props 속성을 전달
const Main = (props) => {
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
                {props.children}
            </main>
            <div style={{ position: 'fixed', bottom: 0, width: '100%', zIndex: 100 }}>
                <Footer />
            </div>
        </HelmetProvider>
    )
}
export default Main;
