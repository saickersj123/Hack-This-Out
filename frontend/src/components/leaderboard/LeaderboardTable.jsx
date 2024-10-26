import React from 'react';
import '../../assets/scss/leaderboard/LeaderboardTable.scss';


const LeaderboardTable = ( {rankings} ) => {

    return (
        
            <div className='leaderboard-container'>
                <div className='leaderboard-title'>Leaderboard</div>
                <table className="leaderboard-table">
                    <thead>
                        <tr>
                            <th className="rank-col">Rank</th>
                            <th className="user-col">User</th>
                            <th className="exp-col">Exp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rankings.length > 0 ? (
                            rankings.map((user, index) => (
                                <tr key={user._id}>
                                    <td className="rank-col">{index + 1}</td>
                                    <td className="user-col">{user.name}</td>
                                    <td className="exp-col">{user.exp}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="no-data">No users found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
    );
}

export default LeaderboardTable;
