import React, { useState } from "react";
import '../../assets/scss/landing/navigation.scss';
import HTO_LOGO from '@assets/img/icon/HTO LIGHT RECOLORED_crop_filled.png';
import HTO_LOGO_HOVER from '@assets/img/icon/HTO DARK RECOLORED_crop_filled.png';

const Navigation: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setTimeout(() => {
      setIsHovered(true);
    }, 200); // 200ms delay before image switch
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setIsHovered(false);
    }, 200); // 200ms delay before switching back
  };

  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="menu-container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a className="navbar-brand page-scroll" href="#header">
            <img 
              src={isHovered ? HTO_LOGO_HOVER : HTO_LOGO} 
              alt="Hack This Out"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="logo-image"
            />
          </a>
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a href="#features" className="page-scroll">
                Features
              </a>
            </li>
            <li>
              <a href="#about" className="page-scroll">
                About
              </a>
            </li>
            <li>
              <a href="#services" className="page-scroll">
                Services
              </a>
            </li>
            <li>
              <a href="#team" className="page-scroll">
                Team
              </a>
            </li>
            <li>
              <a href="#contact" className="page-scroll">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
