import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './pages/public/LoginPage';
import MainPage from './pages/public/MainPage';
import LoadingPage from './pages/public/LoadingPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Lazy-loaded components
const LeaderBoardPage = lazy(() => import('./pages/leaderboard/LeaderBoardPage'));
const ContestListPage = lazy(() => import('./pages/contest/ContestListPage'));
const ContestDetailPage = lazy(() => import('./pages/contest/ContestDetailPage'));
const ContestRegisterPage = lazy(() => import('./pages/contest/ContestRegisterPage'));
const MachineListPage = lazy(() => import('./pages/machine/MachineListPage'));
const MachineDetailPage = lazy(() => import('./pages/machine/MachineDetailPage'));
const MachineRegisterPage = lazy(() => import('./pages/machine/MachineRegisterPage'));
const MachinePlayPage = lazy(() => import('./pages/machine/MachinePlayPage'));
const MyPage = lazy(() => import('./pages/user/MyPage'));

const App: React.FC = () => {
  return (
    <AuthProvider>
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
              path="/mypage"
              element={
                <ProtectedRoute>
                  <MyPage />
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
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
};

export default App;
