import React from 'react';
import { Form, Input } from 'antd';
import './styles.css';
import BannerParish from '@/assets/images/BannerParish.png';
import logo from '@/assets/images/logo.png';
import logo2 from '@/assets/images/logo-2.png';
import CoreButton from '@/components/Button';

const Main = () => {
  const [form] = Form.useForm();

  const handleButtonClick = () => {
    console.log('Button clicked!');
  };

  return (
    <div className='flex flex-row'>
      <div className='w-[70%] h-screen bg-gradient-to-r from-[#174940] from-10%  to-[#F8A927] to-90% p-10'>
        <img className='w-[25%] inline' src={logo} alt='' />
        <div className='flex justify-center h-[95%] items-end'>
          <img className='w-[60%] ' src={BannerParish} alt='' />
        </div>
      </div>
      <div className='w-[30%] p-8'>
        <h1 className='text-[#174940] font-normal text-2xl pb-7'>WELCOME TO</h1>
        <img className='inline' src={logo2} alt='' />
        <p className='font-normal text-base pt-10 text-[#636366]'>Please login to manage Church Community.</p>
        <div className=''>
          <Form form={form} layout='vertical' className='pt-6'>
            <Form.Item label='Email' name='email'>
              <Input className='w-[100%] h-[40px]' />
            </Form.Item>
            <Form.Item label='Password' name='password'>
              <Input.Password className='w-[100%] h-[40px]' />
            </Form.Item>
            <div className='mt-3 mb-4 flex justify-end'>
              <a className='text-[#386DF5] font-normal text-sm' href='#'>
                Forgot password?
              </a>
            </div>
            <Form.Item>
              <CoreButton
                type='primary'
                text='LOGIN'
                htmlType='submit'
                onClick={handleButtonClick}
                className='w-[100%] button-login'
              />
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Main;
