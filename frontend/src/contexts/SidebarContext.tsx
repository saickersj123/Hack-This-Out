// SidebarContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

interface SidebarContextProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // localStorage에서 초기 상태를 불러와 상태 저장
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

  // 페이지 첫 로드 시 localStorage에서 저장된 값을 불러오기
  useEffect(() => {
    const storedState = localStorage.getItem('isSidebarCollapsed');
    if (storedState !== null) {
      setIsCollapsed(storedState === 'true');
    }
  }, []);

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleSidebar }}>
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
