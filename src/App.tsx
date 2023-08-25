import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthLayout, DashboardLayout } from './pages/layout';
import Main from './pages/main';
import NotFound from '@/pages/NotFound';
import { LoginPage, ForgotPasswordPage, OtpPage, ChangePasswordPage } from '@/pages/login';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<DashboardLayout children={<Main />} />} />
          <Route path='/auth/login' element={<AuthLayout children={<LoginPage />} />} />
          <Route path='/auth/forgot-password' element={<AuthLayout children={<ForgotPasswordPage />} />} />
          <Route path='/auth/verify-otp' element={<AuthLayout children={<OtpPage />} />} />
          <Route path='/auth/change-password' element={<AuthLayout children={<ChangePasswordPage />} />} />

          <Route path='/page-404' element={<DashboardLayout children={<NotFound />} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
