// frontend/src/pages/InstancesPage.jsx
import React from 'react';
import InstanceList from '../components/instance/InstanceList';
import StartInstanceForm from '../components/instance/StartInstanceForm';
import withAuth from '../components/withAuth';

const InstancesPage = () => {
  return (
    <div>
      <h1>Manage Your Instances</h1>
      <StartInstanceForm />
      <InstanceList />
    </div>
  );
};

export default withAuth(InstancesPage);

