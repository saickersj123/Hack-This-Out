import { useEffect, useState } from "react";
import { getMyRank } from "../../api/axiosUser";
import { CurrentUser } from "../../types/CurrentUser";
import ErrorIcon from "../public/ErrorIcon";
import LoadingIcon from "../public/LoadingIcon";
import { Avatar } from "@mui/material";
import { avatarBackgroundColors } from "../../utils/avatars";
import { getAvatarColorIndex } from "../../utils/avatars";

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

    const avatarColorIndex = getAvatarColorIndex(myStats?.myUsername || '');
    const avatarBgColor = avatarBackgroundColors[avatarColorIndex];

    return (
        <div className="my_stats_container">
            {myStats ? (
                <>
                    <Avatar alt={myStats.myUsername || ''} sx={{ 
                        backgroundColor: avatarBgColor,
                        width: 'clamp(60px, 8vw, 75px)', 
                        height: 'clamp(60px, 8vw, 75px)', 
                        fontSize: '3rem' 
                    }}>
                        {myStats.myUsername?.charAt(0).toUpperCase() || ''}
                    </Avatar>
                    <div>
                        <h3>My Username: {myStats.myUsername}</h3>
                        <h3>My Rank: {myStats.myRank}</h3>
                        <h3>My Level: {myStats.myLevel}</h3>
                        <h3>My Exp: {myStats.myExp}</h3>
                    </div>
                </>
            ) : <div>No data</div>}
        </div>
    );
};

export default UserStats;