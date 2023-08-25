import React, { ReactNode } from 'react';
// import { Outlet } from 'react-router-dom';
import './styles.css';
import BannerParish from '@/assets/images/BannerParish.png';
import logo from '@/assets/images/logo.png';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className='flex flex-row'>
      <div className='w-[70%] h-screen bg-gradient-to-r from-[#174940] from-10%  to-[#F8A927] to-90% p-10'>
        <img className='w-[25%] inline' src={logo} alt='' />
        <div className='flex justify-center h-[95%] items-end'>
          <img className='w-[60%] ' src={BannerParish} alt='' />
        </div>
      </div>
      <main className='w-[30%] p-8'>
        {/* <Outlet /> */}
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
