import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 기존 컴포넌트
import MainPage from './MainPage';
import RegisterForm from './RegisterForm';
import Main from '../components/section/Main';

// 비동기 로딩을 위한 Lazy 컴포넌트
const Tutorial = lazy(() => import('./dash_pages/Tutorial'));
const Challenges = lazy(() => import('./dash_pages/Challenges'));
const ChallengeDetail = lazy(() => import('./dash_pages/ChallengesDetail'));
const UpChallenge = lazy(() => import('./dash_pages/UpChallenge'));
const Rankings = lazy(() => import('./dash_pages/Rankings'));
const Makers = lazy(() => import('./dash_pages/Makers'));
const Academy = lazy(() => import('./dash_pages/Academy'));
const Universities = lazy(() => import('./dash_pages/Universities'));
const Search = lazy(() => import('./dash_pages/Search'));
const Not = lazy(() => import('./dash_pages/Not'));

// 새로운 App 구성
const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Main />}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/main" element={<Main />} />
          <Route path="/Tutorial" element={<Tutorial />} />
          <Route path="/Challenges" element={<Challenges />} />
          <Route path="/Challenge/:id" element={<ChallengeDetail />} />
          <Route path="/Upload" element={<UpChallenge />} />
          <Route path="/Rankings" element={<Rankings />} />
          <Route path="/Makers" element={<Makers />} />
          <Route path="/Academy" element={<Academy />} />
          <Route path="/Universities" element={<Universities />} />
          <Route path="/Search" element={<Search />} />
          <Route path="*" element={<Not />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;