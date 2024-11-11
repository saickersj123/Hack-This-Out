import React, { useState } from 'react';
import styles from '../../assets/scss/leaderboard/LeaderboardTable.module.scss';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import user_default from '../../assets/img/icon/profile_default.png';
import CurrentUserInfo from './CurrentUserInfo'; // Import the new component
import { CurrentUser } from '../../types/CurrentUser'; // Import the CurrentUser interface
import { User } from '../../types/User'; // Import the User interface


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
                {/* Current user information */}
                <CurrentUserInfo
                    currentUser={currentUser}
                />

                {/* Leaderboard Table */}
                <div className={styles.leaderboard_table}>
                    {currentLeaderboard.length > 0 ? (
                        currentLeaderboard.map((user, index) => (
                            <div className={styles.leaderboard_data} key={`${user._id}-${index}`}>
                                <div className={styles.leaderboard_rank}>#{startIdx + index + 1}</div>
                                <div className={styles.leaderboard_level}>LV. {user.level}</div>
                                <div className={styles.leaderboard_userinfo}>
                                    <img className={styles.leaderboard_avatar} alt="User Avatar" src={user.avatar || user_default} />
                                    <div className={styles.leaderboard_username}>{user.username}</div>
                                </div>
                                <div className={styles.leaderboard_exp}>{user.exp}</div>
                            </div>
                        ))
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
