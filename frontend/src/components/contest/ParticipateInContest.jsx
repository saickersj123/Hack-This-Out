import React, { useState, useEffect } from 'react';
import { participateInContest, getContestDetails } from '../../api/axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';

const ParticipateInContest = () => {
  const { contestId } = useParams();
  const [machines, setMachines] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const fetchContestMachines = async () => {
    try {
      // Assume there's an API endpoint to get contest details including machines
      const data = await getContestDetails(contestId); // Implement getContestDetails
      setMachines(data.contest.machines);
    } catch (error) {
      console.error('Error fetching contest machines:', error);
    }
  };

  useEffect(() => {
    fetchContestMachines();
  }, [contestId]);

  const handleParticipate = async (e) => {
    e.preventDefault();
    setErrors([]);
    try {
      const data = await participateInContest(contestId, selectedMachine);
      setMessage(data.msg);
      navigate(`/contests/${contestId}`);
    } catch (error) {
      setErrors(error.errors || [{ msg: error.msg }]);
    }
  };

  return (
    <div className="participate-in-contest">
      <h2>Participate in Contest</h2>
      {errors.length > 0 && (
        <div className="error-messages">
          {errors.map((error, idx) => (
            <p key={idx} className="error">{error.msg}</p>
          ))}
        </div>
      )}
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleParticipate}>
        <div>
          <label>Select Machine:</label>
          <select value={selectedMachine} onChange={(e) => setSelectedMachine(e.target.value)} required>
            <option value="">--Select Machine--</option>
            {machines.map(machine => (
              <option key={machine._id} value={machine._id}>{machine.name}</option>
            ))}
          </select>
        </div>
        <button type="submit">Participate</button>
      </form>
    </div>
  );
};

export default ParticipateInContest;

