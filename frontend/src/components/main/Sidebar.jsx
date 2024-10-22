// Sidebar.jsx
import React from 'react';
import { headerMenus } from '../../data/header';
import { Link, useLocation } from 'react-router-dom';
import Logo from './content/Logo';

const Sidebar = () => {
  const location = useLocation();

  return (
    <nav className='logo-sidebar-container'>
      <Logo />
      <div className="sidebar">
        <ul className="sidebar-menu">
          {headerMenus.map((menu, key) => (
            <li key={key} className={location.pathname === menu.src ? 'active' : ''}>
              <Link to={menu.src}>
                {menu.icon}{menu.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
