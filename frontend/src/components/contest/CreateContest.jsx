import React, { useState } from 'react';
import { createContest } from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

const CreateContest = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startTime: '',
    endTime: '',
    machines: [],
    contestExp: 0,
  });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const { name, description, startTime, endTime, machines, contestExp } = formData;

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
    try {
      const contestData = {
        name,
        description,
        startTime,
        endTime,
        machines,
        contestExp: parseInt(contestExp, 10),
      };
      const data = await createContest(contestData);
      alert(data.msg);
      navigate('/contests');
    } catch (error) {
      if (error.errors) {
        setErrors(error.errors);
      } else if (error.msg) {
        setErrors([{ msg: error.msg }]);
      } else {
        setErrors([{ msg: 'Failed to create contest.' }]);
      }
    }
  };

  return (
    <div className="create-contest">
      <h2>Create New Contest</h2>
      {errors.length > 0 && (
        <div className="error-messages">
          {errors.map((error, idx) => (
            <p key={idx} className="error">
              {error.msg}
            </p>
          ))}
        </div>
      )}
      <form onSubmit={onSubmit}>
        <div>
          <label>Contest Name:</label>
          <input type="text" name="name" value={name} onChange={onChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={description} onChange={onChange} />
        </div>
        <div>
          <label>Start Time:</label>
          <input type="datetime-local" name="startTime" value={startTime} onChange={onChange} required />
        </div>
        <div>
          <label>End Time:</label>
          <input type="datetime-local" name="endTime" value={endTime} onChange={onChange} required />
        </div>
        <div>
          <label>Machines:</label>
          <select name="machines" multiple value={machines} onChange={onChange} required>
            {/* Populate with available machines */}
            {/* Example:
                <option value="machineId1">Machine 1</option>
                <option value="machineId2">Machine 2</option>
            */}
          </select>
        </div>
        <div>
          <label>Contest EXP:</label>
          <input type="number" name="contestExp" value={contestExp} onChange={onChange} min="0" required />
        </div>
        <button type="submit">Create Contest</button>
      </form>
    </div>
  );
};

export default CreateContest;

