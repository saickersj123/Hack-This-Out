import React, { useState } from 'react';
import { createMachine } from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

const MachineCreate = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    info: '',
    exp: 0,
    amiId: '',
    flag: '',
  });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const { name, category, info, exp, amiId, flag } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    try {
      const data = await createMachine(formData);
      alert(data.msg);
      navigate('/machines');
    } catch (error) {
      if (error.errors) {
        setErrors(error.errors);
      } else if (error.msg) {
        setErrors([{ msg: error.msg }]);
      } else {
        setErrors([{ msg: 'Failed to create machine.' }]);
      }
    }
  };

  return (
    <div className="create-machine">
      <h2>Create New Machine</h2>
      {errors.length > 0 && (
        <div className="error-messages">
          {errors.map((error, idx) => (
            <p key={idx} className="error">{error.msg}</p>
          ))}
        </div>
      )}
      <form onSubmit={onSubmit}>
        <div>
          <label>Machine Name:</label>
          <input type="text" name="name" value={name} onChange={onChange} required />
        </div>
        <div>
          <label>Category:</label>
          <select name="category" value={category} onChange={onChange} required>
            <option value="">--Select Category--</option>
            <option value="Web">Web</option>
            <option value="Network">Network</option>
            <option value="Database">Database</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label>Info:</label>
          <textarea name="info" value={info} onChange={onChange} />
        </div>
        <div>
          <label>EXP:</label>
          <input type="number" name="exp" value={exp} onChange={onChange} min="0" required />
        </div>
        <div>
          <label>AMI ID:</label>
          <input type="text" name="amiId" value={amiId} onChange={onChange} required />
        </div>
        <div>
          <label>Flag:</label>
          <input type="text" name="flag" value={flag} onChange={onChange} required />
        </div>
        <button type="submit">Create Machine</button>
      </form>
    </div>
  );
};

export default MachineCreate;

