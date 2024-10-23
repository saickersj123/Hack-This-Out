import React, { useEffect, useState } from 'react';
import { getAllMachines } from '../../api/axiosInstance';
import { Link } from 'react-router-dom';

const MachineList = () => {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMachines = async () => {
    try {
      const data = await getAllMachines();
      setMachines(data.machines);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching machines:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMachines();
  }, []);

  if (loading) {
    return <p>Loading machines...</p>;
  }

  return (
    <div className="machine-list">
      <h2>Available Machines</h2>
      <Link to="/machines/create" className="create-machine-button">Create New Machine</Link>
      <ul>
        {machines.map(machine => (
          <li key={machine._id}>
            <Link to={`/machines/${machine._id}`}>{machine.name}</Link>
            <p>Category: {machine.category}</p>
            <p>EXP: {machine.exp}</p>
            <p>Repute: {machine.repute}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MachineList;
