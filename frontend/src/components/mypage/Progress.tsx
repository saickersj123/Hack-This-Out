import { useEffect, useState } from "react";
import { getUserProgress } from "../../api/axiosUser";
import { getContestParticipations } from "../../api/axiosContest";
import LoadingIcon from "../public/LoadingIcon";
import ErrorIcon from "../public/ErrorIcon";
import { UserProgressItem, ContestParticipationItem } from "../../types/Progress";
import { formatDate, formatTimeSpent } from "../../utils/dateUtils";
import { Avatar } from "@mui/material";
import { avatarBackgroundColors } from "../../utils/avatars";
import { getAvatarColorIndex } from "../../utils/avatars";
import '../../assets/scss/mypage/Progress.scss';


const Progress = () => {
    const [userProgress, setUserProgress] = useState<UserProgressItem[]>([]);
    const [contestParticipation, setContestParticipation] = useState<ContestParticipationItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<"machine" | "contest">("machine");

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const progressResponse = await getUserProgress();
                setUserProgress(progressResponse.userProgress);
                
                const participationResponse = await getContestParticipations();
                setContestParticipation(participationResponse.participations);
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

    return (
        <div className="progress-container">
            <h2>History</h2>
            <div className="tabs">
                <button
                    className={`tab-button ${activeTab === "machine" ? "active" : ""}`}
                    onClick={() => setActiveTab("machine")}
                >
                    Machine History
                </button>
                <button
                    className={`tab-button ${activeTab === "contest" ? "active" : ""}`}
                    onClick={() => setActiveTab("contest")}
                >
                    Contest History
                </button>
            </div>

            {activeTab === "machine" ? (
                userProgress.length > 0 ? (
                    <table className="progress-table">
                        <thead>
                            <tr className="head-detail">
                                <th className="head-name">Machine Name</th>
                                <th className="head-exp">EXP Earned</th>
                                <th className="head-time">Time Spent</th>
                                <th className="head-hint">Hints Used</th>
                                <th className="head-comp">Completed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userProgress.map((progress) => {
                                const avatarColorIndex = getAvatarColorIndex(progress.machine.name);
                                const avatarBgColor = avatarBackgroundColors[avatarColorIndex];
                                return (
                                <tr className="body-detail" key={progress._id}>
                                    <td className="body-name">
                                        <Avatar 
                                        variant="rounded" 
                                        sx={{ backgroundColor: avatarBgColor, width: 40, height: 40 }}>
                                        {progress.machine.name.charAt(0).toUpperCase()}
                                        </Avatar> {progress.machine.name.charAt(0).toUpperCase() + progress.machine.name.slice(1)}
                                    </td>
                                    <td className="body-exp">{progress.expEarned} EXP</td>
                                    <td className="body-time">{progress.timeSpent === new Date(0) ? "-" : formatTimeSpent(new Date(progress.timeSpent))}</td>
                                    <td className="body-hint">{progress.hintsUsed}</td>
                                    <td className="body-comp">{progress.completedAt ? formatDate(progress.completedAt) : "Not completed"}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                ) : (
                    <p>No machine history available.</p>
                )
            ) : contestParticipation.length > 0 ? (
                <table className="contest-table">
                    <thead>
                        <tr className="head-detail">
                            <th className="head-name">Contest Name</th>
                            <th className="head-time">Start Time</th>
                            <th className="head-comp">Completed</th>
                            <th className="head-exp">EXP Earned</th>
                            <th className="head-machine">Machines Completed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contestParticipation.map((participation) => {
                            const avatarColorIndex = getAvatarColorIndex(participation.contest.name);
                            const avatarBgColor = avatarBackgroundColors[avatarColorIndex];
                            return (
                            <tr className="body-detail" key={participation._id}>
                                <td className="body-name"><Avatar 
                                    variant="rounded" 
                                    sx={{ backgroundColor: avatarBgColor, width: 40, height: 40 }}>
                                    {participation.contest.name.charAt(0).toUpperCase()}
                                    </Avatar> {participation.contest.name.charAt(0).toUpperCase() + participation.contest.name.slice(1)}
                                    </td>
                                <td className="body-time">{formatDate(participation.participationStartTime)}</td>
                                <td className="body-comp">
                                    {participation.participationEndTime
                                        ? formatDate(participation.participationEndTime)
                                        : "On going"}
                                </td>
                                <td className="body-exp">{participation.expEarned === 0 ? "Given up" : `${participation.expEarned} EXP`}</td>
                                <td className="body-machine">
                                    {participation.machineCompleted.length}
                                </td>
                            </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <p>No contest history available.</p>
            )}
        </div>
    );
};

export default Progress;
