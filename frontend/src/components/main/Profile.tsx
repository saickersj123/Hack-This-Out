import React, { useState, useContext, useEffect, useCallback } from 'react';
import { logoutUser, getUserDetail } from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import profileIcon from '../../assets/img/icon/profile_default.png';
import arrowIcon from '../../assets/img/icon/down_arrow.png';
import bell from '../../assets/img/icon/notification-bell.png';

interface UserType {
    name?: string;
    email?: string;
    // Add other user properties as needed
}

interface MenuItemProps {
    onClick?: () => void;
    children: React.ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, children }) => (
    <li onClick={onClick}>{children}</li>
);

const Profile: React.FC = () => {
    const [isMenuOpen, setMenuOpen] = useState<boolean>(false);
    const [user, setUser] = useState<UserType>({ name: '', email: '' });
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }

    const { logout } = authContext;

    const toggleMenu = useCallback(() => {
        setMenuOpen(prev => !prev);
    }, []);

    const fetchUserDetail = async () => {
        try {
            const response = await getUserDetail();
            if (response && response.user) {
                setUser(response.user);
            } else {
                console.error('User data is missing in the response.');
                // Set default user or handle as needed
                setUser({ name: 'Guest', email: 'guest@example.com' });
            }
        } catch (error) {
            console.error('Failed to fetch user details:', error);
            // Optionally, set default user or handle the error
            setUser({ name: 'Guest', email: 'guest@example.com' });
        }
    };

    useEffect(() => {
        fetchUserDetail();
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
                <button id="notification" type="button" className="bell">
                    <img className="bell_icon" alt="bell_icon" src={bell} />
                </button>
            </div>
            <div className="profile-wrapper">
                <button id="profileButton" type="button" className="menuButton" onClick={toggleMenu}>
                    <span className="profile_first">
                        <img className="profile_icon" alt="profile_icon" src={profileIcon} />
                    </span>
                    <span className="userNametext">
                        <p>{user.name || ''}</p>
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
