import { useEffect, useState } from "react";
import { getUserProgress } from "../../api/axiosUser";
import { getContestParticipations } from "../../api/axiosContest";
import LoadingIcon from "../public/LoadingIcon";
import ErrorIcon from "../public/ErrorIcon";
import { UserProgressItem, ContestParticipationItem } from "../../types/Progress";
import { formatDate } from "../../utils/dateUtils";

const Progress = () => {
    const [userProgress, setUserProgress] = useState<UserProgressItem[]>([]);
    const [contestParticipation, setContestParticipation] = useState<ContestParticipationItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
            <h2>Machine History</h2>
            {userProgress.length > 0 ? (
                <table className="progress-table">
                    <thead>
                        <tr>
                            <th>Machine Name</th>
                            <th>EXP Earned</th>
                            <th>Time Spent (s)</th>
                            <th>Hints Used</th>
                            <th>Completed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userProgress.map((progress) => (
                            <tr key={progress._id}>
                                <td>{progress.machine.name}</td>
                                <td>{progress.expEarned}</td>
                                <td>{progress.timeSpent}</td>
                                <td>{progress.hintsUsed}</td>
                                <td>{progress.completedAt ? formatDate(progress.completedAt) : "Given up"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No machine history available.</p>
            )}

            <h2>Contest History</h2>
            {contestParticipation.length > 0 ? (
                <table className="contest-table">
                    <thead>
                        <tr>
                            <th>Contest Name</th>
                            <th>Start Time</th>
                            <th>Completed</th>
                            <th>EXP Earned</th>
                            <th>Machines Completed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contestParticipation.map((participation) => (
                            <tr key={participation._id}>
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
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No contest history available.</p>
            )}
        </div>
    );
};

export default Progress;
