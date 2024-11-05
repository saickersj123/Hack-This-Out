import React, { useContext, ReactNode } from 'react';
import { AuthUserContext } from '../../contexts/AuthUserContext';
import { Navigate } from 'react-router-dom';
import LoadingPage from '../../pages/public/LoadingPage';

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
    return <LoadingPage />;
  }

  return currentUser?.isAdmin ? <>{children}</> : <Navigate to="/unauthorized" />;
};

export default AdminProtectedRoute;
