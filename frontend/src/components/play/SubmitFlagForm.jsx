import React, { useState } from 'react';
import { submitFlagMachine, submitFlag } from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
const SubmitFlagForm = ({ machineId }) => {
  const [flag, setFlag] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const handleSubmitFlag = async (e) => {
    e.preventDefault();
    setErrors([]);
    setMessage('');

    // Validate that machineId and flag are present
    if (!machineId) {
      setErrors([{ msg: 'Machine ID is missing.' }]);
      return;
    }

    if (!flag.trim()) {
      setErrors([{ msg: 'Flag cannot be empty.' }]);
      return;
    }

    try {
      const machine_response = await submitFlagMachine(machineId, flag);
      const instance_response = await submitFlag(machineId, flag);
      setMessage(machine_response.msg || instance_response.msg || 'Flag submitted successfully!');
      navigate(`/machine/${machineId}`);
    } catch (error) {
      // Handle different error structures
      if (error.response && error.response.data) {
        setErrors(error.response.data.errors || [{ msg: error.response.data.msg || 'An error occurred.' }]);
      } else {
        setErrors([{ msg: 'An unexpected error occurred.' }]);
      }
    }
  };

  return (
    <div className="submit-flag-form">
      <h3>Submit Flag</h3>
      {errors.length > 0 && (
        <div className="error-messages">
          {errors.map((error, idx) => (
            <p key={idx} className="error">{error.msg}</p>
          ))}
        </div>
      )}
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmitFlag}>
        <div>
          <label htmlFor="flag">Flag:</label>
          <input 
            id="flag"
            type="text" 
            value={flag} 
            onChange={(e) => setFlag(e.target.value)}
            placeholder="Enter flag here"
            required 
          />
        </div>
        <button type="submit">Submit Flag</button>
      </form>
    </div>
  );
};

export default SubmitFlagForm;
