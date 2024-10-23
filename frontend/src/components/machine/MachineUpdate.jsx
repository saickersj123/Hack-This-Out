import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMachineDetails, updateMachine } from '../../api/axiosInstance'; // Ensure these functions exist

const MachineUpdate = () => {
  const { machineId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    info: '',
    exp: 0,
    amiId: '',
    flag: '',
  });
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState('');

  const fetchMachineDetails = async () => {
    try {
      const data = await getMachineDetails(machineId);
      setFormData({
        name: data.machine.name,
        category: data.machine.category,
        info: data.machine.info,
        exp: data.machine.exp,
        amiId: data.machine.amiId,
        flag: '', // Leave blank for security
      });
    } catch (error) {
      console.error('Error fetching machine details:', error);
    }
  };

  useEffect(() => {
    fetchMachineDetails();
  }, [machineId]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setMessage('');
    try {
      const updatedData = { ...formData };
      if (!updatedData.flag) {
        delete updatedData.flag; // Do not update flag if it's empty
      }
      const data = await updateMachine(machineId, updatedData);
      setMessage(data.msg);
      navigate(`/machines/${machineId}`);
    } catch (error) {
      if (error.errors) {
        setErrors(error.errors);
      } else if (error.msg) {
        setErrors([{ msg: error.msg }]);
      } else {
        setErrors([{ msg: 'Failed to update machine.' }]);
      }
    }
  };

  return (
    <div className="update-machine">
      <h2>Update Machine</h2>
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
          <label>Machine Name:</label>
          <input type="text" name="name" value={formData.name} onChange={onChange} required />
        </div>
        <div>
          <label>Category:</label>
          <select name="category" value={formData.category} onChange={onChange} required>
            <option value="">--Select Category--</option>
            <option value="Web">Web</option>
            <option value="Network">Network</option>
            <option value="Database">Database</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label>Info:</label>
          <textarea name="info" value={formData.info} onChange={onChange} />
        </div>
        <div>
          <label>EXP:</label>
          <input type="number" name="exp" value={formData.exp} onChange={onChange} min="0" required />
        </div>
        <div>
          <label>AMI ID:</label>
          <input type="text" name="amiId" value={formData.amiId} onChange={onChange} required />
        </div>
        <div>
          <label>Flag:</label>
          <input type="text" name="flag" value={formData.flag} onChange={onChange} />
          <small>Leave blank if you do not want to update the flag.</small>
        </div>
        <button type="submit">Update Machine</button>
      </form>
    </div>
  );
};

export default MachineUpdate;

