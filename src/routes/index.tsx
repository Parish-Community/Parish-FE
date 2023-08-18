import React from 'react';
import { RouteObject } from 'react-router-dom';
import { AuthLayout, DashboardLayout } from '@/pages/layout';
import Main from '@/pages/main';
import NotFound from '@/pages/NotFound';
import { LoginPage, ForgotPasswordPage, OtpPage, ChangePasswordPage } from '@/pages/login';

export default [
  {
    path: '/',
    element: <DashboardLayout />,
    children: [{ index: true, element: <Main /> }]
  },
  {
    path: '/auth/login',
    element: <AuthLayout />,
    children: [{ index: true, element: <LoginPage /> }]
  },
  {
    path: '/auth/forgot-password',
    element: <AuthLayout />,
    children: [{ index: true, element: <ForgotPasswordPage /> }]
  },
  {
    path: '/auth/verify-otp',
    element: <AuthLayout />,
    children: [{ index: true, element: <OtpPage /> }]
  },
  {
    path: '/auth/change-password',
    element: <AuthLayout />,
    children: [{ index: true, element: <ChangePasswordPage /> }]
  },
  {
    path: '/*',
    element: <NotFound />
  },
] as RouteObject[];
