import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMachineDetails, MachinesubmitFlag, useHint } from '../../api/axiosInstance';

const MachineDetail = () => {
  const { machineId } = useParams();
  const [machineData, setMachineData] = useState(null);
  const [flag, setFlag] = useState('');
  const [hint, setHint] = useState(null);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState([]);

  const fetchMachineDetails = async () => {
    try {
      const data = await getMachineDetails(machineId); // Implement getMachineDetails in axiosInstance.jsx
      setMachineData(data.machine);
    } catch (error) {
      console.error('Error fetching machine details:', error);
    }
  };

  useEffect(() => {
    fetchMachineDetails();
  }, [machineId]);

  const handleSubmitFlag = async (e) => {
    e.preventDefault();
    setErrors([]);
    setMessage('');
    try {
      const data = await MachinesubmitFlag(machineId, flag);
      setMessage(`Flag submitted successfully! Earned EXP: ${data.expEarned}. Total EXP: ${data.totalExp}`);
    } catch (error) {
      setErrors(error.errors || [{ msg: error.msg }]);
    }
  };

  const handleUseHint = async () => {
    setErrors([]);
    setMessage('');
    try {
      const data = await useHint(machineId);
      setHint(data.hint);
      setMessage(`Hint used. Penalty applied.`);
    } catch (error) {
      setErrors(error.errors || [{ msg: error.msg }]);
    }
  };

  if (!machineData) {
    return <p>Loading machine details...</p>;
  }

  return (
    <div className="machine-detail">
      <h2>{machineData.name}</h2>
      <p>Category: {machineData.category}</p>
      <p>Info: {machineData.info}</p>
      <p>EXP: {machineData.exp}</p>
      <p>Repute: {machineData.repute}</p>
      {/* Display reviews if needed */}
      <Link to={`/machines/${machineId}/reviews`}>View Reviews</Link>

      {errors.length > 0 && (
        <div className="error-messages">
          {errors.map((error, idx) => (
            <p key={idx} className="error">{error.msg}</p>
          ))}
        </div>
      )}
      {message && <p className="message">{message}</p>}
      {hint && <p className="hint">Hint: {hint}</p>}

      <form onSubmit={handleSubmitFlag}>
        <label>Submit Flag:</label>
        <input type="text" value={flag} onChange={(e) => setFlag(e.target.value)} required />
        <button type="submit">Submit Flag</button>
      </form>
      <button onClick={handleUseHint}>Use Hint</button>
      <div className="play-buttons">
        <Link to={`/play/${machineId}`}>
          <button>Play Machine</button>
        </Link>
      </div>
    </div>
  );
};

export default MachineDetail;
