import React, { useEffect, useState } from 'react';
import DataTable from '../../components/admin/DataTable/DataTable';
import ActionButtons from '../../components/admin/ActionButtons';
import ConfirmationModal from '../../components/admin/ConfirmationModal';
import ErrorMessage from '../../components/admin/ErrorMessage';
import { getAllUser, makeUsertoAdmin, deleteUserByUserId } from '../../api/axiosInstance';
import Sidebar from '../../components/admin/AdminSidebar';
interface User {
  _id: string;
  username: string;
  email: string;
  isAdmin: boolean;
}

const UsersManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [modal, setModal] = useState<{ isOpen: boolean; userId?: string; action?: string }>({
    isOpen: false,
    userId: undefined,
    action: undefined,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUser();
        setUsers(res.users);
      } catch (err: any) {
        console.error('Error fetching users:', err);
        setError('Failed to load users.');
      }
    };

    fetchUsers();
  }, []);

  const handleMakeAdmin = (userId: string) => {
    setModal({ isOpen: true, userId, action: 'makeAdmin' });
  };

  const handleDeleteUser = (userId: string) => {
    setModal({ isOpen: true, userId, action: 'delete' });
  };

  const confirmAction = async () => {
    const { userId, action } = modal;
    if (!userId || !action) return;

    try {
      if (action === 'makeAdmin') {
        await makeUsertoAdmin(userId);
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, isAdmin: true } : user
          )
        );
      } else if (action === 'delete') {
        await deleteUserByUserId(userId);
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      }
      setModal({ isOpen: false, userId: undefined, action: undefined });
    } catch (err: any) {
      console.error(`Error performing ${action}:`, err);
      setError(`Failed to ${action === 'makeAdmin' ? 'make admin' : 'delete'} user.`);
      setModal({ isOpen: false, userId: undefined, action: undefined });
    }
  };

  const columns = [
    { header: 'Username', accessor: 'username' },
    { header: 'Email', accessor: 'email' },
    { header: 'Admin', accessor: 'isAdmin' },
  ];


  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="admin-content">
        <h1>Users Management</h1>
        {error && <ErrorMessage message={error} />}
        <DataTable columns={columns} data={users.map(user => ({
          ...user,
          isAdmin: user.isAdmin ? 'Yes' : 'No'
        }))} actions={undefined} />
        
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
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                <td>
                  <ActionButtons
                    onActivate={!user.isAdmin ? () => handleMakeAdmin(user._id) : undefined}
                    onDelete={() => handleDeleteUser(user._id)}
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
            modal.action === 'makeAdmin'
              ? 'Confirm Promote to Admin'
              : 'Confirm Delete User'
          }
          message={
            modal.action === 'makeAdmin'
              ? 'Are you sure you want to promote this user to admin?'
              : 'Are you sure you want to delete this user? This action cannot be undone.'
          }
          onConfirm={confirmAction}
          onCancel={() => setModal({ isOpen: false, userId: undefined, action: undefined })}
        />
      </div>
    </div>
  );
};

export default UsersManagement; 