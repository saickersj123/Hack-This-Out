import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLoginUser } from '../api/axiosInstance';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const user = await getLoginUser();
          if (!user) {
            navigate('/login');
          }
        } catch (error) {
          console.error('Error checking authentication:', error);
          navigate('/login');
        }
      };

      checkAuth();
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;