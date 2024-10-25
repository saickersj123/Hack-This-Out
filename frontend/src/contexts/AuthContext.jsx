import React, { createContext, useState, useEffect } from 'react';
import { getUserStatus } from '../api/axiosInstance';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchUserStatus = async () => {
    try {
      const status = await getUserStatus();
      setIsLoggedIn(status);
    } catch (error) {
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserStatus();
  }, []);

  // Function to handle login
  const login = () => {
    setIsLoggedIn(true);
  };

  // Function to handle logout
  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
