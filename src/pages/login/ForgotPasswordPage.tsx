import React from 'react';
import { Form, InputNumber } from 'antd';
import './styles.css';
import CoreButton from '@/components/Button';

const ForgotPasswordPage = () => {
  const [form] = Form.useForm();

  const handleButtonClick = () => {
    console.log('Button clicked! OTP');
  };

  return (
    <div>
      <h1 className='text-[#174940] font-normal text-2xl pb-7'>Forgot your password?</h1>
      <h3>Enter your phone number below to receive password reset instructions.</h3>
      <div className=''>
        <Form form={form} layout='vertical' className='pt-6'>
          <Form.Item label='Phone number' name='phoneNumber'>
            <InputNumber className='w-[100%] h-[40px]' />
          </Form.Item>
          <div className='mt-3 mb-4 flex justify-end'></div>
          <Form.Item>
            <CoreButton
              type='primary'
              text='SEND OTP'
              htmlType='submit'
              onClick={handleButtonClick}
              className='w-[100%] button-login'
              href='/auth/verify-otp'
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
