import React, { useState, useRef, useEffect } from 'react';
import { createContest, getAllMachines } from '../../api/axiosInstance';
import '../../assets/scss/contest/AddContestForm.scss';

const AddContestForm = ({ onContestAdded }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        startTime: '',
        endTime: '',
        machines: [{ id: '', name: '' }],
        contestExp: '',
    });
    const [loading, setLoading] = useState(false);
    const [allMachines, setAllMachines] = useState([]);
    const [suggestions, setSuggestions] = useState({});
    const [activeSuggestion, setActiveSuggestion] = useState({});
    const [focusedMachineIndex, setFocusedMachineIndex] = useState(null);

    const formRef = useRef(null);

    const { name, description, contestExp, startTime, endTime, machines } = formData;

    const adjustTextareaHeight = () => {
        const descriptionRef = document.getElementById('description');
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
                const data = await getAllMachines();
                if (
                    Array.isArray(data.machines) &&
                    typeof data.machines[0] === 'object' &&
                    data.machines[0].name &&
                    data.machines[0]._id
                ) {
                    const machinesList = data.machines.map(machine => ({
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

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        if (name.startsWith('machine-')) {
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
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleFocus = (index) => {
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

    const handleDeleteMachineField = (index) => {
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

    const handleSuggestionClick = (index, suggestion) => {
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

    const handleKeyDown = (e, index) => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (machines.length < 1) {
            alert('Please add at least 1 machine.');
            setLoading(false);
            return;
        }
        if (!name || !description || !contestExp || !startTime || !endTime) {
            alert('Please fill in all required fields.');
            setLoading(false);
            return;
        }
        for (let i = 0; i < machines.length; i++) {
            if (!machines[i].id) {
                alert(`Please select a valid machine for field ${i + 1}.`);
                setLoading(false);
                return;
            }
        }
        setLoading(true);
        try {
            const machineIds = machines.map(machine => machine.id);
            const data = await createContest({
                name,
                description,
                startTime,
                endTime,
                machines: machineIds,
                contestExp: contestExp,
            });
            alert('Contest registered successfully.');
            setFormData({
                name: '',
                description: '',
                startTime: '',
                endTime: '',
                machines: [{ id: '', name: '' }],
                contestExp: '',
            });
            setSuggestions({});
            setActiveSuggestion({});
            setFocusedMachineIndex(null);
            if (onContestAdded) onContestAdded(data.contest);
        } catch (error) {
            console.error('Error creating contest:', error);
            alert(error.msg || 'Failed to register contest.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (formRef.current && !formRef.current.contains(event.target)) {
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

    return (
        <form className='add-contest-form' onSubmit={handleSubmit} ref={formRef}>
            <h2>Register a New Contest</h2>
            <div>
                <label htmlFor="name">Name<span style={{ color: 'red' }}> *</span>:</label>
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
            <div>
                <label htmlFor="description">Description<span style={{ color: 'red' }}> *</span>:</label>
                <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => handleChange(e)}
                    placeholder="Enter contest description"
                    required
                ></textarea>
            </div>
            <div>
                <label htmlFor="contestExp">Experience Points (EXP)<span style={{ color: 'red' }}> *</span>:</label>
                <input
                    type="number"
                    id="contestExp"
                    name="contestExp"
                    value={contestExp}
                    onChange={(e) => handleChange(e)}
                    placeholder="Enter the EXP"
                    min="50"
                    required
                />
            </div>
            <div>
                <label htmlFor="startTime">Start Time<span style={{ color: 'red' }}> *</span>:</label>
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
            <div>
                <label htmlFor="endTime">End Time<span style={{ color: 'red' }}> *</span>:</label>
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
            <div>
                <label>Machines<span style={{ color: 'red' }}> *</span>:</label>
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
                            aria-expanded={focusedMachineIndex === index && suggestions[index] && suggestions[index].length > 0}
                        />
                        {machines.length > 1 && (
                            <button
                                type="button"
                                onClick={() => handleDeleteMachineField(index)}
                            >
                                Delete
                            </button>
                        )}
                        {focusedMachineIndex === index && suggestions[index] && suggestions[index].length > 0 ? (
                            <ul className="suggestions-list" id={`suggestions-${index}`} role="listbox">
                                {suggestions[index].map((suggestion, sIndex) => (
                                    <li
                                        key={sIndex}
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
                <button type="button" onClick={handleAddMachineField}>
                    Add Machine
                </button>
            </div>
            <button type="submit" disabled={loading}>
                {loading ? 'Registering...' : 'Register Contest'}
            </button>
        </form>
    );
};

export default AddContestForm;
