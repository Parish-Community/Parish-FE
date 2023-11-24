import React, { useState } from 'react';
import { Form, Input, message } from 'antd';
import './styles.css';
import logo2 from '@/assets/images/logo-2.png';
import CoreButton from '@/components/Button';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { saveUserData } from '../../hooks/actions/userActions';
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  payload: {
    accountId: number;
    fullname: string;
    email: string;
    phonenumber: string;
    roleId: number;
    role: string;
    isActive: boolean;
    firstLogin: boolean;
  };
}

const LoginPage = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = async () => {
    try {
      const formData = await form.validateFields();
      setLoading(true);

      const response = await axios.post('http://localhost:8888/api/v1/auth/login', formData);

      if (response.data.status !== 200) {
        message.error('Login failed. Please check your phone number and password.');
        setLoading(false);
        return;
      }

      const decodedToken = jwtDecode<JwtPayload>(response.data.data.accessToken);

      if (decodedToken?.payload.role !== 'admin') {
        message.error('You are not role admin. Please login with role admin.');
        setLoading(false);
        return;
      }

      localStorage.setItem('access_token', response.data.data.accessToken);
      const payload = {
        userData: decodedToken,
        accessToken: response.data.data.accessToken,
        isAuthenticated: true
      }
      dispatch(saveUserData(payload));

      form.resetFields();
      setLoading(false);
      navigate('/parish/overview');
    } catch (error) {
      console.error('Login error:', error);
      message.error('Login failed. Please check your phone number and password.');
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <h1 className='text-[#174940] font-normal text-2xl pb-7'>WELCOME TO</h1>
        <img className='inline' src={logo2} alt='' />
        <p className='font-normal text-base pt-10 text-[#636366]'>Please login to manage Church Community.</p>
        <div className=''>
          <Form form={form} layout='vertical' className='pt-6'>
            <Form.Item label='Phone number' name='phonenumber'>
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
                loading={loading}
              />
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
