import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 기존 컴포넌트
import LoginPage from './pages/LoginPage';
import Main from './components/section/Main';
import ProtectedRoute from './ProtectedRoute';

// 비동기 로딩을 위한 Lazy 컴포넌트
const RankingPage = lazy(() => import('./pages/RankingPage'));
const ContestPage = lazy(() => import('./pages/ContestPage'));
const ContestDetail = lazy(() => import('./components/contest/ContestDetail'));
const InstancesPage = lazy(() => import('./pages/InstancesPage'));
const MachinesPage = lazy(() => import('./pages/MachinesPage'));
const MachineManagementPage = lazy(() => import('./pages/MachineManagementPage'));
// 새로운 App 구성
const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Main />}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/Main" element={<Main />} />
          <Route path="/Rankings" element={<RankingPage />} />
          <Route path="/Contest" element={<ContestPage />} />
          <Route path="/Contest/:machineName" element={<ContestDetail />} />
          <Route path="/Contest/:machineName/:tabName" element={<ContestDetail />} />
          <Route path="/Instances" element={<InstancesPage />} />
          <Route path="/Machines" element={<MachinesPage />} />
          <Route path="/MachineManagement" element={
            <ProtectedRoute adminOnly={true}>
              <MachineManagementPage />
            </ProtectedRoute>
          } />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
