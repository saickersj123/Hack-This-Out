import React, { useEffect, useState } from 'react';
import { getActiveMachines } from '../../api/axiosMachine';
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
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMachines = async (): Promise<void> => {
      try {
        const data: MachinesResponse = await getActiveMachines();
        setMachines(data.machines);
        setLoading(false);
      } catch (error: any) {
        console.error('Error fetching machines:', error);
        setError(`Error fetching machines: ${error.msg || error.message}`);
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

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='machine-list-container'>
      <div className='machine-list-title'>
        <h2>Machine List</h2>
      </div>
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
                    <td>{machine.rating.toFixed(1)}</td>
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
