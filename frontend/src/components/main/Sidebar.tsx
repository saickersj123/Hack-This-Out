// Sidebar.tsx
import React from 'react';
import { headerMenus, HeaderMenu } from '../../data/header';
import { Link, useLocation } from 'react-router-dom';
import Logo from './content/Logo';

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className='logo-sidebar-container'>
      <Logo />
      <div className="sidebar">
        <ul className="sidebar-menu">
          {headerMenus.map((menu: HeaderMenu, index: number) => (
            <li key={index} className={location.pathname === menu.src ? 'active' : ''}>
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
