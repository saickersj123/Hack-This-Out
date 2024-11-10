import React from 'react';
import '../../assets/scss/admin/ActionButtons.scss';

interface ActionButtonsProps {
  onActivate?: () => void;
  onDeactivate?: () => void;
  onDelete?: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onActivate, onDeactivate, onDelete }) => {
  return (
    <div className="action-buttons">
      {onActivate && (
        <button className="activate-button" onClick={onActivate}>
          Activate
        </button>
      )}
      {onDeactivate && (
        <button className="deactivate-button" onClick={onDeactivate}>
          Deactivate
        </button>
      )}
      {onDelete && (
        <button className="delete-button" onClick={onDelete}>
          Delete
        </button>
      )}
    </div>
  );
};

export default ActionButtons; 