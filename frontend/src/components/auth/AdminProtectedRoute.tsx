import React, { useContext, ReactNode } from 'react';
import { AuthUserContext } from '../../contexts/AuthUserContext';
import { Navigate } from 'react-router-dom';
import Loading from '../public/Loading';

interface AdminProtectedRouteProps {
  children: ReactNode;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ children }) => {
  const authUserContext = useContext(AuthUserContext);
  if (!authUserContext) {
    throw new Error('AdminProtectedRoute must be used within an AuthUserProvider');
  }

  const { currentUser, isLoading } = authUserContext;

  if (isLoading) {
    return <Loading />;
  }

  return currentUser?.isAdmin ? <>{children}</> : <Navigate to="/unauthorized" />;
};

export default AdminProtectedRoute;
