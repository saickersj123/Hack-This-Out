import React from 'react';
import { Link } from 'react-router-dom';
import { useSidebar } from '../../contexts/SidebarContext.tsx';

import { MdOutlineLeaderboard } from "react-icons/md";
import { MdLeaderboard } from "react-icons/md";
import { FaQuestionCircle } from "react-icons/fa";
import { FaRegQuestionCircle } from "react-icons/fa";
import { MdOutlineTimer } from "react-icons/md";
import { MdTimer } from "react-icons/md";
import { PiComputerTowerLight } from "react-icons/pi";
import { PiComputerTowerFill } from "react-icons/pi";
import { RiArrowLeftDoubleFill } from "react-icons/ri";


import styles from '../../assets/scss/section/_sidebar.module.scss';
import logo from "../../assets/img/icon/HTO DARK RECOLORED_crop_filled.png";
import collapsed_logo from '../../assets/img/icon/HTO ICON DARK RECOLORED_crop_fill.png';

// SidebarProps 타입을 명시
interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleSidebar }) => {
  const { selectedItem, setSelectedItem } = useSidebar();

  // 클릭된 항목을 선택된 상태로 설정하는 함수
  const handleMenuItemClick = (item: string) => {
    setSelectedItem(item);
  };

  return (
    <div className={`${styles.sidebarMenu} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.headerParent}>
        <div className={styles.header}>
          <div className={styles.logoimage}>
            <img className={styles.logoContainerIcon} alt="" src={logo} />
          </div>
          <div className={styles.sidebarMenuButton}>
            <button className={styles.collapse_button} onClick={toggleSidebar}>
              {isCollapsed ? (
                <img className={styles.icon_logo} src={collapsed_logo} />
              ) : (
                <RiArrowLeftDoubleFill size={40}/>
              )}
            </button>
          </div>
        </div>
        <div className={styles.headerParent}>
          <div className={styles.topMenu}>
            <li className={styles.verticalMenuList}>
              <Link
                to="/tutorial"
                className={`${styles.verticalMenuItem} ${selectedItem === 'tutorial' ? styles.selected : ''}`}
                onClick={() => handleMenuItemClick('tutorial')}
              >
                {selectedItem === 'tutorial' ? (
                  <FaQuestionCircle className={styles.menuIcon} />
                ) : (
                  <FaRegQuestionCircle className={styles.menuIcon} />
                )}
                <div className={styles.label}>Tutorial</div>
              </Link>
              <Link
                to="/leaderboard"
                className={`${styles.verticalMenuItem} ${selectedItem === 'leaderboard' ? styles.selected : ''}`}
                onClick={() => handleMenuItemClick('leaderboard')}
              >
                {selectedItem === 'leaderboard' ? (
                  <MdLeaderboard className={styles.menuIcon} />  // 선택되었을 때
                ) : (
                  <MdOutlineLeaderboard className={styles.menuIcon} />  // 선택되지 않았을 때
                )}
                <div className={styles.label}>LeaderBoard</div>
              </Link>
              <Link
                to="/contest"
                className={`${styles.verticalMenuItem} ${selectedItem === 'contest' ? styles.selected : ''}`}
                onClick={() => handleMenuItemClick('contest')}
              >
                {selectedItem === 'contest' ? (
                  <MdTimer className={styles.menuIcon} />  // 선택되었을 때
                ) : (
                  <MdOutlineTimer className={styles.menuIcon} />  // 선택되지 않았을 때
                )}
                <div className={styles.label}>Contest</div>
              </Link>
              <Link
                to="/machines"
                className={`${styles.verticalMenuItem} ${selectedItem === 'machines' ? styles.selected : ''}`}
                onClick={() => handleMenuItemClick('machines')}
              >
                {selectedItem === 'machines' ? (
                  <PiComputerTowerFill className={styles.menuIcon} />  // 선택되었을 때
                ) : (
                  <PiComputerTowerLight className={styles.menuIcon} />  // 선택되지 않았을 때
                )}
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
