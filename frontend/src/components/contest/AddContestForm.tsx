import React, { useState, useRef, useEffect } from 'react';
import { createContest } from '../../api/axiosContest';
import { getActiveMachines } from '../../api/axiosMachine';
import { useNavigate } from 'react-router-dom';
import '../../assets/scss/contest/AddContestForm.scss';
import Loading from '../public/Loading';
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';

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
    startTime: string;
    endTime: string;
    machines: Machine[];
    contestExp: number;
};

interface Suggestions {
    [key: number]: Machine[];
}

const AddContestForm: React.FC<AddContestFormProps> = ({ onContestAdded }) => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        description: '',
        startTime: '',
        endTime: '',
        machines: [{ id: '', name: '' }],
        contestExp: 100,
    });
    const [loading, setLoading] = useState(false);
    const [allMachines, setAllMachines] = useState<Machine[]>([]);
    const [suggestions, setSuggestions] = useState<Suggestions>({});
    const [activeSuggestion, setActiveSuggestion] = useState<Record<number, number>>({});
    const [focusedMachineIndex, setFocusedMachineIndex] = useState<number | null>(null);
    const navigate = useNavigate();

    const formRef = useRef<HTMLFormElement>(null);

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
        if (name.startsWith('machine-') && typeof index === 'number') {
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (machines.length < 1) {
            alert('Please add at least 1 machine.');
            return;
        }
        if (!name || !description || contestExp <= 0 || !startTime || !endTime) {
            alert('Please fill in all required fields.');
            return;
        }
        for (let i = 0; i < machines.length; i++) {
            if (!machines[i].id) {
                alert(`Please select a valid machine for field ${i + 1}.`);
                return;
            }
        }
        setLoading(true);
        try {
            const utcStartTime = new Date(startTime).toISOString();
            const utcEndTime = new Date(endTime).toISOString();

            const machineIds = machines.map(machine => machine.id);
            const data = await createContest({
                name,
                description,
                startTime: utcStartTime,
                endTime: utcEndTime,
                machines: machineIds,
                contestExp,
            });
            alert('Contest registered successfully.');
            setFormData({
                name: '',
                description: '',
                startTime: '',
                endTime: '',
                machines: [{ id: '', name: '' }],
                contestExp: 0,
            });
            setSuggestions({});
            setActiveSuggestion({});
            setFocusedMachineIndex(null);
            if (onContestAdded) onContestAdded(data.contest);
        } catch (error: any) {
            console.error('Error creating contest:', error);
            alert(error.msg || 'Failed to register contest.');
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
        <form className='add-contest-form' onSubmit={handleSubmit} ref={formRef}>
            <div className='back-button'>
                <button className="IconButton" type='button' onClick={() => navigate(-1)}><ArrowLeftOutlinedIcon style={{ color: 'white', fontSize: "34px" }} /></button>
            </div>
            <h2>Register a New Contest</h2>

            <div className='create-container'>
                <div className='name-container'>
                    <label htmlFor="name">Contest Name<span style={{ color: 'red' }}> *</span></label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => handleChange(e)}
                        placeholder="Enter the contest name"
                        required
                    />
                </div>
                <div className='description-container'>
                    <label htmlFor="description">Description<span style={{ color: 'red' }}> *</span></label>
                    <textarea
                        id="description"
                        name="description"
                        value={description}
                        onChange={(e) => handleChange(e)}
                        placeholder="Enter contest description"
                        required
                    ></textarea>
                </div>

                <div className='start-time-container'>
                    <label htmlFor="startTime">Start Time<span style={{ color: 'red' }}> *</span></label>
                    <input
                        type="datetime-local"
                        id="startTime"
                        name="startTime"
                        value={startTime}
                        onChange={(e) => handleChange(e)}
                        placeholder="Enter the start time"
                        required
                    />
                </div>
                <div className='end-time-container'>
                    <label htmlFor="endTime">End Time<span style={{ color: 'red' }}> *</span></label>
                    <input
                        type="datetime-local"
                        id="endTime"
                        name="endTime"
                        value={endTime}
                        onChange={(e) => handleChange(e)}
                        placeholder="Enter the end time"
                        required
                    />
                </div>
                <div className='exp-container'>
                    <label htmlFor="contestExp">Experience Points (EXP)<span style={{ color: 'red' }}> *</span></label>
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
                                required
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
                        </div>
                    ))}
                    <button className='add-machine-button' type="button" onClick={handleAddMachineField}>
                        Add Machine
                    </button>
                </div>
                <div className='add-contest-form-button'>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Registering...' : 'Register Contest'}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AddContestForm;
