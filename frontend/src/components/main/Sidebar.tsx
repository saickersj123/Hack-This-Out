import React from 'react';
import { Link } from 'react-router-dom';
import { useSidebar } from '../../contexts/SidebarContext.tsx';

import styles from '../../assets/scss/section/_sidebar.module.scss';
import logo from "../../assets/img/icon/HTO DARK RECOLORED_crop_filled.png";
import menu_open from "../../assets/img/icon/menu_open.png";
import tutorial from "../../assets/img/icon/tutorial.svg";
import leaderboard from "../../assets/img/icon/leaderboard.svg";
import contest from "../../assets/img/icon/contest.svg";
import machines from "../../assets/img/icon/machines.svg";

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
            <button onClick={toggleSidebar}>
              <img className={styles.menuIcon} alt="" src={menu_open} />
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
                <img className={styles.menuIcon} alt="" src={tutorial} />
                <div className={styles.label}>Tutorial</div>
              </Link>
              <Link
                to="/leaderboard"
                className={`${styles.verticalMenuItem} ${selectedItem === 'leaderboard' ? styles.selected : ''}`}
                onClick={() => handleMenuItemClick('leaderboard')}
              >
                <img className={styles.menuIcon} alt="" src={leaderboard} />
                <div className={styles.label}>LeaderBoard</div>
              </Link>
              <Link
                to="/contest"
                className={`${styles.verticalMenuItem} ${selectedItem === 'contest' ? styles.selected : ''}`}
                onClick={() => handleMenuItemClick('contest')}
              >
                <img className={styles.menuIcon} alt="" src={contest} />
                <div className={styles.label}>Contest</div>
              </Link>
              <Link
                to="/machines"
                className={`${styles.verticalMenuItem} ${selectedItem === 'machines' ? styles.selected : ''}`}
                onClick={() => handleMenuItemClick('machines')}
              >
                <img className={styles.menuIcon} alt="" src={machines} />
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
