// Sidebar.tsx
import React from 'react';
import styles from '../../assets/scss/section/_sidebar.module.scss';
import logo from "../../assets/img/icon/HTO DARK RECOLORED_crop_filled.png";
import menu_open from "../../assets/img/icon/menu_open.png";
import tutorial from "../../assets/img/icon/tutorial.svg";
import leaderboard from "../../assets/img/icon/leaderboard.svg";
import contest from "../../assets/img/icon/contest.svg";
import machines from "../../assets/img/icon/machines.svg";

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleSidebar }) => {
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
              <div className={styles.verticalMenuItem}>
                <img className={styles.menuIcon} alt="" src={tutorial} />
                <div className={styles.label}>Tutorial</div>
              </div>
              <div className={styles.verticalMenuItem}>
                <img className={styles.menuIcon} alt="" src={leaderboard} />
                <div className={styles.label}>LeaderBoard</div>
              </div>
              <div className={styles.verticalMenuItem}>
                <img className={styles.menuIcon} alt="" src={contest} />
                <div className={styles.label}>Contest</div>
              </div>
              <div className={styles.verticalMenuItem}>
                <img className={styles.menuIcon} alt="" src={machines} />
                <div className={styles.label}>Machines</div>
              </div>
            </li>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Sidebar;