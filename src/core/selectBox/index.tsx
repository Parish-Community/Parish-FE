import React from 'react';
import { Select } from 'antd';

import { DefaultOptionType } from 'antd/es/select';

export interface SelectBoxOptionProps {
  label: string;
  value: string;
}

interface SelectBoxProps extends DefaultOptionType {
  options: SelectBoxOptionProps[];
}

const SelectBox = (props: SelectBoxProps) => {
  const { options } = props;
  const renderSelectBoxOptions = options?.map((item, index) => (
    <Select.Option key={index}>{item?.label || ''}</Select.Option>
  ));

  return (
    <Select className='w-full' {...props} allowClear>
      {renderSelectBoxOptions}
    </Select>
  );
};

export default SelectBox;
