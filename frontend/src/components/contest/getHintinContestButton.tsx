import React, { useState } from 'react';
import { getHintInContest } from '../../api/axiosContest';
import { useParams } from 'react-router-dom';

type HintResponse = {
  hint: string;
  msg: string;
};

type ErrorResponse = {
  msg: string;
};

const GetHintInContestButton: React.FC = () => {
  const { contestId, machineId } = useParams<{ contestId: string; machineId: string }>();
  const [hint, setHint] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');
  const [errors, setErrors] = useState<ErrorResponse[]>([]);

  const handleUseHint = async () => {
    setErrors([]);
    setMessage('');
    try {
      if (!contestId || !machineId) {
        throw { errors: [{ msg: 'Missing contestId or machineId.' }] };
      }
      const data: HintResponse = await getHintInContest(contestId, machineId);
      setHint(data.hint);
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
    <div className="use-hint-in-contest">
      <h2>Use Hint</h2>
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
      {hint && <p className="hint">Hint: {hint}</p>}
      <button onClick={handleUseHint}>Reveal Hint</button>
    </div>
  );
};

export default GetHintInContestButton; 

