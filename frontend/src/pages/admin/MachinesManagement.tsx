import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/admin/AdminSidebar';
import DataTable from '../../components/admin/DataTable/DataTable';
import ActionButtons from '../../components/admin/ActionButtons';
import ConfirmationModal from '../../components/admin/ConfirmationModal';
import ErrorMessage from '../../components/admin/ErrorMessage';
import {
  getAllMachines,
  activateMachine,
  deactivateMachine,
  deleteMachine,
} from '../../api/axiosInstance';

interface Machine {
  _id: string;
  name: string;
  isActive: boolean;
}

const MachinesManagement: React.FC = () => {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [modal, setModal] = useState<{ isOpen: boolean; machineId?: string; action?: string }>({
    isOpen: false,
    machineId: undefined,
    action: undefined,
  });

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const res = await getAllMachines();
        setMachines(res.machines);
      } catch (err: any) {
        console.error('Error fetching machines:', err);
        setError('Failed to load machines.');
      }
    };

    fetchMachines();
  }, []);

  const handleToggleActive = (machineId: string, currentStatus: boolean) => {
    setModal({ isOpen: true, machineId, action: currentStatus ? 'deactivate' : 'activate' });
  };

  const handleDeleteMachine = (machineId: string) => {
    setModal({ isOpen: true, machineId, action: 'delete' });
  };

  const confirmAction = async () => {
    const { machineId, action } = modal;
    if (!machineId || !action) return;

    try {
      if (action === 'activate') {
        await activateMachine(machineId);
        setMachines((prevMachines) =>
          prevMachines.map((machine) =>
            machine._id === machineId ? { ...machine, isActive: true } : machine
          )
        );
      } else if (action === 'deactivate') {
        await deactivateMachine(machineId);
        setMachines((prevMachines) =>
          prevMachines.map((machine) =>
            machine._id === machineId ? { ...machine, isActive: false } : machine
          )
        );
      } else if (action === 'delete') {
        await deleteMachine(machineId);
        setMachines((prevMachines) => prevMachines.filter((machine) => machine._id !== machineId));
      }
      setModal({ isOpen: false, machineId: undefined, action: undefined });
    } catch (err: any) {
      console.error(`Error performing ${action} on machine:`, err);
      setError(`Failed to ${action} machine.`);
      setModal({ isOpen: false, machineId: undefined, action: undefined });
    }
  };

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Active', accessor: 'isActive' },
  ];

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="admin-content">
        <h1>Machines Management</h1>
        {error && <ErrorMessage message={error} />}
        <DataTable
          columns={columns}
          data={machines.map(machine => ({
            ...machine,
            isActive: machine.isActive ? 'Yes' : 'No',
          }))}
          actions={undefined}
        />
        
        {/* Render Action Buttons separately per row */}
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.accessor}>{col.header}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {machines.map(machine => (
              <tr key={machine._id}>
                <td>{machine.name}</td>
                <td>{machine.isActive ? 'Yes' : 'No'}</td>
                <td>
                  <ActionButtons
                    onActivate={!machine.isActive ? () => handleToggleActive(machine._id, machine.isActive) : undefined}
                    onDeactivate={machine.isActive ? () => handleToggleActive(machine._id, machine.isActive) : undefined}
                    onDelete={() => handleDeleteMachine(machine._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Confirmation Modal */}
        <ConfirmationModal
          isOpen={modal.isOpen}
          title={
            modal.action === 'activate'
              ? 'Confirm Activate Machine'
              : modal.action === 'deactivate'
              ? 'Confirm Deactivate Machine'
              : 'Confirm Delete Machine'
          }
          message={
            modal.action === 'activate'
              ? 'Are you sure you want to activate this machine?'
              : modal.action === 'deactivate'
              ? 'Are you sure you want to deactivate this machine?'
              : 'Are you sure you want to delete this machine? This action cannot be undone.'
          }
          onConfirm={confirmAction}
          onCancel={() => setModal({ isOpen: false, machineId: undefined, action: undefined })}
        />
      </div>
    </div>
  );
};

export default MachinesManagement; 