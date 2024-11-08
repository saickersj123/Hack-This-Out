import React, { useState } from 'react';
import { submitFlagForContest } from '../../api/axiosContest';
import { useParams } from 'react-router-dom';

type HintError = {
  msg: string;
};

const SubmitFlagForContest: React.FC = () => {
  const { contestId, machineId } = useParams<{ contestId: string; machineId: string }>();
  const [flag, setFlag] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [errors, setErrors] = useState<HintError[]>([]);

  const handleSubmitFlag = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);
    setMessage('');
    try {
      if (!contestId || !machineId) {
        throw { errors: [{ msg: 'Missing contestId or machineId.' }] };
      }
      const data = await submitFlagForContest(contestId, machineId, flag);
      setMessage(data.msg);
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
          <label htmlFor="flag">Flag:</label>
          <input
            type="text"
            id="flag"
            name="flag"
            value={flag}
            onChange={(e) => setFlag(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit Flag</button>
      </form>
    </div>
  );
};

export default SubmitFlagForContest;

