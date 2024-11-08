import React, { useState, useContext, useCallback } from 'react';
import { logoutUser } from '../../api/axiosUser';
import { useNavigate } from 'react-router-dom';
import { AuthUserContext } from '../../contexts/AuthUserContext';
import profileIcon from '../../assets/img/icon/profile_default.png';
import arrowIcon from '../../assets/img/icon/down_arrow.png';

interface MenuItemProps {
    onClick?: () => void;
    children: React.ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, children }) => (
    <li onClick={onClick}>{children}</li>
);

const Profile: React.FC = () => {
    const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const authUserContext = useContext(AuthUserContext);

    if (!authUserContext) {
        throw new Error('AuthUserContext must be used within an AuthUserProvider');
    }

    const { currentUser, logout } = authUserContext;

    const toggleMenu = useCallback(() => {
        setMenuOpen(prev => !prev);
    }, []);

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

    return (
        <div className="profile">
            <div className="notification-wrapper">
                {/*notification*/}
            </div>
            <div className="profile-wrapper">
                <button id="profileButton" type="button" className="menuButton" onClick={toggleMenu}>
                    <span className="profile_first">
                        <img className="profile_icon" alt="profile_icon" src={profileIcon} />
                    </span>
                    <span className="userNametext">
                        <p>{currentUser?.username || 'Guest'}</p>
                    </span>
                    <img src={arrowIcon} alt="arrow_icon" className="arrow-icon" />
                </button>
                {isMenuOpen && (
                    <div className="profile-menu">
                        <ul>
                            <MenuItem onClick={() => navigate('/mypage')}>개인정보 수정</MenuItem>
                            <hr />
                            <MenuItem>언어: 한국어</MenuItem>
                            <MenuItem>설정</MenuItem>
                            <MenuItem>고객센터</MenuItem>
                            <hr />
                            <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
