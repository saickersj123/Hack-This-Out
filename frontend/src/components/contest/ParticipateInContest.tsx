import React, { useState, useEffect } from 'react';
import { participateInContest, getContestDetails } from '../../api/axiosContest';
import { useNavigate, useParams } from 'react-router-dom';

interface Machine {
  _id: string;
  name: string;
}

interface ContestDetails {
  contest: {
    machines: Machine[];
    // Add other contest-related fields if necessary
  };
}

interface ParticipateResponse {
  msg: string;
}

interface ParticipateError {
  msg: string;
}

const ParticipateInContest: React.FC = () => {
  const { contestId } = useParams<{ contestId: string }>();
  const [machines, setMachines] = useState<Machine[]>([]);
  const [selectedMachine, setSelectedMachine] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [errors, setErrors] = useState<ParticipateError[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContestMachines = async () => {
      if (!contestId) {
        setErrors([{ msg: 'Contest ID is missing.' }]);
        return;
      }

      try {
        const data: ContestDetails = await getContestDetails(contestId);
        setMachines(data.contest.machines);
      } catch (error: any) {
        console.error('Error fetching contest machines:', error);
        setErrors([{ msg: 'Failed to fetch contest machines.' }]);
      }
    };

    fetchContestMachines();
  }, [contestId]);

  const handleParticipate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);
    setMessage('');

    if (!contestId) {
      setErrors([{ msg: 'Contest ID is missing.' }]);
      return;
    }

    if (!selectedMachine) {
      setErrors([{ msg: 'Please select a machine to participate.' }]);
      return;
    }

    try {
      const data: ParticipateResponse = await participateInContest(contestId);
      setMessage(data.msg);
      navigate(`/contests/${contestId}`);
    } catch (error: any) {
      if (error.errors && Array.isArray(error.errors)) {
        setErrors(error.errors);
      } else if (error.msg) {
        setErrors([{ msg: error.msg }]);
      } else {
        setErrors([{ msg: 'An unexpected error occurred.' }]);
      }
    }
  };

  return (
    <div className="participate-in-contest">
      <h2>Participate in Contest</h2>
      {errors.length > 0 && (
        <div className="error-messages">
          {errors.map((error, idx) => (
            <p key={idx} className="error">
              {error.msg}
            </p>
          ))}
        </div>
      )}
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleParticipate}>
        <div>
          <label htmlFor="machine-select">Select Machine:</label>
          <select
            id="machine-select"
            value={selectedMachine}
            onChange={(e) => setSelectedMachine(e.target.value)}
            required
          >
            <option value="">--Select Machine--</option>
            {machines.map((machine) => (
              <option key={machine._id} value={machine._id}>
                {machine.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Participate</button>
      </form>
    </div>
  );
};

export default ParticipateInContest;

