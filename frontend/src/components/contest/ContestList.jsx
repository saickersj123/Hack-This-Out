import React, { useEffect, useState } from 'react';
import { getContests } from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import formatDate from '../../utils/dateUtils';

const ContestList = () => {
  const [contests, setContests] = useState(null); // 초기 상태를 null로 설정
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchContests = async () => {
    try {
      //const data = await getActiveContests();
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

  const handleContestClick = (contest) => {
    navigate(`/contest/${contest._id}`);
  };

  if (loading) {
    return <p>Loading contests...</p>;
  }

  if (!contests || !contests.length) { // undefined 또는 빈 배열 체크
    return <p>No contests available at the moment.</p>;
  }

  return (
    <div className='contest-list-container'>
      <div className='contest-list-title'> <h2>Contest List</h2> </div>
        <table className='contest-list-table'>
          {contests.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan="6" className="no-data">No contests available.</td>
              </tr>
            </tbody>
          ) : (
            <>
              <thead>
                <tr>
                  <th className='contest-name'>Name</th>
                  <th className='contest-description'>Description</th>
                  <th className='contest-startTime'>Start Time</th>
                  <th className='contest-endTime'>End Time</th>
                  <th className='contest-contestExp'>Reward</th>
                  <th className='contest-isActive'>Active</th>
                  <th className='contest-details'></th>
                </tr>
              </thead>
              <tbody>
                {contests.map((contest) => (
                  <tr key={contest._id}>
                    <td>{contest.name}</td>
                    <td>{contest.description}</td>
                    <td>{formatDate(contest.startTime)}</td>
                    <td>{formatDate(contest.endTime)}</td>
                    <td>{contest.contestExp}</td>
                    <td>{contest.isActive ? 'Yes' : 'No'}</td>
                    <td>
                      <button onClick={() => handleContestClick(contest)}>Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          )}
        </table>
    </div>
  );
};

export default ContestList;
