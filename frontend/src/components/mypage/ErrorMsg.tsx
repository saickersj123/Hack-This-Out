import React from 'react';
import '../../assets/scss/etc/ErrorMsg.scss';
interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="error-message" role="alert">
    {message}
  </div>
);

export default ErrorMessage;