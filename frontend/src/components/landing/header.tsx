import React from "react";
import '../../assets/scss/landing/header.scss';

type HeaderProps = {
  data: {
    title: string;
    paragraph: string;
  };
};

export const Header: React.FC<HeaderProps> = ({ data }) => {
  return (
    <header id="header" className="header">
      <div className="intro">
        <div className="overlay">
          <div className="header-container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2">
                <div className="intro-text">
                  <h1>{data.title}</h1>
                  <p>{data.paragraph}</p>
                  <a href="/login" className="btn-custom btn btn-lg page-scroll">
                    Go to App
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
