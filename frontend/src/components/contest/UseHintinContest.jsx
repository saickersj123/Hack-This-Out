import React, { useState } from 'react';
import { useHintInContest } from '../../api/axiosInstance';
import { useParams } from 'react-router-dom';

const UseHintInContest = () => {
  const { contestId, machineId } = useParams();
  const [hint, setHint] = useState(null);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState([]);

  const handleUseHint = async () => {
    setErrors([]);
    setMessage('');
    try {
      const data = await useHintInContest(contestId, machineId);
      setHint(data.hint);
      setMessage(data.msg);
    } catch (error) {
      setErrors(error.errors || [{ msg: error.msg }]);
    }
  };

  return (
    <div className="use-hint-in-contest">
      <h2>Use Hint</h2>
      {errors.length > 0 && (
        <div className="error-messages">
          {errors.map((error, idx) => (
            <p key={idx} className="error">{error.msg}</p>
          ))}
        </div>
      )}
      {message && <p className="message">{message}</p>}
      {hint && <p className="hint">Hint: {hint}</p>}
      <button onClick={handleUseHint}>Reveal Hint</button>
    </div>
  );
};

export default UseHintInContest;

