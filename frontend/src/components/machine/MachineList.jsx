import React, { useEffect, useState } from 'react';
import { getAllMachines, deleteMachine } from '../../api/axiosInstance';
import MachineDetail from './MachineDetail';
import EditMachineForm from './EditMachineForm';
import DeleteMachineButton from './DeleteMachineButton';

const MachineList = () => {
  const [machines, setMachines] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [editingMachine, setEditingMachine] = useState(null);

  useEffect(() => {
    // Fetch all machines on component mount
    const fetchMachines = async () => {
      try {
        const data = await getAllMachines();
        setMachines(data.machines);
      } catch (error) {
        console.error('Error fetching machines:', error);
        alert(error.msg || 'Failed to fetch machines.');
      }
    };

    fetchMachines();
  }, []);

  const handleDelete = async (machineId) => {
    try {
      await deleteMachine(machineId);
      setMachines(machines.filter((machine) => machine._id !== machineId));
      alert('Machine deleted successfully.');
    } catch (error) {
      console.error('Error deleting machine:', error);
      alert(error.msg || 'Failed to delete machine.');
    }
  };

  const handleEdit = (machine) => {
    setEditingMachine(machine);
  };

  const handleUpdate = (updatedMachine) => {
    setMachines(
      machines.map((machine) => (machine._id === updatedMachine._id ? updatedMachine : machine))
    );
    setEditingMachine(null);
  };

  return (
    <div>
      <h2>Available Machines</h2>
      {machines.length === 0 ? (
        <p>No machines available.</p>
      ) : (
        <ul>
          {machines.map((machine) => (
            <li key={machine._id}>
              <p><strong>Name:</strong> {machine.name}</p>
              <p><strong>Category:</strong> {machine.category}</p>
              <p><strong>Experience:</strong> {machine.exp}</p>
              <button onClick={() => setSelectedMachine(machine)}>View Details</button>
              <button onClick={() => handleEdit(machine)}>Edit</button>
              <DeleteMachineButton machineId={machine._id} onDelete={handleDelete} />
            </li>
          ))}
        </ul>
      )}
      {selectedMachine && (
        <MachineDetail machine={selectedMachine} onClose={() => setSelectedMachine(null)} />
      )}
      {editingMachine && (
        <EditMachineForm machine={editingMachine} onUpdate={handleUpdate} onCancel={() => setEditingMachine(null)} />
      )}
    </div>
  );
};

export default MachineList;