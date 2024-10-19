import React from 'react';
import Main from '../components/section/Main.jsx';
import MachineManagement from '../components/machine/MachineManagement';
import ChangeUserRoleForm from '../components/user/ChangeUserRoleForm';
import '../assets/scss/machine/MachineManagementPage.scss';

const MachineManagementPage = () => {
  return (
    <Main title="Machine Management" description="Admin page to manage machine registrations and user roles.">
      <div className="machine-management">
        <MachineManagement />
        <ChangeUserRoleForm />
      </div>
    </Main>
  );
};

export default MachineManagementPage;