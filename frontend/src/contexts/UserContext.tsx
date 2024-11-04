import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { getUserStatus } from '../api/axiosInstance';

interface User {
  id: string;
  name: string;
  isAdmin: boolean;
  // Add other user properties as needed
}

interface UserContextProps {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoading: boolean;
  error: string | null;
}

export const UserContext = createContext<UserContextProps>({
  currentUser: null,
  setCurrentUser: () => {},
  isLoading: false,
  error: null,
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserStatus();
        setCurrentUser(data.user);
      } catch (err: any) {
        console.error('Failed to fetch user details:', err);
        setError(err.message || 'Failed to fetch user details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, isLoading, error }}>
      {children}
    </UserContext.Provider>
  );
};
