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
<<<<<<< HEAD
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
                    <td>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <Rating
                          name={`read-only-rating-${machine._id}`}
                          value={Number(machine.rating)}
                          precision={0.5}
                          readOnly
                        />
                      </Box>
                    </td>
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
=======
            ) : (
              filteredMachines.map((machine) => (
                <tr key={machine._id}>
                  <td className='machine-img'></td>
                  <td className='machine-name'>{machine.name}</td>
                  <td className='machine-category'>{machine.category}</td>
                  <td className='machine-rating'>
                    <div title={`Rating: ${machine.rating.toFixed(1)}`}>
                      <StarRatings
                        rating={machine.rating}
                        starRatedColor="orange"
                        numberOfStars={5}
                        name='rating'
                        starDimension="20px"
                        starSpacing="3px"
                      />
                    </div>
                  </td>
                  <td className='machine-playCount'>{machine.playerCount}</td>
                  <td className='machine-details'>
                    <button className='details-button' onClick={() => handleMachineClick(machine)}><FaArrowRightToBracket size={24} /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
>>>>>>> parent of cd598be1 (Merge branch 'jiwoo' of  into jiwoo)
    </div>
  );
};

export default MachineList;
