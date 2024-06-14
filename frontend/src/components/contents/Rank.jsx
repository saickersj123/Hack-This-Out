import React from 'react';

const Rank = () => {
  const topRanks = [
    { rank: 1, user: '아', points: 5486 },
    { rank: 2, user: '모', points: 4822 },
    { rank: 3, user: '르', points: 4560 },
    { rank: 4, user: '겠', points: 4406 },
    { rank: 5, user: '다', points: 4120 },
  ];

  return (
    <div className="rank-table-container">
      <div className="ranking-title">Ranking</div>
      <table className="rank-table">
        <thead>
          <tr>
            <th className="rank-col">Rank</th>
            <th className="user-col">User</th>
            <th className="points-col">Points</th>
          </tr>
        </thead>
        <tbody>
          {topRanks.map((rank, index) => (
            <tr className={rank.rank <= 3 ? 'large' : 'small'} key={index}>
              <td className="rank-col">{rank.rank}</td>
              <td className="user-col">{rank.user}</td>
              <td className="points-col">{rank.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Rank;
