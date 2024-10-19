import React, { useState, useEffect } from 'react';
import { getLoginUser, logoutUser } from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import profileIcon from '../../assets/img/icon/profile_default.png';
import arrowIcon from '../../assets/img/icon/down_arrow.png';
import bell from '../../assets/img/icon/notification-bell.png';

const Profile = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [users, setUser] = useState([]);
    const navigate = useNavigate();
    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const loginUser = await getLoginUser();
                console.log('Login status:', loginUser);
                setUser([loginUser]);
            } catch (error) {
                console.error('Error checking login status:', error.message || error);
            }
        };

        checkLoginStatus();
    }, []);

    const handleLogout = async () => {
        try {
            await logoutUser();
            // Redirect to the home page or login page after successful logout
            window.location.href = '/';
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
                        {users.map((user) => (
                            <p key={user.user_id}>{user.user_id}</p>
                        ))}
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
