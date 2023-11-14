import React from 'react';
import { DatePicker as AntdDatePicker, Input as AntdInput } from 'antd';

import { TextAreaProps } from 'antd/es/input';
import { classNameCombine } from '@/utils/classNameCombine';
import { RangePickerProps } from 'antd/es/date-picker';
import { InputProps } from './type';

export const TextArea = (props: TextAreaProps) => {
  const { TextArea: AntdTextArea } = AntdInput;

  const className = classNameCombine('w-full !resize-none !bg-secondary');

  return <AntdTextArea className={className} rows={5} {...props} />;
};

export const Input = (props: InputProps) => {
  if (props.type === 'password') {
    return <AntdInput.Password className='!bg-secondary' {...props} />;
  }
  return <AntdInput className='!bg-secondary' {...props} />;
};

export const DatePicker = (props: RangePickerProps) => {
  return <AntdDatePicker.RangePicker className='w-full' {...props} />;
};
