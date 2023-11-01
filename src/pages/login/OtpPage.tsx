import React, { useState, useRef } from 'react';
import './styles.css';
import { Input, Row, Col } from 'antd';
import CoreButton from '@/components/Button';

const OtpPage = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const handleOtpChange = (index: number, value: string) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value === '') {
        // When backspace is pressed, move focus to the previous input
        if (index > 0) {
          inputRefs.current[index - 1].focus();
        }
      } else if (index < 5) {
        // When a digit is entered, move focus to the next input
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleSubmit = () => {
    console.log('submit OTP');
    const enteredOtp = otp.join('');
    console.log('OTP code: ' + enteredOtp);
  };

  return (
    <div>
      <div className='pt-6'>
        <h1 className='text-[#174940] font-normal text-2xl pb-7'>Verify OTP</h1>
        <Row gutter={16}>
          {Array.from({ length: 6 }, (_, index) => (
            <Col key={index} span={4}>
              <Input
                ref={(input) => (inputRefs.current[index] = input)}
                value={otp[index] || ''}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                maxLength={1}
                style={{ textAlign: 'center', fontSize: '1.5rem' }}
                id={`input-${index}`}
              />
            </Col>
          ))}
        </Row>
        <div className='mb-4 flex justify-end mt-4'>
          <h4>You did not receive the OTP?</h4>
          <a className='text-[#386DF5] font-normal ml-2' href='/auth/forgot-password'>
            Resend OTP
          </a>
        </div>
      </div>
      <CoreButton
        type='primary'
        text='VERIFY'
        htmlType='submit'
        onClick={handleSubmit}
        className='w-[100%] button-login mt-2'
      />
    </div>
  );
};

export default OtpPage;
