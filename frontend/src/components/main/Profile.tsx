import React, { useContext } from 'react';
import { logoutUser } from '../../api/axiosUser';
import { useNavigate } from 'react-router-dom';
import { AuthUserContext } from '../../contexts/AuthUserContext';
import styles from '../../assets/scss/section/_profile.module.scss';
import { useProfileContext } from '../../contexts/ProfileContext';

import { FaArrowRightToBracket } from "react-icons/fa6";

import down_arrow from '../../assets/img/icon/down_arrow.svg';
import up_arrow from '../../assets/img/icon/up_arrow.svg';
import chat from '../../assets/img/icon/chat_icon.svg';
import setting from '../../assets/img/icon/setting_icon.svg';
import personal_info from '../../assets/img/icon/personal_info.svg';
import darkmode_icon from '../../assets/img/icon/darkmode_icon.svg';
import darkmode_switch from '../../assets/img/icon/darkmode_switch.svg';
import { Avatar } from '@mui/material';
import { avatarBackgroundColors, getAvatarColorIndex } from '../../utils/avatars';

interface MenuItemProps {
    onClick?: () => void;
    children: React.ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, children }) => (
    <div onClick={onClick}>{children}</div>
);

const Profile: React.FC = () => {
    const { isProfileCollapsed, toggleProfile } = useProfileContext();

    const navigate = useNavigate();
    const authUserContext = useContext(AuthUserContext);

    if (!authUserContext) {
        throw new Error('AuthUserContext must be used within an AuthUserProvider');
    }

    const { currentUser, logout } = authUserContext;

    const handleLogout = async () => {
        try {
            await logoutUser();
            logout();
            navigate('/login');
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Logout failed:', error.message);
                // Optionally, show an error message to the user
            }
        }
    };
    const avatarColorIndex = getAvatarColorIndex(currentUser?.username || '');
    const avatarBgColor = avatarBackgroundColors[avatarColorIndex];

    return (
        <div className={styles.userinfoDark}>
            <div className={styles.userinfoDark_container}>
                <div className={styles.userinfo}>
                    <div className={styles.rectangleParent}>
                        <Avatar
                            sx={{
                                backgroundColor: avatarBgColor, width: 50, height: 50, fontSize: '1.5rem'
                            }}
                        >
                            {currentUser?.username?.charAt(0).toUpperCase() || ''}
                        </Avatar>
                        <div className={styles.userinfoContainer}>
                            <div className={styles.userName}>{currentUser?.username || 'Guest'}</div>
                            <div className={styles.userEmail}>{currentUser?.email || 'Guest'}</div>
                        </div>
                    </div>
                    <div onClick={toggleProfile}>
                        <img className={styles.userinfoButtonIcon} alt="" src={isProfileCollapsed ? down_arrow : up_arrow} />
                    </div>
                </div>
            </div>
            <div className={`${styles.userMenu} ${isProfileCollapsed ? styles.collapsed : ''}`}>
                <li className={styles.settings}>
                    <div className={styles.settingsInner}>
                        <div className={styles.rectangleParent}>
                            <img className={styles.icon} alt="" src={personal_info} />
                            <MenuItem onClick={() => navigate('/mypage')}>개인정보 수정</MenuItem>
                        </div>
                    </div>
                    <div className={styles.settingsInner}>
                        <div className={styles.rectangleParent}>
                            <img className={styles.icon} alt="" src={chat} />
                            <div className={styles.dashboard}>Messages</div>
                        </div>
                    </div>
                    <div className={styles.settingsInner}>
                        <div className={styles.rectangleParent}>
                            <img className={styles.icon} alt="" src={setting} />
                            <div className={styles.lianaParker}>Settings</div>
                        </div>
                    </div>
                    <div className={styles.settingsInner}>
                        <div className={styles.rectangleParent}>
                            <img className={styles.icon} alt="" src={darkmode_icon} />
                            <div className={styles.darkModeParent}>
                                <div className={styles.darkMode}>Dark mode</div>
                            </div>
                        </div>
                        <img className={styles.switchIcon} alt="" src={darkmode_switch} />
                    </div>
                </li>
                <div className={styles.userinfoDarkChild} />
                <div className={styles.logout}>
                    <FaArrowRightToBracket className={styles.logout_icon} size={30} />
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </div>
            </div>
        </div >
    );
};

export default Profile;