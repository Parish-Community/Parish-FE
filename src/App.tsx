import React from 'react';
import routes from '@/routes/index';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { LoginPage } from './pages/login';
import { useRoutes } from 'react-router-dom';

const App = () => {
  const element = useRoutes(routes);

  return (
    <>{element}</>
    // <BrowserRouter>
    //   <Routes>
    //     <Route path='/' element={<LoginPage />} />
    //   </Routes>
    // </BrowserRouter>
  );
};

export default App;
