import React, { useEffect, useState } from 'react';
import { getContests } from '../../api/axiosInstance';
import { Link } from 'react-router-dom';

const ContestList = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContests = async () => {
    try {
      const data = await getContests(); // Implement getContests in axiosInstance.jsx
      setContests(data.contests);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching contests:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContests();
  }, []);

  if (loading) {
    return <p>Loading contests...</p>;
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

