import React, { useState, useRef, useEffect } from 'react';
import { createMachine } from '../../api/axiosInstance';
import '../../assets/scss/machine/AddMachineForm.scss';

const AddMachineForm = ({ onMachineAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    hints: [''], // Initialize hints as an array with one empty string
    hintCosts: [''], // Initialize hintCosts as an array with one empty string
    exp: '',
    amiId: '',
    flag: '', // Added flag field
  });
  const [loading, setLoading] = useState(false);
  
  // Ref for the info textarea
  const descriptionRef = useRef(null);

  const { name, category, description, hints, hintCosts, exp, amiId, flag } = formData;

  // Function to adjust textarea height
  const adjustTextareaHeight = () => {
    if (descriptionRef.current) {
      descriptionRef.current.style.height = 'auto'; // Reset height
      descriptionRef.current.style.width = '250px';
      descriptionRef.current.style.height = `${descriptionRef.current.scrollHeight}px`; // Set to scrollHeight
    }
  };

  // useEffect to adjust height when info changes
  useEffect(() => {
    adjustTextareaHeight();
  }, [description]);

  const handleChange = (e) => {
    const { name, value, dataset } = e.target;

    if (name.startsWith('hint-cost-')) { // Check for 'hint-cost-' first
      const index = parseInt(dataset.index, 10);
      const newHintCosts = [...hintCosts];
      newHintCosts[index] = value;
      setFormData({ ...formData, hintCosts: newHintCosts });
    } else if (name.startsWith('hint-')) { // Then check for 'hint-'
      const index = parseInt(dataset.index, 10);
      const newHints = [...hints];
      newHints[index] = value;
      setFormData({ ...formData, hints: newHints });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddHintField = () => {
    setFormData({ 
      ...formData, 
      hints: [...hints, ''], 
      hintCosts: [...hintCosts, ''] // Add corresponding hint cost
    });
  };

  const handleDeleteHintField = (index) => {
    const newHints = hints.filter((_, i) => i !== index);
    const newHintCosts = hintCosts.filter((_, i) => i !== index);
    setFormData({ 
      ...formData, 
      hints: newHints,
      hintCosts: newHintCosts 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !category || !amiId || !flag) { // Include flag in validation
      alert('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const filteredHints = hints.filter(hint => hint.trim() !== '');
      const filteredHintCosts = hintCosts
        .slice(0, filteredHints.length)
        .map(cost => parseInt(cost) || 0);
      const data = await createMachine({
        name,
        category,
        description, 
        hints: filteredHints,
        hintCosts: filteredHintCosts, // Include hint costs
        exp: exp ? parseInt(exp) : 0,
        amiId,
        flag, 
      });
      alert('Machine registered successfully.');
      setFormData({
        name: '',
        category: '',
        description: '',
        hints: [''],
        hintCosts: [''],
        exp: '',
        amiId: '',
        flag: '', 
      });
      if (onMachineAdded) onMachineAdded(data.machine);
    } catch (error) {
      console.error('Error registering machine:', error);
      alert(error.msg || 'Failed to register machine.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className='add-machine-form' onSubmit={handleSubmit}>
      <h2>Register a New Machine</h2>
      <div>
        <label htmlFor="name">Name<span style={{ color: 'red' }}> *</span>:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="Enter the machine name"
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
          <option value="Crypto">Crypto</option>
          <option value="Cloud">Cloud</option>
          <option value="AI">AI</option>
          <option value="OS">OS</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={handleChange}
          placeholder="Enter machine description"
          ref={descriptionRef} // Attach ref to textarea
          style={{
            overflow: 'hidden',
            resize: 'none',
          }}
        ></textarea>
      </div>
      <div>
        <label>Hints:</label>
        {hints.map((hint, index) => (
          <div key={index} className="hint-field">
            <input
              type="text"
              name={`hint-${index}`}
              data-index={index}
              value={hint}
              onChange={handleChange}
              placeholder={`Hint ${index + 1}`}
            />
            <input
              type="number"
              name={`hint-cost-${index}`}
              data-index={index}
              value={hintCosts[index]}
              onChange={handleChange}
              placeholder={`Cost for Hint ${index + 1}`}
              min="0"
            />
            {hints.length > 1 && (
              <button type="button" onClick={() => handleDeleteHintField(index)}>
                Delete
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={handleAddHintField}>Add Hint</button>
      </div>
      <div>
        <label htmlFor="exp">Experience Points (EXP): </label>
        <input
          type="number"
          id="exp"
          name="exp"
          value={exp}
          onChange={handleChange}
          placeholder="Enter the EXP"
          min="50"
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
      <div>
        <label htmlFor="flag">Flag<span style={{ color: 'red' }}> *</span>:</label> {/* Added label */}
        <input
          type="text"
          id="flag"
          name="flag"
          value={flag}
          onChange={handleChange}
          placeholder="Enter the flag"
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
