import React, { useState, useEffect } from 'react';
import { getContestDetails, updateContest } from '../../api/axiosInstance'; // Ensure getContestDetails exists
import { useParams, useNavigate } from 'react-router-dom';

const UpdateContest = () => {
  const { contestId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startTime: '',
    endTime: '',
    machines: [],
    contestExp: 0,
  });
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState('');

  const fetchContestDetails = async () => {
    try {
      const data = await getContestDetails(contestId);
      setFormData({
        name: data.contest.name,
        description: data.contest.description,
        startTime: new Date(data.contest.startTime).toISOString().slice(0,16),
        endTime: new Date(data.contest.endTime).toISOString().slice(0,16),
        machines: data.contest.machines.map(machine => machine._id),
        contestExp: data.contest.contestExp,
      });
    } catch (error) {
      console.error('Error fetching contest details:', error);
    }
  };

  useEffect(() => {
    fetchContestDetails();
  }, [contestId]);

  const onChange = (e) => {
    if (e.target.name === 'machines') {
      const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
      setFormData({ ...formData, machines: selectedOptions });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setMessage('');
    try {
      const updatedData = {
        ...formData,
        contestExp: parseInt(formData.contestExp, 10),
      };
      const data = await updateContest(contestId, updatedData);
      setMessage(data.msg);
      navigate(`/contests/${contestId}`);
    } catch (error) {
      if (error.errors) {
        setErrors(error.errors);
      } else if (error.msg) {
        setErrors([{ msg: error.msg }]);
      } else {
        setErrors([{ msg: 'Failed to update contest.' }]);
      }
    }
  };

  return (
    <div className="update-contest">
      <h2>Update Contest</h2>
      {errors.length > 0 && (
        <div className="error-messages">
          {errors.map((error, idx) => (
            <p key={idx} className="error">{error.msg}</p>
          ))}
        </div>
      )}
      {message && <p className="message">{message}</p>}
      <form onSubmit={onSubmit}>
        <div>
          <label>Contest Name:</label>
          <input type="text" name="name" value={formData.name} onChange={onChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={onChange} />
        </div>
        <div>
          <label>Start Time:</label>
          <input type="datetime-local" name="startTime" value={formData.startTime} onChange={onChange} required />
        </div>
        <div>
          <label>End Time:</label>
          <input type="datetime-local" name="endTime" value={formData.endTime} onChange={onChange} required />
        </div>
        <div>
          <label>Machines:</label>
          <select name="machines" multiple value={formData.machines} onChange={onChange} required>
            {/* Populate with available machines */}
            {/* Example:
                <option value="machineId1">Machine 1</option>
                <option value="machineId2">Machine 2</option>
            */}
          </select>
        </div>
        <div>
          <label>Contest EXP:</label>
          <input type="number" name="contestExp" value={formData.contestExp} onChange={onChange} min="0" required />
        </div>
        <button type="submit">Update Contest</button>
      </form>
    </div>
  );
};

export default UpdateContest;

