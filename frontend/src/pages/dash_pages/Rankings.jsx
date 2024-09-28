import React, { useState, useEffect } from 'react';
import Main from '../../components/section/Main';
import '../../css/Rankings.scss';

const Rankings = () => {
    const [rankings, setRankings] = useState([]);

    // 유저 데이터를 가져오는 useEffect
    useEffect(() => {
        fetch('http://localhost:5000/api/user', {
            method: 'GET',
            credentials: "include"
        })
            .then((res) => res.json())
            .then(res => {
                // 경험치(exp) 기준으로 내림차순 정렬
                const sortedRankings = res.sort((a, b) => b.exp - a.exp);
                setRankings(sortedRankings); // 정렬된 데이터로 상태 업데이트
            })
            .catch(err => console.error('Error fetching user rankings:', err));
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
}

export default Rankings;
