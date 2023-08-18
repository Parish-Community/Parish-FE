import React from 'react';
import { Outlet } from 'react-router-dom';
import './styles.css';
import BannerParish from '@/assets/images/BannerParish.png';
import logo from '@/assets/images/logo.png';

const AuthLayout = () => {
  return (
    <div className='flex flex-row'>
      <div className='w-[70%] h-screen bg-gradient-to-r from-[#174940] from-10%  to-[#F8A927] to-90% p-10'>
        <img className='w-[25%] inline' src={logo} alt='' />
        <div className='flex justify-center h-[95%] items-end'>
          <img className='w-[60%] ' src={BannerParish} alt='' />
        </div>
      </div>
      <main className='w-[30%] p-8'>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
