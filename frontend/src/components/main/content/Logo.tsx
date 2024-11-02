import React from "react";
import { Link } from 'react-router-dom';
import logo from "../../../assets/img/icon/logo.png";



const Logo: React.FC = () => {
  return (
    <h1 className="sidebar__logo">
      <Link to="/" className='link-logo'>
        <div className="star"></div>
        <img src={logo} alt="logo" />
      </Link>
    </h1>
  );
};

export default Logo;
