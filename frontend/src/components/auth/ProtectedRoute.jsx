import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import LoadingPage from '../../pages/public/LoadingPage'; // Ensure you have a LoadingPage component

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useContext(AuthContext);

  if (loading) {
    return <LoadingPage />; // Show a loading indicator while checking auth status
  }

  return isLoggedIn ? children : <Navigate to="/login" /> ;
};

export default ProtectedRoute;
