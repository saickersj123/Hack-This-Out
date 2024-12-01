import React from 'react';
import '../../assets/scss/admin/StatCard.scss';

interface StatDetail {
  label: string;
  value: number;
  status?: 'success' | 'warning' | 'danger' | 'info';
}

interface StatCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  details?: StatDetail[];
  trend?: 'up' | 'down' | 'stable';
}

const StatCard: React.FC<StatCardProps> = ({ title, count, icon, details, trend }) => {
  const getTrendIcon = () => {
    if (trend === 'up') return '↑';
    if (trend === 'down') return '↓';
    return '→';
  };

  const getStatusColor = (status?: string) => {
    switch(status) {
      case 'success': return 'success';
      case 'warning': return 'warning';
      case 'danger': return 'danger';
      default: return 'info';
    }
  };

  return (
    <div className="stat-card">
      <div className="stat-header">
        <div className="stat-icon-wrapper">
          {icon}
        </div>
        <div className="stat-info">
          <h3 className="stat-title">{title}</h3>
          <div className="stat-count-wrapper">
            <p className="stat-count">{count}</p>
            {trend && <span className={`trend-indicator ${trend}`}>{getTrendIcon()}</span>}
          </div>
        </div>
      </div>
      {details && details.length > 0 && (
        <div className="stat-details">
          {details.map((detail, index) => (
            <div key={index} className="detail-item">
              <div className="detail-label">
                <span className="label-text">{detail.label}</span>
              </div>
              <div className="detail-value">
                <span className={`value-badge ${getStatusColor(detail.status)}`}>
                  {detail.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatCard; 