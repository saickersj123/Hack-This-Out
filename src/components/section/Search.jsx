import React, { useState } from 'react';
import profileIcon from '../../assets/img/icon/profile_default.png';
import arrowIcon from '../../assets/img/icon/down_arrow.png';
import bell from '../../assets/img/icon/notification-bell.png';

const Search = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    return (
        <div id="search">
            <div className="search__inner">
                <label htmlFor="searchInput">
                    <span className="ir">검색</span>
                </label>
                <input
                    type="search"
                    id="searchInput"
                    placeholder="검색어를 입력해주세요"
                    autoComplete="off"
                    className="search__input"
                />
            </div>

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
                        <span className="userNametext">user</span>
                        <img src={arrowIcon} alt="arrow_icon" className="arrow-icon" />
                    </button>
                    {isMenuOpen && (
                        <div className="profile-menu">
                            <ul>
                                <li>개인정보 수정</li>
                                <hr></hr>
                                <li>언어: 한국어</li>
                                <li>설정</li>
                                <li>고객센터</li>
                                <hr></hr>
                                <li>로그아웃</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Search;
