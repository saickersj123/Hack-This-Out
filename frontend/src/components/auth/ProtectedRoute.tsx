import React, { useContext, ReactNode } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import LoadingPage from '../../pages/public/LoadingPage'; // Ensure you have a LoadingPage component

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('ProtectedRoute must be used within an AuthProvider');
  }

  const { isLoggedIn, loading } = authContext;

  if (loading) {
    return <LoadingPage />; // Show a loading indicator while checking auth status
  }

  return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
