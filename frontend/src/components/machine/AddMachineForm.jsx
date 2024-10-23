import React, { useState } from 'react';
import { createMachine } from '../../api/axiosInstance';

const AddMachineForm = ({ onMachineAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    info: '',
    exp: '',
    amiId: '',
  });
  const [loading, setLoading] = useState(false);

  const { name, category, info, exp, amiId } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !category || !amiId) {
      alert('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      const data = await createMachine({
        name,
        category,
        info,
        exp: exp ? parseInt(exp) : 0,
        amiId,
      });
      alert('Machine created successfully.');
      setFormData({
        name: '',
        category: '',
        info: '',
        exp: '',
        amiId: '',
      });
      if (onMachineAdded) onMachineAdded(data.machine);
    } catch (error) {
      console.error('Error creating machine:', error);
      alert(error.msg || 'Failed to create machine.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register a New Machine</h2>
      <div>
        <label htmlFor="name">Name<span style={{ color: 'red' }}> *</span>:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="category">Category<span style={{ color: 'red' }}> *</span>:</label>
        <select id="category" name="category" value={category} onChange={handleChange} required>
          <option value="">--Select Category--</option>
          <option value="Web">Web</option>
          <option value="Network">Network</option>
          <option value="Database">Database</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="info">Info:</label>
        <textarea
          id="info"
          name="info"
          value={info}
          onChange={handleChange}
          placeholder="Enter machine description"
        ></textarea>
      </div>
      <div>
        <label htmlFor="exp">Experience Points (EXP):</label>
        <input
          type="number"
          id="exp"
          name="exp"
          value={exp}
          onChange={handleChange}
          min="0"
        />
      </div>
      <div>
        <label htmlFor="amiId">AMI ID<span style={{ color: 'red' }}> *</span>:</label>
        <input
          type="text"
          id="amiId"
          name="amiId"
          value={amiId}
          onChange={handleChange}
          placeholder="e.g., ami-0abcdef1234567890"
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Registering...' : 'Register Machine'}
      </button>
    </form>
  );
};

export default AddMachineForm;