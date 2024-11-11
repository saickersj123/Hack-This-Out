import React, { useState } from 'react';
import styles from '../../assets/scss/leaderboard/LeaderboardTable.module.scss';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

import user_default from '../../assets/img/icon/profile_default.png';

interface User {
    _id: string;
    level: number;
    username: string;
    exp: number;
    avatar: string;
}

interface LeaderboardTableProps {
    leaderboard: User[];
    current_user: User | null;
}

const ITEMS_PER_PAGE = 8; // 한 페이지에 보여줄 사용자 수

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ leaderboard, current_user }) => {
    const [currentPage, setCurrentPage] = useState(1);

    // 현재 사용자 랭킹을 계산
    const currentUserRank = current_user
        ? leaderboard.findIndex(user => user.username === current_user.username) + 1
        : null;

    // 전체 페이지 수 계산
    const totalPages = Math.ceil(leaderboard.length / ITEMS_PER_PAGE);

    // 현재 페이지에 맞는 사용자 목록 계산
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentLeaderboard = leaderboard.slice(startIdx, startIdx + ITEMS_PER_PAGE);

    // 페이지 변경 함수
    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className={styles.board}>
            <div className={styles.leaderboard_container}>
                {/* Current user information */}
                {current_user && (
                    <div className={styles.current_user_container}>
                        <div className={styles.user_rank}>#{currentUserRank || 'Unranked'} </div>
                        <div className={styles.user_level}>LV. {current_user?.level}</div>
                        <div className={styles.info_container}>
                            <img className={styles.user_avatar} alt="" src={current_user?.avatar || user_default} />
                            <div className={styles.user_name}>{current_user?.username}</div>
                        </div>
                        <div className={styles.user_exp}>Exp. {current_user?.exp}</div>
                    </div>
                )}
                {/* Leaderboard Table */}
                <div className={styles.leaderboard_table}>
                    {currentLeaderboard.length > 0 ? (
                        currentLeaderboard.map((user, index) => (
                            <div className={styles.leaderboard_data} key={`${user._id}-${index}`}>
                                <div className={styles.leaderboard_rank}>#{startIdx + index + 1}</div>
                                <div className={styles.leaderboard_level}>LV. {user.level}</div>
                                <div className={styles.leaderboard_userinfo}>
                                    <img className={styles.leaderboard_avatar} alt="" src={user?.avatar || user_default} />
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

                    {/* 페이지네이션 버튼 */}
                    <div className={styles.pagination}>
                        <button className={styles.page_button} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                            <IoIosArrowBack />
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button key={i} className={`page_number ${currentPage === i + 1 ? 'active' : ''}`} onClick={() => handlePageChange(i + 1)}>
                                {i + 1}
                            </button>
                        ))}
                        <button className={styles.page_button} onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                            <IoIosArrowForward />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeaderboardTable;
