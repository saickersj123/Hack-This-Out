import React, { useEffect, useState } from 'react';
import { getActiveMachines } from '../../api/axiosMachine';
import styles from '../../assets/scss/machine/MachineList.module.scss';
import { useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { getAvatarColorIndex, avatarBackgroundColors } from '../../utils/avatars';
import LoadingIcon from '../public/LoadingIcon';
import ErrorIcon from '../public/ErrorIcon';
import { IoMdArrowRoundForward } from 'react-icons/io';

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
    return <LoadingIcon />;
  }

  if (error) {
    return <ErrorIcon />;
  }

  return (
    <div className={styles.machine_list_container}>
      <div className={styles.machine_list_title}>Machines</div>
      <table className={styles.machine_list_table}>
        <thead>
          <tr className={styles.table_text_box}>
            <th className={styles.table_name}>Name</th>
            <th className={styles.table_category}>
              Category
              <ClickAwayListener onClickAway={handleClickAway}>
                <div className={styles.category_filter_toggle}>
                  <FilterAltIcon 
                    onClick={toggleFilterVisibility}
                    sx={{
                      fontSize: 'clamp(20px, 2.5vw, 24px)',
                      cursor: 'pointer'
                    }} 
                  />
                  {filterVisible && (
                    <div className={styles.category_filter}>
                      <label className={styles.category_label}>Filter by </label>
                      <select
                        className={styles.category_select}
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                      >
                        <option className={styles.category} value=''>All</option>
                        {categories.map((category) => (
                          <option className={styles.category} key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </ClickAwayListener>
            </th>
            <th className={styles.table_rating}>Rating</th>
            <th className={styles.table_playCount}>Played</th>
            <th className={styles.table_details}>Detail</th>
          </tr>
        </thead>
        <tbody>
          {filteredMachines.length === 0 ? (
            <tr className={styles['no-data']}>
              {/* <td colSpan={5}>No machines available.</td> */}
            </tr>
          ) : (
            filteredMachines.map((machine) => {
              const avatarColorIndex = getAvatarColorIndex(machine.name);
              const avatarBgColor = avatarBackgroundColors[avatarColorIndex];
              return (
                <tr className={styles.machine_box} key={machine._id}>
                  <td className={styles.machine_name}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px, 2vw, 16px)', width: '100%' }}>
                      <Avatar
                        variant="rounded"
                        sx={{
                          backgroundColor: avatarBgColor,
                          width: 'clamp(32px, 5vw, 40px)',
                          height: 'clamp(32px, 5vw, 40px)',
                          fontSize: 'clamp(14px, 2vw, 16px)',
                        }}
                      >
                        {machine.name.charAt(0).toUpperCase()}
                      </Avatar>
                      <span>{machine.name.charAt(0).toUpperCase() + machine.name.slice(1)}</span>
                    </Box>
                  </td>
                  <td className={styles.machine_category}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                      {machine.category}
                    </Box>
                  </td>
                  <td className={styles.machine_rating}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                      <Rating
                        name={`read-only-rating-${machine._id}`}
                        value={Number(machine.rating)}
                        precision={0.5}
                        readOnly
                        sx={{
                          fontSize: 'clamp(20px, 2vw, 24px)',
                          '& .MuiRating-iconEmpty': { color: '#fff' },
                          '& .MuiRating-iconFilled': { color: '#ffd700' },
                        }}
                      />
                    </Box>
                  </td>
                  <td className={styles.machine_playCount}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                      {machine.playerCount}
                    </Box>
                  </td>
                  <td className={styles.machine_details}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                      <button className={styles.details_button} onClick={() => handleMachineClick(machine)}>
                        <IoMdArrowRoundForward size={'clamp(20px, 2.5vw, 24px)'} color='white' />
                      </button>
                    </Box>
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
