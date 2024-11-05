import React from 'react';
import '../../assets/scss/admin/ErrorMessage.scss';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return <div className="error-message">{message}</div>;
};

export default ErrorMessage; 