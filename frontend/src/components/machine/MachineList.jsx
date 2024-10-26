import React, { useEffect, useState } from 'react';
import { getAllMachines } from '../../api/axiosInstance';
import '../../assets/scss/machine/MachineList.scss';
import { useNavigate } from 'react-router-dom';

const MachineList = () => {
  const [machines, setMachines] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all machines on component mount
    const fetchMachines = async () => {
      try {
        const data = await getAllMachines();
        //const data = await getActiveMachines();
        setMachines(data.machines);
      } catch (error) {
        console.error('Error fetching machines:', error);
        alert(`Error fetching machines: ${error.msg}`);
      }
    };

    fetchMachines();
  }, []);

  const handleMachineClick = (machine) => {
    navigate(`/machine/${machine._id}`);
  };

  return (
    <div className='machine-list-container'>
      <div className='machine-list-title'> <h2>Machine List</h2> </div>
        <table className='machine-list-table'>
          {machines.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan="5" className="no-data">No machines available.</td>
              </tr>
            </tbody>
          ) : (
            <>
              <thead>
                <tr>
                  <th className='machine-name'>Name</th>
                  <th className='machine-category'>Category</th>
                  <th className='machine-rating'>Rating</th>
                  <th className='machine-playCount'>User Played</th>
                  <th className='machine-details'></th>
                </tr>
              </thead>
              <tbody>
                {machines.map((machine) => (
                  <tr key={machine._id}>
                    <td>{machine.name}</td>
                    <td>{machine.category}</td>
                    <td>{machine.rating}</td>
                    <td>{machine.playCount}</td>
                    <td>
                      <button onClick={() => handleMachineClick(machine)}>Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          )}
        </table>
    </div>
  );
};

export default MachineList;
