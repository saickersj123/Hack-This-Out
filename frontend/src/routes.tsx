import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminProtectedRoute from './components/auth/AdminProtectedRoute';
import NotFound from './components/public/notfound';
import Unauthorized from './pages/Unauthorized';
import Loading from './components/public/Loading';
import App from './App';
import './assets/scss/admin/AdminDashboard.scss';
import AdminLayout from './components/admin/AdminLayout';
import MachineCompleteModal from './components/modal/MachineCompleteModal';
import ContestCompleteModal from './components/modal/ContestCompleteMD';

// Lazy-loaded components
const LoginPage = lazy(() => import('./pages/public/LoginPage'));
const MainPage = lazy(() => import('./pages/public/MainPage'));
const MyStats = lazy(() => import('./pages/user/MyStats'));
const LeaderBoardPage = lazy(() => import('./pages/leaderboard/LeaderBoardPage'));
const ContestListPage = lazy(() => import('./pages/contest/ContestListPage'));
const ContestDetailPage = lazy(() => import('./pages/contest/ContestDetailPage'));
const ContestRegisterPage = lazy(() => import('./pages/contest/ContestRegisterPage'));
const PreContestPage = lazy(() => import('./pages/contest/PreContestPage'));
const ContestPlayPage = lazy(() => import('./pages/contest/ContestPlayPage'));
const MachineListPage = lazy(() => import('./pages/machine/MachineListPage'));
const MachineDetailPage = lazy(() => import('./pages/machine/MachineDetailPage'));
const MachineRegisterPage = lazy(() => import('./pages/machine/MachineRegisterPage'));
const MachinePlayPage = lazy(() => import('./pages/machine/MachinePlayPage'));
const MyPage = lazy(() => import('./pages/user/MyPage'));
const DashboardHome = lazy(() => import('./pages/admin/DashboardHome'));
const UsersManagement = lazy(() => import('./pages/admin/UsersManagement'));
const MachinesManagement = lazy(() => import('./pages/admin/MachinesManagement'));
const ContestsManagement = lazy(() => import('./pages/admin/ContestsManagement'));
const InstancesManagement = lazy(() => import('./pages/admin/InstancesManagement'));
const TutorialPage = lazy(() => import('./pages/TutorialPage'));
const LandingPage = lazy(() => import('./pages/landing/LandingPage'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      // Public Routes
      {
        path: 'login',
        element: (
            <LoginPage />
        ),
      },
      {
        path: '/intro',
        element: (
            <LandingPage />
        ),
      },
      
      // Protected Routes
      {
        path: '/',
        element: (
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'tutorial',
        element: (
          <ProtectedRoute>
            <TutorialPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'leaderboard',
        element: (
          <ProtectedRoute>
            <LeaderBoardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'mystats',
        element: (
          <ProtectedRoute>
            <MyStats />
          </ProtectedRoute>
        ),
      },
      {
        path: 'contest',
        element: (
          <ProtectedRoute>
            <ContestListPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'contest/register',
        element: (
          <ProtectedRoute>
            <ContestRegisterPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'contest/:contestId',
        element: (
          <ProtectedRoute>
            <ContestDetailPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'contest/:contestId/pre',
        element: (
          <ProtectedRoute>
            <PreContestPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'contest/:contestId/play',
        element: (
          <ProtectedRoute>
            <ContestPlayPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'contest/:contestId/complete',
        element: (
          <ProtectedRoute>
            <ContestCompleteModal onClose={() => {}} expEarned={9999} />
          </ProtectedRoute>
        ),
      },
      {
        path: 'machine',
        element: (
          <ProtectedRoute>
            <MachineListPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'machine/register',
        element: (
          <ProtectedRoute>
            <MachineRegisterPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'machine/:machineId',
        element: (
          <ProtectedRoute>
            <MachineDetailPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'machine/:machineId/complete',
        element: (
          <ProtectedRoute>
            <MachineCompleteModal onClose={() => {}} expEarned={9999} />
          </ProtectedRoute>
        ),
      },
      {
        path: 'machine/:machineId/play',
        element: (
          <ProtectedRoute>
            <MachinePlayPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'mypage',
        element: (
          <ProtectedRoute>
            <MyPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'unauthorized',
        element: <Unauthorized />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
      {
        path: 'loading',
        element: <Loading />,
      },

      // Admin Routes
      {
        path: 'admin',
        element: (
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        ),
        children: [
          {
            index: true, // Default admin route
            element: (
              <div className="admin-dashboard">
                <div className="admin-content"> 
                  <DashboardHome />
                </div>
              </div>
            ),
          },
          {
            path: 'users',
            element: (
              <AdminProtectedRoute>
                <div className="admin-dashboard">
                  <div className="admin-content">
                    <UsersManagement />
                  </div>
                </div>
              </AdminProtectedRoute>
            ),
          },
          {
            path: 'machines',
            element: (
              <AdminProtectedRoute>
                <div className="admin-dashboard">
                  <div className="admin-content">
                    <MachinesManagement />
                  </div>
                </div>
              </AdminProtectedRoute>
            ),
          },
          {
            path: 'contests',
            element: (
              <AdminProtectedRoute>
                <div className="admin-dashboard">
                  <div className="admin-content">
                    <ContestsManagement />
                  </div>
                </div>
              </AdminProtectedRoute>
            ),
          },
          {
            path: 'instances',
            element: (
              <AdminProtectedRoute>
                <div className="admin-dashboard">
                  <div className="admin-content">
                    <InstancesManagement />
                  </div>
                </div>
              </AdminProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
];

export default routes;