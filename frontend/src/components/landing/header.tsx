import React from "react";
import '../../assets/scss/landing/header.scss';
import { FaArrowRight } from "react-icons/fa";

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
                  {data.paragraph.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                  <a href="/login" className="btn-custom btn btn-lg page-scroll">
                     Go to App <FaArrowRight fontSize={20} style={{ marginLeft: '8px', }} />
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
