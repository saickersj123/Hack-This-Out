// ProfileContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface ProfileContextProps {
  isProfileCollapsed: boolean;
  toggleProfile: () => void;
}

const ProfileContext = createContext<ProfileContextProps | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isProfileCollapsed, setIsProfileCollapsed] = useState(true);

  const toggleProfile = () => {
    setIsProfileCollapsed(prev => !prev);
  };

  return (
    <ProfileContext.Provider value={{ isProfileCollapsed, toggleProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  const context = useContext(ProfileContext);
  if (!context) throw new Error("ProfileContext must be used within ProfileProvider");
  return context;
};
