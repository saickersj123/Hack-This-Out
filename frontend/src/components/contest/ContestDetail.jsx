import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getContestDetails, participateInContest, submitFlagForContest, getHintInContest, getUserContestParticipation } from '../../api/axiosInstance';

const ContestDetail = () => {
  const { contestId } = useParams();
  const [contest, setContest] = useState(null);
  const [participation, setParticipation] = useState(null);
  const [selectedMachine, setSelectedMachine] = useState('');
  const [flag, setFlag] = useState('');
  const [hint, setHint] = useState(null);
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchContestDetails = async () => {
    setIsLoading(true);
    try {
      const data = await getContestDetails(contestId);
      setContest(data.contest);
    } catch (error) {
      console.error('Error fetching contest details:', error);
      setErrors([{ msg: 'Failed to load contest details.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const checkParticipation = async () => {
    try {
      // Implement an API to check if the user has already participated
      const data = await getUserContestParticipation(contestId); // Assume this function exists
      setParticipation(data.participation);
    } catch (error) {
      console.error('Error checking participation:', error);
    }
  };

  useEffect(() => {
    fetchContestDetails();
    checkParticipation();
  }, [contestId]);

  const handleParticipate = async () => {
    setErrors([]);
    setMessage('');
    try {
      const data = await participateInContest(contestId, selectedMachine);
      setParticipation(data.participation);
      setMessage(data.msg);
      // Refetch contest details or update state accordingly
      await fetchContestDetails();
    } catch (error) {
      setErrors(error.errors || [{ msg: error.msg }]);
    }
  };

  const handleSubmitFlag = async (e) => {
    e.preventDefault();
    setErrors([]);
    setMessage('');
    try {
      const data = await submitFlagForContest(contestId, participation.machine, flag);
      setMessage(`Flag submitted successfully! Earned EXP: ${data.expEarned}. Total EXP: ${data.totalExp}`);
    } catch (error) {
      setErrors(error.errors || [{ msg: error.msg }]);
    }
  };

  const handleUseHint = async () => {
    setErrors([]);
    setMessage('');
    try {
      const data = await getHintInContest(contestId, participation.machine);
      setHint(data.hint);
      setMessage(`Hint used. Current hints used: ${data.hintsUsed}`);
    } catch (error) {
      setErrors(error.errors || [{ msg: error.msg }]);
    }
  };

  if (isLoading) {
    return <p>Loading contest details...</p>;
  }

  if (!contest) {
    return <p>Loading contest details...</p>;
  }

  return (
    <div className="contest-detail">
      <h2>{contest.name}</h2>
      <p>{contest.description}</p>
      <p>Start Time: {new Date(contest.startTime).toLocaleString()}</p>
      <p>End Time: {new Date(contest.endTime).toLocaleString()}</p>

      {errors.length > 0 && (
        <div className="error-messages">
          {errors.map((error, idx) => (
            <p key={idx} className="error">{error.msg}</p>
          ))}
        </div>
      )}

      {message && <p className="message">{message}</p>}

      {!participation ? (
        <div className="participation-form">
          <h3>Participate in Contest</h3>
          <label>Select Machine:</label>
          <select value={selectedMachine} onChange={(e) => setSelectedMachine(e.target.value)} required>
            <option value="">--Select Machine--</option>
            {contest.machines.map(machine => (
              <option key={machine._id} value={machine._id}>{machine.name}</option>
            ))}
          </select>
          <button onClick={handleParticipate}>Participate</button>
        </div>
      ) : (
        <div className="contest-actions">
          <h3>Contest Actions</h3>
          <form onSubmit={handleSubmitFlag}>
            <label>Submit Flag:</label>
            <input type="text" value={flag} onChange={(e) => setFlag(e.target.value)} required />
            <button type="submit">Submit Flag</button>
          </form>
          <button onClick={handleUseHint}>Use Hint</button>
          {hint && <p>Hint: {hint}</p>}
        </div>
      )}

      <h3>Participating Machines:</h3>
      <ul>
        {contest.machines.map(machine => (
          <li key={machine._id}>
            <Link to={`/machines/${machine._id}`}>{machine.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContestDetail;
