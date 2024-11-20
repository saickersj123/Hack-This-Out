import { useEffect, useState } from "react";
import { getMyRank } from "../../api/axiosUser";
import { CurrentUser } from "../../types/CurrentUser";
import ErrorIcon from "../public/ErrorIcon";
import LoadingIcon from "../public/LoadingIcon";
import { Avatar, Badge, Box, Typography, CircularProgress } from "@mui/material";
import { avatarBackgroundColors, getAvatarColorIndex } from "../../utils/avatars";
import { styled } from "@mui/material/styles";

// Import all badge frame SVGs
import frame1 from '../../assets/img/level/Level_1.svg';
import frame2 from '../../assets/img/level/Level_2.svg';
import frame3 from '../../assets/img/level/Level_3.svg';
import frame4 from '../../assets/img/level/Level_4.svg';
import frame5 from '../../assets/img/level/Level_5.svg';
import frame6 from '../../assets/img/level/Level_6.svg';
import frame7 from '../../assets/img/level/Level_7.svg';
import frame8 from '../../assets/img/level/Level_8.svg';
import frame9 from '../../assets/img/level/Level_9.svg';

// Import all rank badge SVGs
import rank1 from '../../assets/img/badge/1.svg';
import rank2 from '../../assets/img/badge/2.svg';
import rank3 from '../../assets/img/badge/3.svg';
import rank4 from '../../assets/img/badge/4.svg';
import rank5 from '../../assets/img/badge/5.svg';
import rank6 from '../../assets/img/badge/6.svg';
import rank7 from '../../assets/img/badge/7.svg';
import rank8 from '../../assets/img/badge/8.svg';
import rank9 from '../../assets/img/badge/9.svg';

// Mapping of frame numbers to imported SVGs
const levelFrames: { [key: number]: string } = {
    1: frame1,
    2: frame2,
    3: frame3,
    4: frame4,
    5: frame5,
    6: frame6,
    7: frame7,
    8: frame8,
    9: frame9,
};

// Mapping of rank ranges to badge frames
const rankBadges: { [key: number]: string } = {
    // Example: Top 1-10 ranks use frame1, 11-20 use frame2, etc.
    1: rank9,
    2: rank8,
    3: rank7,
    4: rank6,
    5: rank5,
    6: rank4,
    7: rank3,
    8: rank2,
    9: rank1,
};

// Define the props for StyledBadge to include the frame number
interface StyledBadgeProps {
    frame: number;
}

// StyledBadge component that dynamically changes the badge frame based on the `frame` prop
const StyledBadge = styled(Badge)<StyledBadgeProps>(() => ({
    '& .MuiBadge-badge': {
        backgroundColor: 'transparent',
        padding: 0, // Remove default padding
        minHeight: 'auto',
        minWidth: 'auto',
        borderRadius: '50%', // Ensure the badge is circular
        // Adjust the size of the badge as needed
        width: 180,
        height: 180,
        position: 'absolute',
        top: -125, // ****************!! Adjust this value to position the badge !!***************
        left: -125, // ****************!! Adjust this value to position the badge !!***************
        '& img': {
            width: '100%',
            height: '100%',
            objectFit: 'contain',
        },
    },
}));

const UserStats = () => {
    const [myStats, setMyStats] = useState<CurrentUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await getMyRank();
                setMyStats({
                    _id: response.user._id,
                    myRank: response.myRank,
                    myLevel: response.user.level,
                    myExp: response.user.exp,
                    myUsername: response.user.username,
                    myAvatar: response.user.avatar,
                });
            } catch (err: any) {
                setError(err.message || "An error occurred while fetching data.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <LoadingIcon />;
    if (error) return <ErrorIcon />;

    if (!myStats) {
        return <Box>No data available.</Box>;
    }

    const avatarBgColor = avatarBackgroundColors[getAvatarColorIndex(myStats.myUsername || '')];

    // Helper function to determine the experience needed for the next level
    const getNextLevelExp = (currentLevel: number): number => {
        const levels = [
            0, 100, 300, 600, 1000, 1500, 2100, 3000, 4000, 5000,
            6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000
        ]; // Must match backend thresholds
        if (currentLevel < 1) return levels[1];
        if (currentLevel >= levels.length) return levels[levels.length - 1]; // Max level
        return levels[currentLevel];
    };

    const getLevelFrame = (level: number): number => {
        const totalFrames = 9;
        if (level < 1) return 1; // Default to frame 1 for levels below 1
        if (level === 20) return totalFrames; // Assign the last frame for max level
        return ((level - 1) % totalFrames) + 1; // Cycle through frames 1 to 9
    };

    const levelFrame = getLevelFrame(myStats.myLevel || 1);
    const nextLevelExp = getNextLevelExp(myStats.myLevel || 1);
    const expPercentage = ((myStats?.myExp || 0) / nextLevelExp) * 100;

    // Function to determine rank frame based on rank
    const getRankBadge = (rank: number): number => {
        switch (rank) {
            case 1: return 1;
            case 2: return 2;
            case 3: return 3;
            case 4: return 4;
            case 5: return 5;
            case 6: return 6;
            case 7: return 7;
            case 8: return 8;
            default: return 9;
        }
    };

    const rankBadge = getRankBadge(myStats.myRank || 0);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                <Typography variant="h6">{myStats?.myUsername}'s Stats</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                <StyledBadge
                    overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="standard"
                        frame={levelFrame} // Pass the frame number to StyledBadge
                        badgeContent={
                    <img src={levelFrames[levelFrame]}  />
                }
            >
                <Avatar
                    alt={myStats?.myUsername || ''}
                    sx={{
                        backgroundColor: avatarBgColor,
                        width: 110,
                        height: 110,
                        fontSize: '3rem',
                    }}
                >
                    {myStats?.myUsername?.charAt(0).toUpperCase() || ''}
                    </Avatar>
                </StyledBadge>
            </Box>
            <Box sx={{ width: '100%', maxWidth: 300, mt: 4, position: 'relative' }}>
                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                    <CircularProgress
                        variant="determinate"
                        value={Math.min(expPercentage, 100)}
                        size={120}
                        thickness={4}
                        sx={{
                            color: '#1976d2',
                        }}
                        aria-label={`Level ${myStats?.myLevel}, ${Math.round(expPercentage)}% to next level`}
                    />
                    <Box
                        sx={{
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            position: 'absolute',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography variant="h6" component="div" color="textPrimary">
                            Level {myStats?.myLevel}
                        </Typography>
                        <Typography variant="caption" component="div" color="textSecondary">
                            {`${Math.round(expPercentage)}%`}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="h6">#{myStats?.myRank}</Typography>
                <Box>
                    <Avatar
                        src={rankBadges[rankBadge]}
                        sx={{ width: 120, height: 120 }}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default UserStats;