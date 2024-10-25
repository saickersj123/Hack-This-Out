import React, { useState, useContext, useEffect } from 'react';
import { logoutUser, getUserDetail } from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import profileIcon from '../../assets/img/icon/profile_default.png';
import arrowIcon from '../../assets/img/icon/down_arrow.png';
import bell from '../../assets/img/icon/notification-bell.png';

const Profile = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useState([]);
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const fetchUserDetail = async () => {
        const response = await getUserDetail();
        setUser(response.user);
    };

    useEffect(() => {
        fetchUserDetail();
    }, []);

    const handleLogout = async () => {
        try {
            await logoutUser();
            logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
            // Optionally, show an error message to the user
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
                        <p>{user.name}</p>
                    </span>
                    <img src={arrowIcon} alt="arrow_icon" className="arrow-icon" />
                </button>
                {isMenuOpen && (
                    <div className="profile-menu">
                        <ul>
                            <li onClick={() => navigate('/mypage')}>개인정보 수정</li>
                            <hr />
                            <li>언어: 한국어</li>
                            <li>설정</li>
                            <li>고객센터</li>
                            <hr />
                            <li onClick={handleLogout}>로그아웃</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
