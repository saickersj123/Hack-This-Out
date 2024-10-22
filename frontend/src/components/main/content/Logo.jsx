import React from "react";
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <h1 className="sidebar__logo">
      <Link to="/" className='link-logo'>
        <div className="star"></div>
        <span>Hack<br />ThisOut</span>
      </Link>
    </h1>
  );
};

export default Logo;
