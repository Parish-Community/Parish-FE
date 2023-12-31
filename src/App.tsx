import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthLayout, DashboardLayout } from './pages/layout';
import Main from './pages/main';
import NotFound from '@/pages/NotFound';
import { LoginPage, ForgotPasswordPage, OtpPage, ChangePasswordPage } from '@/pages/login';
import OverviewPage from './pages/overview';
import ChristenPage from "./pages/christen";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<DashboardLayout children={<OverviewPage />} />} />
          <Route path='/parish/overview' element={<DashboardLayout children={<OverviewPage />} />} />
          <Route path='/parish/giáo-dân' element={<DashboardLayout children={<Main />} />} />
          <Route path='/parish/rửa-tội' element={<DashboardLayout children={<ChristenPage />} />} />
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
