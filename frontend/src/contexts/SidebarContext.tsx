import React, { createContext, useContext, useState, useEffect } from 'react';

interface SidebarContextProps {
  selectedItem: string;
  setSelectedItem: (item: string) => void;

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

  // selectedItem 상태 추가
  const [selectedItem, setSelectedItem] = useState<string>(() => {
    const storedItem = localStorage.getItem('selectedItem');
    return storedItem || ''; // selectedItem을 localStorage에서 가져옴
  });

  const toggleSidebar = () => {
    setIsCollapsed((prev) => {
      const newCollapsed = !prev;
      localStorage.setItem('isSidebarCollapsed', JSON.stringify(newCollapsed));
      return newCollapsed;
    });
  };

  // selectedItem 상태를 localStorage에 저장
  useEffect(() => {
    if (selectedItem) {
      localStorage.setItem('selectedItem', selectedItem);
    }
  }, [selectedItem]);

  return (
    <SidebarContext.Provider value={{ selectedItem, setSelectedItem, isCollapsed, toggleSidebar }}>
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
