import React, { useEffect, useRef, useState } from 'react';
import { createMachine } from '../../api/axiosMachine';
import { useNavigate } from 'react-router-dom';
import '../../assets/scss/machine/AddMachineForm.scss';
import { IoMdArrowRoundBack } from 'react-icons/io';
import RegisterCompleteMD from '../modal/RegisterCompleteMD';

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

interface ValidationErrors {
    [key: string]: string;
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
  const [registerComplete, setRegisterComplete] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

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

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};
    
    if (!formData.name || formData.name.length < 3) {
        errors.name = 'Name must be at least 3 characters long';
    }
    
    if (!formData.category) {
        errors.category = 'Category is required';
    }
    
    if (!formData.amiId || !/^ami-[0-9a-fA-F]{8,17}$/.test(formData.amiId)) {
        errors.amiId = 'Invalid AMI ID format';
    }
    
    if (!formData.flag || formData.flag.length < 5) {
        errors.flag = 'Flag must be at least 5 characters long';
    }
    
    if (!formData.description || formData.description.length < 4) {
        errors.description = 'Description must be at least 4 characters long';
    }
    
    if (!formData.exp || formData.exp < 50) {
        errors.exp = 'Experience points must be at least 50';
    }
    
    if (!formData.hints.length || formData.hints.some(hint => !hint.trim())) {
        errors.hints = 'At least one valid hint is required';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setValidationErrors({});

    if (!validateForm()) {
        setError('Please fix the validation errors below.');
        return;
    }

    try {
      await createMachine(formData);
      setRegisterComplete(true);
    } catch (err: any) {
      setError(err.message);
      // Scroll to top to show error
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const adjustTextareaHeight = () => {
    if (descriptionRef.current) {
      descriptionRef.current.style.height = 'auto';
      descriptionRef.current.style.height = `${descriptionRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [formData.description]);

  return (
    <form onSubmit={handleSubmit} className='add-machine-form'>
      <div className='back-button'>
        <h2>Add New Machine</h2>
        <button className="IconButton" type='button' onClick={() => navigate(-1)}>
          <IoMdArrowRoundBack style={{ color: 'white', fontSize: "34px" }} />
        </button>
      </div>

      {error && (
        <div className='error-message' style={{ 
          color: 'red',
          padding: '10px',
          marginBottom: '20px',
          backgroundColor: 'rgba(255, 0, 0, 0.1)',
          borderRadius: '4px'
        }}>
          {error}
        </div>
      )}

      <div className='create-container'>


        <div className='name-container'>
          <label htmlFor='name'>Machine Name <span style={{ color: 'red' }}>*</span></label>
          <input
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter the machine name"
            className={validationErrors.name ? 'error-input' : ''}
          />
          {validationErrors.name && (
            <span className='field-error'>{validationErrors.name}</span>
          )}
        </div>

        <div className='category-container'>
          <label htmlFor='category'>Category <span style={{ color: 'red' }}>*</span></label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={(e) => handleChange(e as any)}
            className={validationErrors.category ? 'error-input' : ''}
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
          {validationErrors.category && (
            <span className='field-error'>{validationErrors.category}</span>
          )}
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
          />
          {validationErrors.amiId && (
            <span className='field-error'>{validationErrors.amiId}</span>
          )}
        </div>

        <div className='flag-container'>
          <label htmlFor='flag'>Flag <span style={{ color: 'red' }}>*</span></label>
          <input
            type='text'
            id='flag'
            name='flag'
            value={formData.flag}
            onChange={handleChange}
            placeholder='Flag of the machine here'
          />
          {validationErrors.flag && (
            <span className='field-error'>{validationErrors.flag}</span>
          )}
        </div>

        <div className='Description-container'>
          <label htmlFor='description'>Description <span style={{ color: 'red' }}>*</span></label>
          <textarea
            ref={descriptionRef}
            id='description'
            name='description'
            value={formData.description}
            placeholder='Description of the machine here'
            onChange={handleChange}
          />
          {validationErrors.description && (
            <span className='field-error'>{validationErrors.description}</span>
          )}
        </div>

        <div className='exp-container'>
          <label htmlFor='exp'>Reward (EXP) <span style={{ color: 'red' }}>*</span></label>
          <input
            type='number'
            id='exp'
            name='exp'
            value={formData.exp}
            onChange={handleChange}
            min={50}
          />
          {validationErrors.exp && (
            <span className='field-error'>{validationErrors.exp}</span>
          )}
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
                min={1}
                max={100}
              />
              {formData.hints.length > 1 && (
                <button className='remove-hint' type='button' onClick={() => removeHint(index)}>
                  Remove
                </button>
              )}
              {validationErrors.hints && (
                <span className='field-error'>{validationErrors.hints}</span>
              )}
            </div>
          ))}
          <button className='add-hint' type='button' onClick={addHint}>
            Add Hint
          </button>
        </div>
        <div className='add-machine-form-button'>
          <button type='submit'>Add Machine</button>
        </div>
      </div>
      {registerComplete && <RegisterCompleteMD onClose={() => {setRegisterComplete(false); navigate('/machine');}} mode='machine' />}
    </form>
  );
};

export default AddMachineForm;
