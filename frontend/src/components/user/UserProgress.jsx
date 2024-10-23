import React, { useEffect, useState } from 'react';
import { getUserProgress } from '../../api/axiosInstance';

const UserProgress = () => {
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserProgress = async () => {
    try {
      const data = await getUserProgress();
      setProgress(data.progress);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user progress:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProgress();
  }, []);

  if (loading) {
    return <p>Loading user progress...</p>;
  }

  return (
    <div className="user-progress">
      <h2>Your Progress</h2>
      {progress.length === 0 ? (
        <p>No progress data available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Machine</th>
              <th>Contest</th>
              <th>Hints Used</th>
              <th>EXP Earned</th>
              <th>Completed</th>
              <th>Time Spent (s)</th>
            </tr>
          </thead>
          <tbody>
            {progress.map(entry => (
              <tr key={entry._id}>
                <td>{entry.machine.name}</td>
                <td>{entry.contest ? entry.contest.name : 'Normal Mode'}</td>
                <td>{entry.hintsUsed}</td>
                <td>{entry.expEarned}</td>
                <td>{entry.completed ? 'Yes' : 'No'}</td>
                <td>{entry.timeSpent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserProgress;

