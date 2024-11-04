import React, { useEffect, useState } from 'react';
import { getContests } from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import formatDate from '../../utils/dateUtils';

interface Contest {
  _id: string;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  contestExp: number;
  isActive: boolean;
}

interface ContestsResponse {
  contests: Contest[];
}

const ContestList: React.FC = () => {
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const fetchContests = async () => {
    try {
      // Assuming getContests returns a response matching ContestsResponse
      const data: ContestsResponse = await getContests();
      setContests(data.contests);
    } catch (error) {
      console.error('Error fetching contests:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContests();
  }, []);

  const handleContestClick = (contestId: string) => {
    navigate(`/contest/${contestId}`);
  };

  if (loading) {
    return <p>Loading contests...</p>;
  }

  return (
    <div className='contest-list-container'>
      <div className='contest-list-title'>
        <h2>Contest List</h2>
      </div>
      <table className='contest-list-table'>
        {contests.length === 0 ? (
          <tbody>
            <tr>
              <td colSpan={7} className="no-data">No contests available.</td>
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
                <th className='contest-details'>Details</th>
              </tr>
            </thead>
            <tbody>
              {contests.map((contest) => (
                <tr key={contest._id}>
                  <td>{contest.name || 'N/A'}</td>
                  <td>{contest.description || 'N/A'}</td>
                  <td>{contest.startTime ? formatDate(contest.startTime) : 'N/A'}</td>
                  <td>{contest.endTime ? formatDate(contest.endTime) : 'N/A'}</td>
                  <td>{contest.contestExp}</td>
                  <td>{contest.isActive ? 'Yes' : 'No'}</td>
                  <td>
                    <button onClick={() => handleContestClick(contest._id)}>Details</button>
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

