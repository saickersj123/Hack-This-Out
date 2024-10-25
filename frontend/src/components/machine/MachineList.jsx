import React, { useEffect, useState } from 'react';
import { getAllMachines } from '../../api/axiosInstance';
import { Link } from 'react-router-dom';

const MachineList = () => {
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    // Fetch all machines on component mount
    const fetchMachines = async () => {
      try {
        const data = await getAllMachines();
        //const data = await getActiveMachines();
        setMachines(data.machines);
      } catch (error) {
        console.error('Error fetching machines:', error);
        alert('Error fetching machines:', error.msg);
      }
    };

    fetchMachines();
  }, []);

  return (
    <div className='machine-list'>
      <h2>Available Machines</h2>
      {machines.length === 0 ? (
        <p>No machines available.</p>
      ) : (
        <ul className='machine-list-table'>
          {machines.map((machine) => (
            <li key={machine._id}>
              <p><strong>Name:</strong> {machine.name}</p>
              <p><strong>Category:</strong> {machine.category}</p>
              <p><strong>Rating:</strong> {machine.rating}</p>
              <p><strong>User Played:</strong> {machine.playCount}</p>
              <Link to={`/machine/${machine._id}`}>Details</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MachineList;