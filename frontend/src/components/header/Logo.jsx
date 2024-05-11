import React from "react";
import lock from '../../assets/img/icon/lock.png';

const Logo = () => {
  return (
    <h1 className="header__logo">
      <a href="/main">
        <img className="lock" alt="profile_icon" src={lock} />
        <span>Hack<br />ThisOut</span>
      </a>
    </h1>
  );
};

export default Logo;
