import React from 'react';
import styles from '../../assets/scss/leaderboard/CurrentUserInfo.module.scss';
import { CurrentUser } from '../../types/CurrentUser';
import { Avatar } from '@mui/material';
import { avatarBackgroundColors, getAvatarColorIndex } from '../../utils/avatars';
interface CurrentUserInfoProps {
    currentUser: CurrentUser;
}

const CurrentUserInfo: React.FC<CurrentUserInfoProps> = ({ currentUser }) => {
    const { myRank, myLevel, myExp, myUsername } = currentUser;

    if (myRank === null) return null;
    const avatarColorIndex = getAvatarColorIndex(currentUser.myUsername || '');
    const avatarBgColor = avatarBackgroundColors[avatarColorIndex];

    return (
        <div className={styles.user_box}>
            <div className={styles.current_user_container}>
                <div className={styles.user_rank}>#{myRank || 'Unranked'}</div>
                <div className={styles.user_level}>LV. {myLevel}</div>
                <div className={styles.info_container}>
                    <Avatar alt={myUsername || ''} sx={{ 
                        backgroundColor: avatarBgColor,
                        width: 90, 
                        height: 90, 
                        fontSize: '3rem' 
                    }}>
                        {myUsername?.charAt(0).toUpperCase() || ''}
                    </Avatar>
                    <div className={styles.user_name}>{myUsername}</div>
                </div>
                <div className={styles.user_exp}>Exp. {myExp}</div>
            </div>
        </div>
    );
};

export default CurrentUserInfo;