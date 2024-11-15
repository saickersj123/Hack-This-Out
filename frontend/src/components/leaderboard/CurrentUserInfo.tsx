import React from 'react';
import styles from '../../assets/scss/leaderboard/LeaderboardTable.module.scss';
import user_default from '../../assets/img/icon/profile_default.png';
import { CurrentUser } from '../../types/CurrentUser';

interface CurrentUserInfoProps {
    currentUser: CurrentUser;
}

const CurrentUserInfo: React.FC<CurrentUserInfoProps> = ({ currentUser }) => {
    const { myRank, myLevel, myExp, myUsername, myAvatar } = currentUser;

    if (myRank === null) return null;

    return (
        <div className={styles.current_user_container}>
            <div className={styles.user_rank}>#{myRank || 'Unranked'}</div>
            <div className={styles.user_level}>LV. {myLevel}</div>
            <div className={styles.info_container}>
                <img className={styles.user_avatar} alt="User Avatar" src={myAvatar || user_default} />
                <div className={styles.user_name}>{myUsername}</div>
            </div>
            <div className={styles.user_exp}>Exp. {myExp}</div>
        </div>
    );
};

export default CurrentUserInfo;