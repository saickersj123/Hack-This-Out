import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { getUserStatus } from '../api/axiosUser';
import Loading from '../components/public/Loading';

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUserStatus = async () => {
    try {
      const status: boolean = await getUserStatus();
      setIsLoggedIn(status);
    } catch (error) {
      console.error('Error fetching user status:', error);
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

  if (loading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
