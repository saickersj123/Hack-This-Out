import React, { useState } from 'react';
import styles from '../../assets/scss/leaderboard/LeaderboardTable.module.scss';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import CurrentUserInfo from './CurrentUserInfo'; // Import the new component
import { CurrentUser } from '../../types/CurrentUser'; // Import the CurrentUser interface
import { User } from '../../types/User'; // Import the User interface
import { FaMedal } from "react-icons/fa";
import { Avatar } from '@mui/material';
import { avatarBackgroundColors } from '../../utils/avatars';
import { getAvatarColorIndex } from '../../utils/avatars';

interface LeaderboardTableProps {
    leaderboard: User[];
    currentUser: CurrentUser; // Grouped current user information
}

const ITEMS_PER_PAGE = 8; // Number of users to display per page

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ leaderboard, currentUser }) => {
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate total number of pages
    const totalPages = Math.ceil(leaderboard.length / ITEMS_PER_PAGE);

    // Get users for the current page
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentLeaderboard = leaderboard.slice(startIdx, startIdx + ITEMS_PER_PAGE);

    // Function to handle page changes
    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className={styles.board}>
            <div className={styles.leaderboard_container}>
                <div className={styles.leader_current_user}>
                    <CurrentUserInfo
                        currentUser={currentUser}
                    />
                </div>
                {/* Leaderboard Table */}
                <div className={styles.leaderboard_table}>
                    {currentLeaderboard.length > 0 ? (
                        currentLeaderboard.map((user, index) => {
                            const avatarColorIndex = getAvatarColorIndex(user.username);
                            const avatarBgColor = avatarBackgroundColors[avatarColorIndex];
                            return (
                                <div className={styles.leaderboard_data} key={`${user._id}-${index}`}>
                                    <div className={styles.leaderboard_rank}>
                                        {/* 메달 아이콘과 순위 번호 함께 표시 */}
                                        {startIdx + index + 1 === 1 ? (
                                            <>
                                                <FaMedal className={styles.goldMedal} size='clamp(24px, 4vw, 32px)' />
                                                <span className={styles.high_rank}>{startIdx + index + 1}</span>
                                            </>
                                        ) : startIdx + index + 1 === 2 ? (
                                            <>
                                                <FaMedal className={styles.silverMedal} size='clamp(24px, 4vw, 32px)' />
                                                <span className={styles.high_rank}>{startIdx + index + 1}</span>
                                            </>
                                        ) : startIdx + index + 1 === 3 ? (
                                            <>
                                                <FaMedal className={styles.bronzeMedal} size='clamp(24px, 4vw, 32px)' />
                                                <span className={styles.high_rank}>{startIdx + index + 1}</span>
                                            </>
                                        ) : (
                                            `${startIdx + index + 1}` // 4위 이후는 순위만 표시
                                        )}
                                    </div>
                                    <div className={styles.leaderboard_level}>LV. {user.level}</div>
                                    <div className={styles.leaderboard_userinfo}>
                                        <Avatar className={styles.leaderboard_avatar} alt={user.username} sx={{ backgroundColor: avatarBgColor }}>
                                            {user.username.charAt(0).toUpperCase()}
                                        </Avatar>
                                        <div className={styles.leaderboard_username}>{user.username}</div>
                                    </div>
                                    <div className={styles.leaderboard_exp}>{user.exp}</div>
                                </div>
                            );
                        })
                    ) : (
                        <div key="no-users-found">
                            <div className="no-data">No users found</div>
                        </div>
                    )}
                </div>

                {/* Pagination Buttons */}
                <div className={styles.pagination}>
                    <button
                        className={styles.page_button}
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <IoIosArrowBack />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            className={`${styles.number_button} ${currentPage === i + 1 ? styles.active : ''}`}
                            onClick={() => handlePageChange(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        className={styles.page_button}
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <IoIosArrowForward />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LeaderboardTable;
