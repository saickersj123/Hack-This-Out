import React, { useEffect, useState } from 'react';
import { getActiveMachines } from '../../api/axiosMachine';
import '../../assets/scss/machine/MachineList.scss';
import { useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { FaArrowRightToBracket } from "react-icons/fa6";
import { getAvatarColorIndex, avatarBackgroundColors } from '../../utils/avatars';

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
      <div className='machine-list-title'>Machine List</div>
      <table className='machine-list-table'>
        <thead>
          <tr className='table-head'>
            <th className='table-image'></th>
            <th className='table-name'>Name</th>
            <th className='table-category'>
              Category
              <ClickAwayListener onClickAway={handleClickAway}>
                <div className='category-filter-toggle'>
                  <FilterAltIcon onClick={toggleFilterVisibility} />
                  {filterVisible && (
                    <div className='category-filter'>
                      <label htmlFor='category-select' style={{ color: "black" }}>Filter by Category:</label>
                      <select
                        id='category-select'
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
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
            <th className='table-rating'>Rating</th>
            <th className='table-playCount'>Played</th>
            <th className='table-details'>Detail</th>
          </tr>
        </thead>
        <tbody>
          {filteredMachines.length === 0 ? (
            <tr>
              <td colSpan={6} className="no-data">No machines available.</td>
            </tr>
          ) : (
            filteredMachines.map((machine) => {
              const avatarColorIndex = getAvatarColorIndex(machine.name);
              const avatarBgColor = avatarBackgroundColors[avatarColorIndex];
              return (
                <tr key={machine._id}>
                  <td className='machine-img'>
                    <Avatar
                      variant="rounded"
                      sx={{ backgroundColor: avatarBgColor, width: 50, height: 50 }}
                    >
                      {machine.name.charAt(0).toUpperCase()}
                    </Avatar>
                  </td>
                  <td className='machine-name'>{machine.name}</td>
                  <td className='machine-category'>{machine.category}</td>
                  <td className='machine-rating'>
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
                  <td className='machine-playCount'>{machine.playerCount}</td>
                  <td className='machine-details'>
                    <button className='details-button' onClick={() => handleMachineClick(machine)}><FaArrowRightToBracket size={24} /></button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MachineList;
