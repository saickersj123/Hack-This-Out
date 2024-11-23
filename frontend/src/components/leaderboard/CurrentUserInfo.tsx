import React from 'react';
import styles from '../../assets/scss/leaderboard/CurrentUserInfo.module.scss';
import { CurrentUser } from '../../types/CurrentUser';
import { Avatar } from '@mui/material';
import { avatarBackgroundColors, getAvatarColorIndex } from '../../utils/avatars';
import { getRankBadge, rankBadges } from '../../utils/badge';
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
                {/*replace numeric rank with badge */}
                <div className={styles.user_rank}>
                    <Avatar 
                        src={rankBadges[getRankBadge(myRank)]} 
                        sx={{ width: 'clamp(80px, 4vw, 96px)', height: 'clamp(80px, 4vw, 96px)' }} 
                    />
                    <span className={styles.high_rank}>#{myRank}</span>
                </div>
                <div className={styles.user_level}><b>LVL. {myLevel}</b></div>
                <div className={styles.info_container}>
                    <Avatar alt={myUsername || ''} sx={{ 
                        backgroundColor: avatarBgColor,
                        width: 'clamp(64px, 8vw, 80px)', 
                        height: 'clamp(64px, 8vw, 80px)', 
                        fontSize: '3rem' 
                    }}>
                        {myUsername?.charAt(0).toUpperCase() || ''}
                    </Avatar>
                    <div className={styles.user_name}>{myUsername}</div>
                </div>
                <div className={styles.user_exp}>{myExp} EXP</div>
            </div>
        </div>
    );
};

export default CurrentUserInfo;