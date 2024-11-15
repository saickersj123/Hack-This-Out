import React, { useEffect, useRef, useState } from 'react';
import { createMachine } from '../../api/axiosMachine';
import { useNavigate } from 'react-router-dom';
import '../../assets/scss/machine/AddMachineForm.scss';
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';

interface MachineFormData {
  name: string;
  category: string;
  amiId: string;
  flag: string;
  description?: string;
  exp?: number;
  hints: string[];
  hintCosts: number[];
}

const AddMachineForm: React.FC = () => {
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [formData, setFormData] = useState<MachineFormData>({
    name: '',
    category: '',
    amiId: '',
    flag: '',
    description: '',
    exp: 50,
    hints: [''],
    hintCosts: [1],
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'exp' || name === 'contestExp' ? Number(value) : value,
    }));
  };

  const handleHintChange = (index: number, value: string) => {
    const newHints = [...formData.hints];
    newHints[index] = value;
    setFormData((prevData) => ({
      ...prevData,
      hints: newHints,
    }));
  };

  const handleHintCostChange = (index: number, value: number) => {
    const newHintCosts = [...formData.hintCosts];
    newHintCosts[index] = value;
    setFormData((prevData) => ({
      ...prevData,
      hintCosts: newHintCosts,
    }));
  };

  const addHint = () => {
    setFormData((prevData) => ({
      ...prevData,
      hints: [...prevData.hints, ''],
      hintCosts: [...prevData.hintCosts, 1],
    }));
  };

  const removeHint = (index: number) => {
    const newHints = [...formData.hints];
    const newHintCosts = [...formData.hintCosts];
    newHints.splice(index, 1);
    newHintCosts.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      hints: newHints,
      hintCosts: newHintCosts,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // Basic Frontend Validation
    if (
      !formData.name ||
      !formData.category ||
      !formData.amiId ||
      !formData.flag
    ) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      await createMachine(formData);
      navigate('/machines'); // Redirect to machine list or detail page
    } catch (err: any) {
      setError(err.msg || 'Failed to create machine.');
    }
  };

  const adjustTextareaHeight = () => {
    if (descriptionRef.current) {
      descriptionRef.current.style.height = 'auto';
      descriptionRef.current.style.width = '50%';
      descriptionRef.current.style.height = `${descriptionRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [formData.description]);

  return (
    <form onSubmit={handleSubmit} className='add-machine-form'>
      <div className='back-button'>
        <button className="IconButton" type='button' onClick={() => navigate(-1)}><ArrowLeftOutlinedIcon style={{ color: 'white', fontSize: "34px" }} /></button>
      </div>
      <h2>Add New Machine</h2>

      {error && <p className='error-message'>{error}</p>}
      <div className='create-container'>


        <div className='name-container'>
          <label htmlFor='name'>Machine name <span style={{ color: 'red' }}>*</span></label>
          <input
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className='category-container'>
          <label htmlFor='category'>Category <span style={{ color: 'red' }}>*</span></label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange(e as unknown as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)}
            required
          >
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


        <div className='amiId-container'>
          <label htmlFor='amiId'>AMI ID <span style={{ color: 'red' }}>*</span></label>
          <input
            type='text'
            id='amiId'
            name='amiId'
            value={formData.amiId}
            onChange={handleChange}
            placeholder='AMI-XXXXXX'
            required
          />
        </div>

        <div className='flag-container'>
          <label htmlFor='flag'>Flag <span style={{ color: 'red' }}>*</span></label>
          <input
            type='text'
            id='flag'
            name='flag'
            value={formData.flag}
            onChange={handleChange}
            required
            placeholder='Flag of the machine here'
          />
        </div>

        <div className='Description-container'>
          <label htmlFor='description'>Machine Description <span style={{ color: 'red' }}>*</span></label>
          <textarea
            ref={descriptionRef}
            id='description'
            name='description'
            value={formData.description}
            placeholder='Description of the machine here'
            onChange={handleChange}
          />
        </div>

        <div className='exp-container'>
          <label htmlFor='exp'>EXP <span style={{ color: 'red' }}>*</span></label>
          <input
            type='number'
            id='exp'
            name='exp'
            value={formData.exp}
            onChange={handleChange}
            min={0}
          />
        </div>

        <div className='hint-container'>
          <label>Hints <span style={{ color: 'red' }}>*</span></label>
          {formData.hints.map((hint, index) => (
            <div className='key-container' key={index}>
              <input
                className=''
                type='text'
                value={hint}
                onChange={(e) => handleHintChange(index, e.target.value)}
                placeholder='Hint'
              />
              <input
                type='number'
                value={formData.hintCosts[index]}
                onChange={(e) =>
                  handleHintCostChange(index, Number(e.target.value))
                }
                placeholder='Cost'
                min={0}
              />
              {formData.hints.length > 1 && (
                <button className='remove-hint' type='button' onClick={() => removeHint(index)}>
                  Remove
                </button>
              )}
              <button className='add-hint' type='button' onClick={addHint}>
                Add Hint
              </button>
            </div>
          ))}
        </div>


        <div className='add-machine-form-button'>
          <button type='submit'>Create Machine</button>
        </div>
      </div>
    </form>
  );
};

export default AddMachineForm;
