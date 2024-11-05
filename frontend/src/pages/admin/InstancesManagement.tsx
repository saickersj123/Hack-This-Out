import React, { useEffect, useState } from 'react';
import DataTable from '../../components/admin/DataTable/DataTable';
import Sidebar from '../../components/admin/AdminSidebar';
import ActionButtons from '../../components/admin/ActionButtons';
import ConfirmationModal from '../../components/admin/ConfirmationModal';
import ErrorMessage from '../../components/admin/ErrorMessage';
import { getAllInstances, TerminateInstance } from '../../api/axiosInstance';
interface Instance {
  _id: string;
  user: string;
  machineType: string;
  status: string;
}

const InstancesManagement: React.FC = () => {
  const [instances, setInstances] = useState<Instance[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [modal, setModal] = useState<{ isOpen: boolean; instanceId?: string }>({
    isOpen: false,
    instanceId: undefined,
  });

  useEffect(() => {
    const fetchInstances = async () => {
      try {
        const res = await getAllInstances();
        setInstances(res.instances);
      } catch (err: any) {
        console.error('Error fetching instances:', err);
        setError('Failed to load instances.');
      }
    };

    fetchInstances();
  }, []);

  const handleTerminateInstance = (instanceId: string) => {
    setModal({ isOpen: true, instanceId });
  };

  const confirmTerminate = async () => {
    const { instanceId } = modal;
    if (!instanceId) return;

    try {
      await TerminateInstance(instanceId);
      setInstances((prevInstances) => prevInstances.filter((inst) => inst._id !== instanceId));
      setModal({ isOpen: false, instanceId: undefined });
    } catch (err: any) {
      console.error('Error terminating instance:', err);
      setError('Failed to terminate instance.');
      setModal({ isOpen: false, instanceId: undefined });
    }
  };

  const columns = [
    { header: 'User', accessor: 'user' },
    { header: 'Machine Type', accessor: 'machineType' },
    { header: 'Status', accessor: 'status' },
  ];

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="admin-content">
        <h1>Instances Management</h1>
        {error && <ErrorMessage message={error} />}
        <DataTable
          columns={columns}
          data={instances}
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
            {instances.map(instance => (
              <tr key={instance._id}>
                <td>{instance.user}</td>
                <td>{instance.machineType}</td>
                <td>{instance.status}</td>
                <td>
                  <ActionButtons
                    onDelete={() => handleTerminateInstance(instance._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Confirmation Modal */}
        <ConfirmationModal
          isOpen={modal.isOpen}
          title="Confirm Terminate Instance"
          message="Are you sure you want to terminate this instance? This action cannot be undone."
          onConfirm={confirmTerminate}
          onCancel={() => setModal({ isOpen: false, instanceId: undefined })}
        />
      </div>
    </div>
  );
};

export default InstancesManagement; 