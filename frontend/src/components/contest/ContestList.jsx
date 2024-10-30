import React, { useEffect, useState } from 'react';
import { getContests } from '../../api/axiosInstance';
import { Link } from 'react-router-dom';

const ContestList = () => {
  const [contests, setContests] = useState(null); // 초기 상태를 null로 설정
  const [loading, setLoading] = useState(true);

  const fetchContests = async () => {
    try {
      const data = await getContests(); // Implement getContests in axiosInstance.jsx
      setContests(data?.contests || []); // 데이터가 없으면 빈 배열로 설정
    } catch (error) {
      console.error('Error fetching contests:', error);
      setContests([]); // 오류 발생 시 빈 배열로 설정
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContests();
  }, []);

  if (loading) {
    return <p>Loading contests...</p>;
  }

  if (!contests || !contests.length) { // undefined 또는 빈 배열 체크
    return <p>No contests available at the moment.</p>;
  }

  return (
    <div className="contest-list">
      <h2>Available Contests</h2>
      <Link to="/contests/create" className="create-contest-button">Create New Contest</Link>
      <ul>
        {contests.map(contest => (
          <li key={contest._id}>
            <Link to={`/contests/${contest._id}`}>{contest.name}</Link>
            <p>{contest.description}</p>
            <p>Start: {new Date(contest.startTime).toLocaleString()}</p>
            <p>End: {new Date(contest.endTime).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContestList;
