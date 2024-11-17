import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdOutlineLeaderboard, MdLeaderboard, MdOutlineTimer, MdTimer } from "react-icons/md";
import { FaQuestionCircle, FaRegQuestionCircle } from "react-icons/fa";
import { PiComputerTowerLight, PiComputerTowerFill } from "react-icons/pi";
import { RiArrowLeftDoubleFill, RiArrowRightDoubleFill } from "react-icons/ri";

import styles from '../../assets/scss/section/_sidebar.module.scss';
import logo from "../../assets/img/icon/HTO DARK RECOLORED_crop_filled.png";
import collapsed_logo from '../../assets/img/icon/HTO ICON DARK RECOLORED_crop_fill.png';

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleSidebar }) => {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);

  // URL을 기반으로 현재 선택된 메뉴 확인
  const getMenuIcon = (path: string, iconActive: JSX.Element, iconInactive: JSX.Element) => {
    return location.pathname.startsWith(path) ? iconActive : iconInactive;
  };

  return (
    <div className={`${styles.sidebarMenu} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.headerParent}>
        <div className={styles.header}>
          <Link to='/' className={styles.logoimage}>
            <img className={styles.logoContainerIcon} alt="" src={logo} />
          </Link>
          <div className={styles.sidebarMenuButton}>
            <button className={styles.collapse_button}
              onClick={() => { toggleSidebar(); setIsHovered(false); }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {isCollapsed && isHovered && <RiArrowRightDoubleFill size={40} />}
              {isCollapsed && !isHovered && (
                <img
                  className={styles.icon_logo}
                  src={collapsed_logo}
                  alt="Collapsed Logo"
                />
              )}
              {!isCollapsed && <RiArrowLeftDoubleFill size={40} />}
            </button>
          </div>
        </div>
        <div className={styles.headerParent}>
          <div className={styles.topMenu}>
            <li className={styles.verticalMenuList}>
              <Link
                to="/tutorial"
                className={`${styles.verticalMenuItem} ${location.pathname.startsWith('/tutorial') ? styles.selected : ''}`}
              >
                {getMenuIcon('/tutorial', <FaQuestionCircle className={styles.menuIcon} />, <FaRegQuestionCircle className={styles.menuIcon} />)}
                <div className={styles.label}>Tutorial</div>
              </Link>
              <Link
                to="/leaderboard"
                className={`${styles.verticalMenuItem} ${location.pathname.startsWith('/leaderboard') ? styles.selected : ''}`}
              >
                {getMenuIcon('/leaderboard', <MdLeaderboard className={styles.menuIcon} />, <MdOutlineLeaderboard className={styles.menuIcon} />)}
                <div className={styles.label}>LeaderBoard</div>
              </Link>
              <Link
                to="/contest"
                className={`${styles.verticalMenuItem} ${location.pathname.startsWith('/contest') ? styles.selected : ''}`}
              >
                {getMenuIcon('/contest', <MdTimer className={styles.menuIcon} />, <MdOutlineTimer className={styles.menuIcon} />)}
                <div className={styles.label}>Contest</div>
              </Link>
              <Link
                to="/machines"
                className={`${styles.verticalMenuItem} ${location.pathname.startsWith('/machines') ? styles.selected : ''}`}
              >
                {getMenuIcon('/machines', <PiComputerTowerFill className={styles.menuIcon} />, <PiComputerTowerLight className={styles.menuIcon} />)}
                <div className={styles.label}>Machines</div>
              </Link>
            </li>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
