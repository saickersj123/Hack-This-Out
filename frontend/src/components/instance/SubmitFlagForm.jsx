// frontend/src/components/SubmitFlagForm.jsx
import React, { useState } from 'react';
import { submitFlag } from '../../api/axiosInstance';

const SubmitFlagForm = ({ instanceId }) => {
  const [flag, setFlag] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmitFlag = async (e) => {
    e.preventDefault();
    if (!flag) {
      alert('Please enter a flag.');
      return;
    }

    setLoading(true);
    try {
      const response = await submitFlag(instanceId, flag);
      alert(response.msg || 'Flag submitted successfully.');
      // Optionally, update instance status or redirect
    } catch (error) {
      console.error('Error submitting flag:', error);
      // Display the error message returned from the backend
      if (error.msg) {
        alert(error.msg);
      } else if (error.errors) {
        // Handle validation errors
        const errorMessages = error.errors.map(err => err.msg).join('\n');
        alert(errorMessages);
      } else {
        alert('Failed to submit flag.');
      }
    } finally {
      setLoading(false);
      setFlag('');
    }
  };

  return (
    <form onSubmit={handleSubmitFlag}>
      <h4>Submit Flag</h4>
      <div>
        <input
          type="text"
          value={flag}
          onChange={(e) => setFlag(e.target.value)}
          placeholder="Enter your flag"
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Flag'}
      </button>
    </form>
  );
};

export default SubmitFlagForm;