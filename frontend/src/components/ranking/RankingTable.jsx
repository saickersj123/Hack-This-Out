import React, { useState, useEffect } from 'react';
import Main from '../../components/section/Main';
import '../../assets/scss/ranking/RankingTable.scss';
import { getAllUser } from '../../api/axiosInstance';

const RankingTable = () => {
    const [rankings, setRankings] = useState([]);

    const fetchUserRankings = async () => {
        try {
            const response = await getAllUser();
            // Extract the data property which contains the users array
            const users = response.data;

            // Ensure that users is an array
            if (Array.isArray(users)) {
                const sortedRankings = users.sort((a, b) => b.exp - a.exp);
                setRankings(sortedRankings);
            } else {
                console.error('Unexpected data format:', users);
                setRankings([]);
            }
        } catch (error) {
            console.error('Error fetching user rankings:', error.message || error);
            setRankings([]);
        }
    };

    useEffect(() => {
        fetchUserRankings(); // Initial fetch

        const intervalId = setInterval(() => {
            fetchUserRankings(); // Fetch every 5 minutes
        }, 300000);

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    return (
        <Main title="Rankings" description="Rankings 화면입니다.">
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
                                    <td className="rank-col">{index + 1}</td> {/* 순위는 index + 1 */}
                                    <td className="user-col">{user.name}</td> {/* 유저 이름 */}
                                    <td className="exp-col">{user.exp}</td> {/* 경험치 */}
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
        </Main>
    );
};

export default RankingTable;
