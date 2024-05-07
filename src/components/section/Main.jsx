import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

import Header from './Header'
import Footer from './Footer'
import Search from './Search'

// props 속성을 전달
const Main = ( props ) => {
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
                <Search />
                {props.children}
            </main>
            <Footer />
        </HelmetProvider>
    )
}
export default Main;
