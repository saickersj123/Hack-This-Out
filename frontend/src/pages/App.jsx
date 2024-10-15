import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 기존 컴포넌트
import MainPage from './MainPage';
import RegisterForm from './RegisterForm';
import Main from '../components/section/Main';
import InstancesPage from './InstancesPage';
import MachinesPage from './MachinesPage';

// 비동기 로딩을 위한 Lazy 컴포넌트
const Challenges = lazy(() => import('./dash_pages/Challenges'));
const ChallengeDetail = lazy(() => import('./dash_pages/ChallengesDetail'));
const UpChallenge = lazy(() => import('./dash_pages/UpChallenge'));
const UpMachine = lazy(() => import('./dash_pages/UpMachine'));
const Rankings = lazy(() => import('./dash_pages/Rankings'));
const Machine = lazy(() => import('./dash_pages/Machine'));
const MachineDetail = lazy(() => import('./dash_pages/MachineDetail'));

// 새로운 App 구성
const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Main />}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/main" element={<Main />} />
          <Route path="/Challenges" element={<Challenges />} />
          <Route path="/Challenge/:id" element={<ChallengeDetail />} />
          <Route path="/Upload" element={<UpChallenge />} />
          <Route path="/Upmachine" element={<UpMachine />} />
          <Route path="/Rankings" element={<Rankings />} />
          <Route path="/Machine" element={<Machine />} />
          <Route path="/Machine/:machineName" element={<MachineDetail />} />
          <Route path="/Machine/:machineName/:tabName" element={<MachineDetail />} />
          <Route path="/Instances" element={<InstancesPage />} />
          <Route path="/Machines" element={<MachinesPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;