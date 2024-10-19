import React, { useState, useEffect } from 'react';
import '../../assets/scss/ranking/RankingTable.scss';
import { getAllUser } from '../../api/axiosInstance';

const RankingTable = () => {
    const [rankings, setRankings] = useState([]);

    const fetchUserRankings = async () => {
        try {
            const users = await getAllUser();
            const sortedRankings = users.sort((a, b) => b.exp - a.exp);
            setRankings(sortedRankings);
        } catch (error) {
            console.error('Error fetching user rankings:', error.message || error);
        }
    };

    useEffect(() => {
        fetchUserRankings();

        const intervalId = setInterval(() => {
            fetchUserRankings();
        }, 300000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className='ranking-container'>
            <div className='ranking-title'>Ranking</div>
            <table className="ranking-table">
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

export default RankingTable;
