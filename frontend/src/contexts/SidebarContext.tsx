import React, { createContext, useContext, useState } from 'react';

interface SidebarContextProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // localStorage에서 초기 상태 불러오기
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const storedState = localStorage.getItem('isSidebarCollapsed');
    return storedState === 'true';
  });

  const toggleSidebar = () => {
    setIsCollapsed((prev) => {
      const newCollapsed = !prev;
      localStorage.setItem('isSidebarCollapsed', JSON.stringify(newCollapsed));
      return newCollapsed;
    });
  };

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        toggleSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

// SidebarContext를 사용하는 커스텀 훅
export const useSidebar = () => {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};
