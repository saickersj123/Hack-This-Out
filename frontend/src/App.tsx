import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Loading from './components/public/Loading';

const App: React.FC = () => {
  return (
    <>
      {/* You can include common layout components here, such as Header or Sidebar */}
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default App;
