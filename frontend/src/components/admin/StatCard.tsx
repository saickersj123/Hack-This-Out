import React from 'react';
import '../../assets/scss/admin/StatCard.scss';

interface StatCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, count, icon }) => {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-info">
        <h3>{title}</h3>
        <p>{count}</p>
      </div>
    </div>
  );
};

export default StatCard; 