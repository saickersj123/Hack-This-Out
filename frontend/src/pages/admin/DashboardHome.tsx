import React, { useEffect, useState } from 'react';
import StatCard from '../../components/admin/StatCard';
import { FaUsers, FaServer, FaClipboardList, FaCogs } from 'react-icons/fa';
import { getAllUser } from '../../api/axiosUser';
import { getAllMachines } from '../../api/axiosMachine';
import { getContests } from '../../api/axiosContest';
import { getAllInstances } from '../../api/axiosInstance';
import ErrorMessage from '../../components/admin/ErrorMessage';
import Sidebar from '../../components/admin/AdminSidebar';

interface DashboardStats {
  users: {
    total: number;
    admin: number;
    regular: number;
  };
  machines: {
    total: number;
    active: number;
    inactive: number;
  };
  contests: {
    total: number;
    active: number;
    inactive: number;
  };
  instances: {
    total: number;
    running: number;
    pending: number;
    terminated: number;
  };
}

const DashboardHome: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    users: { total: 0, admin: 0, regular: 0 },
    machines: { total: 0, active: 0, inactive: 0 },
    contests: { total: 0, active: 0, inactive: 0 },
    instances: { total: 0, running: 0, pending: 0, terminated: 0 },
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, machinesRes, contestsRes, instancesRes] = await Promise.all([
          getAllUser(),
          getAllMachines(),
          getContests(),
          getAllInstances(),
        ]);

        setStats({
          users: {
            total: usersRes.users.length,
            admin: usersRes.users.filter((user: any) => user.isAdmin).length,
            regular: usersRes.users.filter((user: any) => !user.isAdmin).length,
          },
          machines: {
            total: machinesRes.machines.length,
            active: machinesRes.machines.filter((machine: any) => machine.isActive).length,
            inactive: machinesRes.machines.filter((machine: any) => !machine.isActive).length,
          },
          contests: {
            total: contestsRes.contests.length,
            active: contestsRes.contests.filter((contest: any) => contest.isActive).length,
            inactive: contestsRes.contests.filter((contest: any) => !contest.isActive).length,
          },
          instances: {
            total: instancesRes.instances.length,
            running: instancesRes.instances.filter((instance: any) => instance.status === 'running').length,
            pending: instancesRes.instances.filter((instance: any) => instance.status === 'pending').length,
            terminated: instancesRes.instances.filter((instance: any) => instance.status === 'terminated').length,
          },
        });
      } catch (err: any) {
        console.error('Error fetching dashboard stats:', err);
        setError('Failed to load dashboard statistics.');
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="admin-content">
        <h1>Dashboard Home</h1>
        {error && <ErrorMessage message={error} />}
        <div className="stats-container">
          <StatCard 
            title="Users" 
            count={stats.users.total} 
            icon={<FaUsers />}
            details={[
              { label: 'Admins', value: stats.users.admin },
              { label: 'Regular Users', value: stats.users.regular },
            ]}
          />
          <StatCard 
            title="Machines" 
            count={stats.machines.total} 
            icon={<FaServer />}
            details={[
              { label: 'Active', value: stats.machines.active },
              { label: 'Inactive', value: stats.machines.inactive },
            ]}
          />
          <StatCard 
            title="Contests" 
            count={stats.contests.total} 
            icon={<FaClipboardList />}
            details={[
              { label: 'Active', value: stats.contests.active },
              { label: 'Inactive', value: stats.contests.inactive },
            ]}
          />
          <StatCard 
            title="Instances" 
            count={stats.instances.total} 
            icon={<FaCogs />}
            details={[
              { label: 'Running', value: stats.instances.running },
              { label: 'Pending', value: stats.instances.pending },
              { label: 'Terminated', value: stats.instances.terminated },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
