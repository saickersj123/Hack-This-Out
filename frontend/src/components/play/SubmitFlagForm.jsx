import React, { useState } from 'react';
import { submitFlag, submitFlagMachine } from '../../api/axiosInstance';

const SubmitFlagForm = ({ machineId, instanceId }) => {
  const [flag, setFlag] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmitFlag = async (e) => {
    e.preventDefault();
    setErrors([]);
    setMessage('');
    try {
      let data;
        data = await submitFlag({ instanceId, flag });
        data = await submitFlagMachine(machineId, flag);
      setMessage(data.msg);
    } catch (error) {
      setErrors(error.errors || [{ msg: error.msg }]);
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
          <label>Flag:</label>
          <input 
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