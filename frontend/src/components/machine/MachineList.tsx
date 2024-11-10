import React, { useEffect, useState } from 'react';
import { getActiveMachines } from '../../api/axiosMachine';
import '../../assets/scss/machine/MachineList.scss';
import { useNavigate } from 'react-router-dom';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ClickAwayListener from '@mui/material/ClickAwayListener';

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

  const [filteredMachines, setFilteredMachines] = useState<Machine[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [filterVisible, setFilterVisible] = useState<boolean>(false);

  const categories = [
    'Web', 'Network', 'Database', 'Crypto', 'Cloud', 'AI', 'OS', 'Other'
  ];

  useEffect(() => {
    const fetchMachines = async (): Promise<void> => {
      try {
        const data: MachinesResponse = await getActiveMachines();
        setMachines(data.machines);
        setFilteredMachines(data.machines);
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

  useEffect(() => {
    if (categoryFilter === '') {
      setFilteredMachines(machines);
    } else {
      setFilteredMachines(machines.filter(machine => machine.category === categoryFilter));
    }
  }, [categoryFilter, machines]);

  const toggleFilterVisibility = (e: React.MouseEvent): void => {
    e.stopPropagation();
    setFilterVisible((prev) => !prev);
  };

  const handleClickAway = (): void => {
    setFilterVisible(false);
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
        <thead>
          <tr>
            <th className='machine-name'>Name</th>
            <th className='machine-category'>Category
              <ClickAwayListener onClickAway={handleClickAway}>
                <div className='category-filter-toggle' style={{ display: 'inline-flex', alignItems: 'center', position: 'relative', marginLeft: '10px' }}>
                  <FilterAltIcon onClick={toggleFilterVisibility} />
                  {filterVisible && (
                    <div className='category-filter' style={{ position: 'absolute', top: '30px', left: '0', zIndex: 10, width: '240px', backgroundColor: 'white' }}>
                      <label htmlFor='category-select' style={{ color: "black" }}>Filter by Category: </label>
                      <select
                        id='category-select'
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        style={{ border: "solid" }}
                      >
                        <option value=''>All</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </ClickAwayListener>
            </th>
            <th className='machine-rating'>Rating</th>
            <th className='machine-playCount'>Played</th>
            <th className='machine-details'></th>
          </tr>
        </thead>
        <tbody>
          {filteredMachines.length === 0 ? (
            <tr>
              <td colSpan={5} className="no-data">No machines available.</td>
            </tr>
          ) : (
            filteredMachines.map((machine) => (
              <tr key={machine._id}>
                <td>{machine.name}</td>
                <td>{machine.category}</td>
                <td>{machine.rating.toFixed(1)}</td>
                <td>{machine.playerCount}</td>
                <td>
                  <button onClick={() => handleMachineClick(machine)}>Details</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MachineList;
