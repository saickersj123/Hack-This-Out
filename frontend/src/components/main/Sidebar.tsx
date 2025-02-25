import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdOutlineLeaderboard, MdLeaderboard } from "react-icons/md";
import { FaQuestionCircle, FaRegQuestionCircle } from "react-icons/fa";
import { PiComputerTowerBold, PiComputerTowerFill } from "react-icons/pi";
import { RiArrowLeftDoubleFill, RiArrowRightDoubleFill } from "react-icons/ri";
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import EmojiEventsIconRounded from '@mui/icons-material/EmojiEventsRounded';
import styles from '../../assets/scss/section/_sidebar.module.scss';
import logo from "../../assets/img/icon/HTO DARK RECOLORED_crop_filled.png";
import collapsed_logo from '../../assets/img/icon/HTO ICON DARK RECOLORED_crop_fill.png';

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: (forceCollapse?: boolean) => void; // toggleSidebar가 강제 설정을 허용하도록 변경
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleSidebar }) => {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  const [isAutoCollapsed, setIsAutoCollapsed] = useState(false); // 자동 collapse 여부 추적

  // 화면 크기 감지 및 isCollapsed 상태 변경
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1000 && !isCollapsed) {
        toggleSidebar(true); // 강제로 collapse 상태로 변경
        setIsAutoCollapsed(true); // 자동 collapse 상태 기록
      } else if (window.innerWidth > 1000 && isAutoCollapsed) {
        toggleSidebar(false); // 강제로 확장 상태로 변경
        setIsAutoCollapsed(false); // 자동 collapse 상태 해제
      }
    };

    // 초기 실행 (마운트 시 한 번 적용)
    handleResize();

    // 리스너 등록
    window.addEventListener('resize', handleResize);

    // 리스너 정리
    return () => window.removeEventListener('resize', handleResize);
  }, [isCollapsed, toggleSidebar, isAutoCollapsed]);
  
  // URL을 기반으로 현재 선택된 메뉴 확인
  const getMenuIcon = (path: string, iconActive: React.ReactElement, iconInactive: React.ReactElement) => {
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
              onClick={() => {
                toggleSidebar();
                setIsAutoCollapsed(false); // 사용자가 수동으로 변경했음을 기록
                setIsHovered(false);
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {isCollapsed && isHovered && <RiArrowRightDoubleFill className={styles.collapse_icon_open} size={40} />}
              {isCollapsed && !isHovered && (
                <img
                  className={styles.icon_logo}
                  src={collapsed_logo}
                  alt="Collapsed Logo"
                />
              )}
              {!isCollapsed && <RiArrowLeftDoubleFill className={styles.collapse_icon_close} size={40} />}
            </button>
          </div>
        </div>
        <div className={styles.headerParent}>
          <div className={styles.topMenu}>
            <li className={styles.verticalMenuList}>
              <Link
                to="/tutorial"
                className={`${styles.verticalMenuItem} ${location.pathname.startsWith('/tutorial') ? styles.selected : ''}`}
                data-tooltip="Tutorial"
              >
                {getMenuIcon('/tutorial', <FaQuestionCircle className={styles.menuIcon} />, <FaRegQuestionCircle className={styles.menuIcon} />)}
                <div className={styles.label}>How to Play</div>
              </Link>
              <Link
                to="/leaderboard"
                className={`${styles.verticalMenuItem} ${location.pathname.startsWith('/leaderboard') ? styles.selected : ''}`}
                data-tooltip="LeaderBoard"
              >
                {getMenuIcon('/leaderboard', <MdLeaderboard className={styles.menuIcon} />, <MdOutlineLeaderboard className={styles.menuIcon} />)}
                <div className={styles.label}>LeaderBoard</div>
              </Link>
              <Link
                to="/contest"
                className={`${styles.verticalMenuItem} ${location.pathname.startsWith('/contest') ? styles.selected : ''}`}
                data-tooltip="Contests"
              >
                {getMenuIcon('/contest', <EmojiEventsIconRounded className={styles.menuIcon} />, <EmojiEventsOutlinedIcon className={styles.menuIcon} />)}
                <div className={styles.label}>Contests</div>
              </Link>
              <Link
                to="/machine"
                className={`${styles.verticalMenuItem} ${location.pathname.startsWith('/machine') ? styles.selected : ''}`}
                data-tooltip="Machines"
              >
                {getMenuIcon('/machine', <PiComputerTowerFill className={styles.menuIcon} />, <PiComputerTowerBold className={styles.menuIcon} />)}
                <div className={styles.label}>Machines</div>
              </Link>
            </li>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;