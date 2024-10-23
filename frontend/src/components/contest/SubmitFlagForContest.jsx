import React, { useState } from 'react';
import { submitFlagForContest } from '../../api/axiosInstance';
import { useParams } from 'react-router-dom';

const SubmitFlagForContest = () => {
  const { contestId, machineId } = useParams();
  const [flag, setFlag] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmitFlag = async (e) => {
    e.preventDefault();
    setErrors([]);
    setMessage('');
    try {
      const data = await submitFlagForContest(contestId, machineId, flag);
      setMessage(data.msg);
    } catch (error) {
      setErrors(error.errors || [{ msg: error.msg }]);
    }
  };

  return (
    <div className="submit-flag-for-contest">
      <h2>Submit Flag</h2>
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
          <input type="text" value={flag} onChange={(e) => setFlag(e.target.value)} required />
        </div>
        <button type="submit">Submit Flag</button>
      </form>
    </div>
  );
};

export default SubmitFlagForContest;

