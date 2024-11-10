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
  users: number;
  machines: number;
  contests: number;
  instances: number;
}

const DashboardHome: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    users: 0,
    machines: 0,
    contests: 0,
    instances: 0,
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
          users: usersRes.users.length,
          machines: machinesRes.machines.length,
          contests: contestsRes.contests.length,
          instances: instancesRes.instances.length,
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
          <StatCard title="Users" count={stats.users} icon={<FaUsers />} />
          <StatCard title="Machines" count={stats.machines} icon={<FaServer />} />
          <StatCard title="Contests" count={stats.contests} icon={<FaClipboardList />} />
          <StatCard title="Instances" count={stats.instances} icon={<FaCogs />} />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
