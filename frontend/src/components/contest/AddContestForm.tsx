import React, { useState, useRef, useEffect } from 'react';
import { createContest } from '../../api/axiosContest';
import { getActiveMachines } from '../../api/axiosMachine';
import { useNavigate } from 'react-router-dom';
import '../../assets/scss/contest/AddContestForm.scss';
import Loading from '../public/Loading';
import { IoMdArrowRoundBack } from "react-icons/io";
import RegisterCompleteMD from '../modal/RegisterCompleteMD';

interface Contest {
    id: string;
    name: string;
    description: string;
    startTime: string;
    endTime: string;
    machines: string[];
    contestExp: number;
};

interface AddContestFormProps {
    onContestAdded: (contest: Contest) => void;
}

interface Machine {
    id: string;
    name: string;
};

interface FormData {
    name: string;
    description: string;
    startTime: {
        date: string;
        timezoneOffset: number;
    };
    endTime: {
        date: string;
        timezoneOffset: number;
    };
    machines: Machine[];
    contestExp: number;
};

interface Suggestions {
    [key: number]: Machine[];
}

interface ValidationErrors {
    [key: string]: string;
}

const AddContestForm: React.FC<AddContestFormProps> = ({ onContestAdded }) => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        description: '',
        startTime: {
            date: '',
            timezoneOffset: 0
        },
        endTime: {
            date: '',
            timezoneOffset: 0
        },
        machines: [{ id: '', name: '' }],
        contestExp: 100,
    });
    const [loading, setLoading] = useState(false);
    const [allMachines, setAllMachines] = useState<Machine[]>([]);
    const [suggestions, setSuggestions] = useState<Suggestions>({});
    const [activeSuggestion, setActiveSuggestion] = useState<Record<number, number>>({});
    const [focusedMachineIndex, setFocusedMachineIndex] = useState<number | null>(null);
    const navigate = useNavigate();
    const [registerComplete, setRegisterComplete] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

    const { name, description, contestExp, startTime, endTime, machines } = formData;

    const adjustTextareaHeight = () => {
        const descriptionRef = document.getElementById('description') as HTMLTextAreaElement | null;
        if (descriptionRef) {
            descriptionRef.style.height = 'auto';
            descriptionRef.style.height = `${descriptionRef.scrollHeight}px`;
        }
    };

    useEffect(() => {
        adjustTextareaHeight();
    }, [description]);

    useEffect(() => {
        const fetchAllMachines = async () => {
            try {
                const data = await getActiveMachines();
                if (
                    Array.isArray(data.machines) &&
                    typeof data.machines[0] === 'object' &&
                    'name' in data.machines[0] &&
                    '_id' in data.machines[0]
                ) {
                    const machinesList = data.machines.map((machine: any) => ({
                        id: machine._id,
                        name: machine.name,
                    }));
                    setAllMachines(machinesList);
                } else if (Array.isArray(data.machines) && typeof data.machines[0] === 'string') {
                    console.warn('Machines are received as strings. Expected objects with _id and name.');
                    setAllMachines([]);
                } else {
                    console.error('Unexpected format for machines:', data.machines);
                    setAllMachines([]);
                }
            } catch (error) {
                console.error('Error fetching machines:', error);
                setAllMachines([]);
            }
        };
        fetchAllMachines();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index?: number
    ) => {
        const { name, value } = e.target;
        if (name === 'startTime' || name === 'endTime') {
            const clientTimezoneOffset = new Date().getTimezoneOffset();
            const localDate = new Date(value);
            setFormData({ 
                ...formData, 
                [name]: {
                    date: localDate.toISOString(),
                    timezoneOffset: clientTimezoneOffset
                }
            });
        } else if (name.startsWith('machine-') && typeof index === 'number') {
            const newMachines = [...machines];
            newMachines[index] = { id: '', name: value };
            setFormData({ ...formData, machines: newMachines });

            if (value) {
                const filteredSuggestions = allMachines.filter(machine =>
                    machine.name.toLowerCase().includes(value.toLowerCase())
                );
                setSuggestions(prev => ({
                    ...prev,
                    [index]: filteredSuggestions,
                }));
            } else {
                setSuggestions(prev => ({
                    ...prev,
                    [index]: [],
                }));
            }

            setFocusedMachineIndex(index);
        } else {
            setFormData({ ...formData, [name]: name === 'contestExp' ? Number(value) : value });
        }
    };

    const handleFocus = (index: number) => {
        setFocusedMachineIndex(index);
        if (machines[index].name) {
            const filteredSuggestions = allMachines.filter(machine =>
                machine.name.toLowerCase().includes(machines[index].name.toLowerCase())
            );
            setSuggestions(prev => ({
                ...prev,
                [index]: filteredSuggestions,
            }));
        }
    };

    const handleAddMachineField = () => {
        setFormData({
            ...formData,
            machines: [...machines, { id: '', name: '' }],
        });
    };

    const handleDeleteMachineField = (index: number) => {
        const newMachines = machines.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            machines: newMachines,
        });
        setSuggestions(prev => {
            const updated = { ...prev };
            delete updated[index];
            return updated;
        });
        setActiveSuggestion(prev => {
            const updated = { ...prev };
            delete updated[index];
            return updated;
        });
        setFocusedMachineIndex(null);
    };

    const handleSuggestionClick = (index: number, suggestion: Machine) => {
        const newMachines = [...machines];
        newMachines[index] = { id: suggestion.id, name: suggestion.name };
        setFormData({ ...formData, machines: newMachines });
        setSuggestions(prev => ({
            ...prev,
            [index]: [],
        }));
        setActiveSuggestion(prev => ({
            ...prev,
            [index]: -1,
        }));
        setFocusedMachineIndex(null);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        const suggestionList = suggestions[index] || [];
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveSuggestion(prev => ({
                ...prev,
                [index]: (prev[index] || -1) + 1,
            }));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveSuggestion(prev => ({
                ...prev,
                [index]: (prev[index] || 0) - 1,
            }));
        } else if (e.key === 'Enter') {
            if (activeSuggestion[index] >= 0 && activeSuggestion[index] < suggestionList.length) {
                e.preventDefault();
                handleSuggestionClick(index, suggestionList[activeSuggestion[index]]);
            }
        } else if (e.key === 'Escape') {
            setSuggestions(prev => ({
                ...prev,
                [index]: [],
            }));
            setActiveSuggestion(prev => ({
                ...prev,
                [index]: -1,
            }));
            setFocusedMachineIndex(null);
        }
    };

    const validateForm = (): boolean => {
        const errors: ValidationErrors = {};
        const currentTime = new Date();
        const startTimeDate = new Date(startTime.date);
        const endTimeDate = new Date(endTime.date);

        if (!name || name.length < 3) {
            errors.name = 'Name must be at least 3 characters long';
        }

        if (!description) {
            errors.description = 'Description is required';
        } else if (description.length > 500) {
            errors.description = 'Description must be less than 500 characters';
        }

        if (!startTime) {
            errors.startTime = 'Start time is required';
        } else if (startTimeDate < currentTime) {
            errors.startTime = 'Start time cannot be in the past';
        }

        if (!endTime) {
            errors.endTime = 'End time is required';
        } else if (endTimeDate <= startTimeDate) {
            errors.endTime = 'End time must be after start time';
        } else {
            const durationInHours = (endTimeDate.getTime() - startTimeDate.getTime()) / (1000 * 60 * 60);
            if (durationInHours < 24) {
                errors.endTime = 'Contest duration must be at least 24 hours';
            }
        }

        if (!machines.length) {
            errors.machines = 'At least one machine is required';
        } else if (machines.some(machine => !machine.id)) {
            errors.machines = 'Please select valid machines';
        }

        if (!contestExp || contestExp < 100) {
            errors.contestExp = 'Contest EXP must be at least 100';
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(false);
        setValidationErrors({});

        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);
            const machineIds = machines.map(machine => machine.id).filter(id => id);
            const contestData = {
                name,
                description,
                startTime,
                endTime,
                machines: machineIds,
                contestExp
            };

            const response = await createContest(contestData);
            if (response.message === "OK") {
                setRegisterComplete(true);
                onContestAdded(response.contest);
            }
        } catch (err: any) {
            setValidationErrors({
                submit: err.message || 'Failed to create contest'
            });
            // Scroll to top to show error
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (formRef.current && !formRef.current.contains(event.target as Node)) {
                setSuggestions({});
                setActiveSuggestion({});
                setFocusedMachineIndex(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <form onSubmit={handleSubmit} ref={formRef} className='add-contest-form'>
            <div className='back-button'>
                <h2>Add New Contest</h2>
                <button className="IconButton" type='button' onClick={() => navigate(-1)}>
                    <IoMdArrowRoundBack style={{ color: 'white', fontSize: "34px" }} />
                </button>
            </div>

            <div className='create-container'>
                <div className='name-container'>
                    <label htmlFor='name'>Contest Name <span className="required">*</span></label>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        value={name}
                        onChange={handleChange}
                        className={validationErrors.name ? 'error-input' : ''}
                        placeholder="Enter the contest name"
                    />
                    {validationErrors.name && (
                        <span className='field-error'>{validationErrors.name}</span>
                    )}
                </div>

                <div className='description-container'>
                    <label htmlFor='description'>Description <span className="required">*</span></label>
                    <textarea
                        id='description'
                        name='description'
                        value={description}
                        onChange={handleChange}
                        className={validationErrors.description ? 'error-input' : ''}
                        placeholder="Description of the contest"
                    />
                    {validationErrors.description && (
                        <span className='field-error'>{validationErrors.description}</span>
                    )}
                </div>

                <div className='start-time-container'>
                    <label htmlFor='startTime'>Start Time <span className="required">*</span></label>
                    <input
                        type='datetime-local'
                        id='startTime'
                        name='startTime'
                        value={startTime?.date ? new Date(startTime.date).toLocaleString('sv-SE').slice(0, 16) : ''}
                        onChange={handleChange}
                        className={validationErrors.startTime ? 'error-input' : ''}
                    />
                    {validationErrors.startTime && (
                        <span className='field-error'>{validationErrors.startTime}</span>
                    )}
                </div>

                <div className='end-time-container'>
                    <label htmlFor='endTime'>End Time <span className="required">*</span></label>
                    <input
                        type='datetime-local'
                        id='endTime'
                        name='endTime'
                        value={endTime?.date ? new Date(endTime.date).toLocaleString('sv-SE').slice(0, 16) : ''}
                        onChange={handleChange}
                        className={validationErrors.endTime ? 'error-input' : ''}
                    />
                    {validationErrors.endTime && (
                        <span className='field-error'>{validationErrors.endTime}</span>
                    )}
                </div>

                <div className='exp-container'>
                    <label htmlFor="contestExp">Reward (EXP)<span style={{ color: 'red' }}> *</span></label>
                    <input
                        type="number"
                        id="contestExp"
                        name="contestExp"
                        value={contestExp}
                        onChange={(e) => handleChange(e)}
                        placeholder="Enter the EXP"
                        min="100"
                        required
                    />
                    {validationErrors.contestExp && (
                        <span className='field-error'>{validationErrors.contestExp}</span>
                    )}
                </div>
                <div className='add-machine-container'>
                    <label>Machines<span style={{ color: 'red' }}> *</span></label>
                    {machines.map((machine, index) => (
                        <div key={index} className="machine-field">
                            <input
                                type="text"
                                name={`machine-${index}`}
                                value={machine.name}
                                onChange={(e) => handleChange(e, index)}
                                onFocus={() => handleFocus(index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                placeholder={`Machine ${index + 1}`}
                                autoComplete="off"
                                aria-autocomplete="list"
                                aria-controls={`suggestions-${index}`}
                                aria-expanded={focusedMachineIndex === index && suggestions[index]?.length > 0}
                                role="combobox"
                                aria-haspopup="listbox"
                                aria-activedescendant={
                                    activeSuggestion[index] >= 0
                                        ? `suggestion-${index}-${activeSuggestion[index]}`
                                        : undefined
                                }
                            />
                            {machines.length > 1 && (
                                <button
                                    type="button"
                                    className='delete-machine'
                                    onClick={() => handleDeleteMachineField(index)}
                                >
                                    Delete
                                </button>
                            )}
                            {focusedMachineIndex === index && suggestions[index] && suggestions[index].length > 0 ? (
                                <ul
                                    className="suggestions-list"
                                    id={`suggestions-${index}`}
                                    role="listbox"
                                >
                                    {suggestions[index].map((suggestion, sIndex) => (
                                        <li
                                            key={sIndex}
                                            id={`suggestion-${index}-${sIndex}`}
                                            className={activeSuggestion[index] === sIndex ? 'active' : ''}
                                            onMouseDown={() => handleSuggestionClick(index, suggestion)}
                                            onMouseEnter={() =>
                                                setActiveSuggestion(prev => ({
                                                    ...prev,
                                                    [index]: sIndex,
                                                }))
                                            }
                                            onMouseLeave={() =>
                                                setActiveSuggestion(prev => ({
                                                    ...prev,
                                                    [index]: -1,
                                                }))
                                            }
                                            role="option"
                                            aria-selected={activeSuggestion[index] === sIndex}
                                        >
                                            {suggestion.name}
                                        </li>
                                    ))}
                                </ul>
                            ) : machine.name && focusedMachineIndex === index && (
                                <div className="no-suggestions">No matching machines found.</div>
                            )}
                            {validationErrors.machines && (
                                <span className='field-error'>{validationErrors.machines}</span>
                            )}
                        </div>
                    ))}
                    <button className='add-machine-button' type="button" onClick={handleAddMachineField}>
                        Add Machine
                    </button>
                </div>
                <div className='add-contest-form-button'>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Registering...' : 'Add Contest'}
                    </button>
                </div>
            </div>
            {registerComplete && <RegisterCompleteMD onClose={
                () => {setRegisterComplete(false); navigate('/contest');}} mode='contest' />}
        </form>
    );
};

export default AddContestForm;
