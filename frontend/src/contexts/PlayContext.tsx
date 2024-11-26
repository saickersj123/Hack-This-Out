import React, { createContext, useState, ReactNode, useContext } from 'react';

interface PlayContextProps {
  downloadStatus: 'idle' | 'inProgress' | 'completed';
  setDownloadStatus: React.Dispatch<React.SetStateAction<'idle' | 'inProgress' | 'completed'>>;
  instanceStatus: 'pending' | 'running' | 'terminated' | null;
  setInstanceStatus: React.Dispatch<React.SetStateAction<'pending' | 'running' | 'terminated' | null>>;
  submitStatus: 'flag' | 'flag-success';
  setSubmitStatus: React.Dispatch<React.SetStateAction<'flag' | 'flag-success'>>;
}

const PlayContext = createContext<PlayContextProps | undefined>(undefined);

export const PlayProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'inProgress' | 'completed'>('idle');
  const [instanceStatus, setInstanceStatus] = useState<'pending' | 'running' | 'terminated' | null>(null);
  const [submitStatus, setSubmitStatus] = useState<'flag' | 'flag-success'>('flag');

  return (
    <PlayContext.Provider
      value={{
        downloadStatus,
        setDownloadStatus,
        instanceStatus,
        setInstanceStatus,
        submitStatus,
        setSubmitStatus,
      }}
    >
      {children}
    </PlayContext.Provider>
  );
};

export const usePlayContext = (): PlayContextProps => {
  const context = useContext(PlayContext);
  if (!context) {
    throw new Error('usePlayContext must be used within a PlayProvider');
  }
  return context;
};