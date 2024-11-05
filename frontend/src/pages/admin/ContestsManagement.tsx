import React, { useEffect, useState } from 'react';
import DataTable from '../../components/admin/DataTable/DataTable';
import ActionButtons from '../../components/admin/ActionButtons';
import ConfirmationModal from '../../components/admin/ConfirmationModal';
import ErrorMessage from '../../components/admin/ErrorMessage';
import Sidebar from '../../components/admin/AdminSidebar';
import {
  getContests,
  ActivateContest,
  DeactivateContest,
  deleteContest,
} from '../../api/axiosInstance';

interface Contest {
  _id: string;
  name: string;
  isActive: boolean;
  startTime: string;
  endTime: string;
}

const ContestsManagement: React.FC = () => {
  const [contests, setContests] = useState<Contest[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [modal, setModal] = useState<{ isOpen: boolean; contestId?: string; action?: string }>({
    isOpen: false,
    contestId: undefined,
    action: undefined,
  });

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const res = await getContests();
        setContests(res.contests);
      } catch (err: any) {
        console.error('Error fetching contests:', err);
        setError('Failed to load contests.');
      }
    };

    fetchContests();
  }, []);

  const handleToggleActive = (contestId: string, currentStatus: boolean) => {
    setModal({ isOpen: true, contestId, action: currentStatus ? 'deactivate' : 'activate' });
  };

  const handleDeleteContest = (contestId: string) => {
    setModal({ isOpen: true, contestId, action: 'delete' });
  };

  const confirmAction = async () => {
    const { contestId, action } = modal;
    if (!contestId || !action) return;

    try {
      if (action === 'activate') {
        await ActivateContest(contestId);
        setContests((prevContests) =>
          prevContests.map((contest) =>
            contest._id === contestId ? { ...contest, isActive: true } : contest
          )
        );
      } else if (action === 'deactivate') {
        await DeactivateContest(contestId);
        setContests((prevContests) =>
          prevContests.map((contest) =>
            contest._id === contestId ? { ...contest, isActive: false } : contest
          )
        );
      } else if (action === 'delete') {
        await deleteContest(contestId);
        setContests((prevContests) => prevContests.filter((contest) => contest._id !== contestId));
      }
      setModal({ isOpen: false, contestId: undefined, action: undefined });
    } catch (err: any) {
      console.error(`Error performing ${action} on contest:`, err);
      setError(`Failed to ${action} contest.`);
      setModal({ isOpen: false, contestId: undefined, action: undefined });
    }
  };

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Active', accessor: 'isActive' },
    { header: 'Start Time', accessor: 'startTime' },
    { header: 'End Time', accessor: 'endTime' },
  ];

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="admin-content">
        <h1>Contests Management</h1>
        {error && <ErrorMessage message={error} />}
        <DataTable
          columns={columns}
          data={contests.map(contest => ({
            ...contest,
            isActive: contest.isActive ? 'Yes' : 'No',
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
            {contests.map(contest => (
              <tr key={contest._id}>
                <td>{contest.name}</td>
                <td>{contest.isActive ? 'Yes' : 'No'}</td>
                <td>{new Date(contest.startTime).toLocaleString()}</td>
                <td>{new Date(contest.endTime).toLocaleString()}</td>
                <td>
                  <ActionButtons
                    onActivate={!contest.isActive ? () => handleToggleActive(contest._id, contest.isActive) : undefined}
                    onDeactivate={contest.isActive ? () => handleToggleActive(contest._id, contest.isActive) : undefined}
                    onDelete={() => handleDeleteContest(contest._id)}
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
              ? 'Confirm Activate Contest'
              : modal.action === 'deactivate'
              ? 'Confirm Deactivate Contest'
              : 'Confirm Delete Contest'
          }
          message={
            modal.action === 'activate'
              ? 'Are you sure you want to activate this contest?'
              : modal.action === 'deactivate'
              ? 'Are you sure you want to deactivate this contest?'
              : 'Are you sure you want to delete this contest? This action cannot be undone.'
          }
          onConfirm={confirmAction}
          onCancel={() => setModal({ isOpen: false, contestId: undefined, action: undefined })}
        />
      </div>
    </div>
  );
};

export default ContestsManagement;
