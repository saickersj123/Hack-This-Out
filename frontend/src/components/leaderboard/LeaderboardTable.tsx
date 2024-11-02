import React from 'react';
import '../../assets/scss/leaderboard/LeaderboardTable.scss';

interface User {
    _id: string;
    level: number;
    name: string;
    exp: number;
}

interface LeaderboardTableProps {
    leaderboard: User[];
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ leaderboard }) => {
    return (
        <div className='leaderboard-container'>
            <div className='leaderboard-title'>Leaderboard</div>
            <table className="leaderboard-table">
                <thead>
                    <tr>
                        <th className="rank-col">Rank</th>
                        <th className="level-col">Level</th>
                        <th className="user-col">User</th>
                        <th className="exp-col">Exp</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.length > 0 ? (
                        leaderboard.map((user, index) => (
                            <tr key={`${user._id}-${index}`}>
                                <td className="rank-col">{index + 1}</td>
                                <td className="level-col">{user.level}</td>
                                <td className="user-col">{user.name}</td>
                                <td className="exp-col">{user.exp}</td>
                            </tr>
                        ))
                    ) : (
                        <tr key="no-users-found">
                            <td colSpan={4} className="no-data">No users found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default LeaderboardTable;
