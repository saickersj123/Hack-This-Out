import React, { createContext, useContext, useState, ReactNode } from 'react';

type Status = 'idle' | 'inProgress' | 'completed' | 'flag' | 'flag-success';

// 각각의 컴포넌트에서 사용할 수 있도록 상태를 제공
interface StatusContextType {
  setStatus: (newStatus: Status) => void;
  status: Status;
}

interface StatusProviderProps {
  children: ReactNode;
  initialStatus: Status; // 초기 상태를 부모로부터 받음
}

const StatusContext = createContext<StatusContextType | undefined>(undefined);

// StatusProvider 컴포넌트는 초기 상태를 받아 그 상태를 제공
export const StatusProvider: React.FC<StatusProviderProps> = ({ children, initialStatus }) => {
  const [status, setStatus] = useState<Status>(initialStatus);

  return (
    <StatusContext.Provider value={{ status, setStatus }}>
      {children}
    </StatusContext.Provider>
  );
};

// 컨텍스트에서 상태를 사용하는 훅
export const useStatus = (): StatusContextType => {
  const context = useContext(StatusContext);
  if (!context) {
    throw new Error('useStatus must be used within a StatusProvider');
  }
  return context;
};
