import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { getUserStatus } from '../api/axiosUser';

interface User {
  id: string;
  username: string;
  isAdmin: boolean;
  // Add other user properties as needed
}

interface AuthUserContextProps {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  error: string | null;
  login: () => void;
  logout: () => void;
}

export const AuthUserContext = createContext<AuthUserContextProps | undefined>(undefined);

interface AuthUserProviderProps {
  children: ReactNode;
}

export const AuthUserProvider: React.FC<AuthUserProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserStatus = async () => {
    try {
      const data = await getUserStatus();
      if (data && data.user) {
        setCurrentUser(data.user);
        setIsLoggedIn(true);
      } else {
        setCurrentUser(null);
        setIsLoggedIn(false);
      }
    } catch (err: any) {
      console.error('Failed to fetch user status:', err);
      setError(err.message || 'Failed to fetch user status');
      setCurrentUser(null);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserStatus();
  }, []);

  const login = () => {
    setIsLoggedIn(true);
    // Optionally update currentUser here if login provides user data
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <AuthUserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isLoggedIn,
        setIsLoggedIn,
        isLoading,
        error,
        login,
        logout,
      }}
    >
      {children}
    </AuthUserContext.Provider>
  );
};
