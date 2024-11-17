import React, { useContext, ReactNode } from 'react';
import { AuthUserContext } from '../../contexts/AuthUserContext';
import { Navigate } from 'react-router-dom';
import Loading from '../public/Loading';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const authUserContext = useContext(AuthUserContext);

  if (!authUserContext) {
    return <Navigate to="/unauthorized" />;
  }

  const { isLoggedIn, isLoading } = authUserContext;

  if (isLoading) {
    return <Loading />; // Show a loading indicator while checking auth status
  }

  return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
