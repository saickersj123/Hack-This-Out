import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './pages/public/LoginPage';
import MainPage from './pages/public/MainPage';
import LoadingPage from './pages/public/LoadingPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PreContestPage from './pages/contest/PreContestPage';
import NewMachineReview from './pages/machine/NewMachineReview';

// Lazy-loaded components
const LeaderBoardPage = lazy(() => import('./pages/leaderboard/LeaderBoardPage'));
const ContestListPage = lazy(() => import('./pages/contest/ContestListPage'));
const ContestDetailPage = lazy(() => import('./pages/contest/ContestDetailPage'));
const ContestRegisterPage = lazy(() => import('./pages/contest/ContestRegisterPage'));
const ContestCompletePage = lazy(() => import('./pages/contest/ContestCompletePage'));
const ContestPendingPage = lazy(() => import('./pages/contest/ContestPendingPage'));
const ContestPlayPage = lazy(() => import('./pages/contest/ContestPlayPage'));
const MachineListPage = lazy(() => import('./pages/machine/MachineListPage'));
const MachineDetailPage = lazy(() => import('./pages/machine/MachineDetailPage'));
const MachineRegisterPage = lazy(() => import('./pages/machine/MachineRegisterPage'));
const MachinePlayPage = lazy(() => import('./pages/machine/MachinePlayPage'));
const MachineCompletePage = lazy(() => import('./pages/machine/MachineCompletePage'));
const MyPage = lazy(() => import('./pages/user/MyPage'));

const App: React.FC = () => {
  return (
      <Router>
        <Suspense fallback={<LoadingPage />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <MainPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/leaderboard"
              element={
                <ProtectedRoute>
                  <LeaderBoardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contest"
              element={
                <ProtectedRoute>
                  <ContestListPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contest/register"
              element={
                <ProtectedRoute>
                  <ContestRegisterPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contest/:contestId"
              element={
                <ProtectedRoute>
                  <ContestDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contest/:contestId/pre"
              element={
                <ProtectedRoute>
                  <PreContestPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contest/:contestId/play"
              element={
                <ProtectedRoute>
                  <ContestPlayPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contest/:contestId/complete"
              element={
                <ProtectedRoute>
                  <ContestCompletePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contest/:contestId/pending"
              element={
                <ProtectedRoute>
                  <ContestPendingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/machines"
              element={
                <ProtectedRoute>
                  <MachineListPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/machine/register"
              element={
                <ProtectedRoute>
                  <MachineRegisterPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/machine/:machineId"
              element={
                <ProtectedRoute>
                  <MachineDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/machine/:machineId/review/new"
              element={
                <ProtectedRoute>
                  <NewMachineReview />
                </ProtectedRoute>
              }
            />
            <Route
              path="/machine/:machineId/complete"
              element={
                <ProtectedRoute>
                  <MachineCompletePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/machine/:machineId/play"
              element={
                <ProtectedRoute>
                  <MachinePlayPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mypage"
              element={
                <ProtectedRoute>
                  <MyPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </Router>
  );
};

export default App;
