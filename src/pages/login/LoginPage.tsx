import React from 'react';
import { Form, Input } from 'antd';
import './styles.css';
import logo2 from '@/assets/images/logo-2.png';
import CoreButton from '@/components/Button';

const LoginPage = () => {
  const [form] = Form.useForm();

  const handleButtonClick = () => {
    console.log('Button clicked!');
  };

  return (
    <div>
      <div>
        <h1 className='text-[#174940] font-normal text-2xl pb-7'>WELCOME TO</h1>
        <img className='inline' src={logo2} alt='' />
        <p className='font-normal text-base pt-10 text-[#636366]'>Please login to manage Church Community.</p>
        <div className=''>
          <Form form={form} layout='vertical' className='pt-6'>
            <Form.Item label='Phone number' name='phoneNumber'>
              <Input className='w-[100%] h-[40px]' />
            </Form.Item>
            <Form.Item label='Password' name='password'>
              <Input.Password className='w-[100%] h-[40px]' />
            </Form.Item>
            <div className='mt-3 mb-4 flex justify-end'>
              <a className='text-[#386DF5] font-normal text-sm' href='/auth/forgot-password'>
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

export default LoginPage;
