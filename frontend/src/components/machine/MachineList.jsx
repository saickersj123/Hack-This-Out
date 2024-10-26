import React, { useEffect, useState } from 'react';
import { getAllMachines } from '../../api/axiosInstance';
import { Link } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>User Played</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {machines.map((machine) => (
                <TableRow key={machine._id}>
                  <TableCell>{machine.name}</TableCell>
                  <TableCell>{machine.category}</TableCell>
                  <TableCell>{machine.rating}</TableCell>
                  <TableCell>{machine.playCount}</TableCell>
                  <TableCell>
                    <Link to={`/machine/${machine._id}`}>Details</Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default MachineList;