import React, { useEffect, useState } from 'react';
import { getAllMachines } from '../../api/axiosInstance';
import '../../assets/scss/machine/MachineList.scss';
import { useNavigate } from 'react-router-dom';

interface Machine {
  _id: string;
  name: string;
  category: string;
  rating: number;
  playerCount: number;
}

interface MachinesResponse {
  machines: Machine[];
  msg?: string;
}

const MachineList: React.FC = () => {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMachines = async (): Promise<void> => {
      try {
        const data: MachinesResponse = await getAllMachines();
        setMachines(data.machines);
        setLoading(false);
      } catch (error: any) {
        console.error('Error fetching machines:', error);
        alert(`Error fetching machines: ${error.msg}`);
        setLoading(false);
      }
    };

    fetchMachines();
  }, []);

  const handleMachineClick = (machine: Machine): void => {
    navigate(`/machine/${machine._id}`);
  };

  if (loading) {
    return <p>Loading machines...</p>;
  }

  return (
    <div className='machine-list-container'>
      <div className='machine-list-title'> <h2>Machine List</h2> </div>
        <table className='machine-list-table'>
          {machines.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={5} className="no-data">No machines available.</td>
              </tr>
            </tbody>
          ) : (
            <>
              <thead>
                <tr>
                  <th className='machine-name'>Name</th>
                  <th className='machine-category'>Category</th>
                  <th className='machine-rating'>Rating</th>
                  <th className='machine-playCount'>Played</th>
                  <th className='machine-details'></th>
                </tr>
              </thead>
              <tbody>
                {machines.map((machine) => (
                  <tr key={machine._id}>
                    <td>{machine.name}</td>
                    <td>{machine.category}</td>
                    <td>{machine.rating}</td>
                    <td>{machine.playerCount}</td>
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
