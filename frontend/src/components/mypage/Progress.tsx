import { useEffect, useState } from "react";
import { getUserProgress } from "../../api/axiosUser";
import { getContestParticipations } from "../../api/axiosContest";
import LoadingIcon from "../public/LoadingIcon";
import ErrorIcon from "../public/ErrorIcon";
import { UserProgressItem, ContestParticipationItem } from "../../types/Progress";
import { formatDate } from "../../utils/dateUtils";
import { Avatar } from "@mui/material";
import { avatarBackgroundColors } from "../../utils/avatars";
import { getAvatarColorIndex } from "../../utils/avatars";

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
                            <tr>
                                <th>{/*avatar*/}</th>
                                <th>Machine Name</th>
                                <th>EXP Earned</th>
                                <th>Time Spent (s)</th>
                                <th>Hints Used</th>
                                <th>Completed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userProgress.map((progress) => {
                                const avatarColorIndex = getAvatarColorIndex(progress.machine.name);
                                const avatarBgColor = avatarBackgroundColors[avatarColorIndex];
                                return (
                                <tr key={progress._id}>
                                    <td><Avatar 
                                        variant="rounded" 
                                        sx={{ backgroundColor: avatarBgColor, width: 40, height: 40 }}>
                                        {progress.machine.name.charAt(0).toUpperCase()}
                                        </Avatar>
                                        </td>
                                    <td>{progress.machine.name}</td>
                                    <td>{progress.expEarned}</td>
                                    <td>{progress.timeSpent}</td>
                                    <td>{progress.hintsUsed}</td>
                                    <td>{progress.completedAt ? formatDate(progress.completedAt) : "Given up"}</td>
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
                        <tr>
                            <th>{/*avatar*/}</th>
                            <th>Contest Name</th>
                            <th>Start Time</th>
                            <th>Completed</th>
                            <th>EXP Earned</th>
                            <th>Machines Completed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contestParticipation.map((participation) => {
                            const avatarColorIndex = getAvatarColorIndex(participation.contest.name);
                            const avatarBgColor = avatarBackgroundColors[avatarColorIndex];
                            return (
                            <tr key={participation._id}>
                                <td><Avatar 
                                    variant="rounded" 
                                    sx={{ backgroundColor: avatarBgColor, width: 40, height: 40 }}>
                                    {participation.contest.name.charAt(0).toUpperCase()}
                                    </Avatar>
                                    </td>
                                <td>{participation.contest.name}</td>
                                <td>{formatDate(participation.participationStartTime)}</td>
                                <td>
                                    {participation.participationEndTime
                                        ? formatDate(participation.participationEndTime)
                                        : "Given up"}
                                </td>
                                <td>{participation.expEarned}</td>
                                <td>
                                    {participation.machineCompleted.length > 0
                                        ? participation.machineCompleted.map((machine) => machine.name).join(", ")
                                        : "None"}
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
