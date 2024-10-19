import React, { useState } from 'react';
import MachineList from '../components/machine/MachineList';
import AddMachineForm from '../components/machine/AddMachineForm';
import withAuth from '../components/withAuth';

const MachinesPage = () => {
  const [machines, setMachines] = useState([]);

  const handleMachineAdded = (newMachine) => {
    setMachines([...machines, newMachine]);
  };

  const handleMachineUpdated = (updatedMachine) => {
    setMachines(
      machines.map((machine) => (machine._id === updatedMachine._id ? updatedMachine : machine))
    );
  };

  const handleMachineDeleted = (deletedMachineId) => {
    setMachines(machines.filter((machine) => machine._id !== deletedMachineId));
  };

  return (
    <div>
      <h1>Manage Machines</h1>
      <AddMachineForm onMachineAdded={handleMachineAdded} />
      <MachineList onMachineUpdated={handleMachineUpdated} onMachineDeleted={handleMachineDeleted} />
    </div>
  );
};

export default withAuth(MachinesPage);