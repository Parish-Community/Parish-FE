/* import packages */
import React from 'react';

/* import component from package */
import { Input } from 'antd';
import { debounce } from 'lodash';

/* import icon/asset */
import { SearchOutlined } from '@ant-design/icons';

/* import custom component */
import { SearchProps } from './type';
import { classNameCombine } from '@/utils/classNameCombine';

export const SearchBar = ({ shape = 'circle', ...props }: SearchProps) => {
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    props?.changeHandler?.(event.target.value ?? '');
  };
  const className = classNameCombine(`relative bg-secondary ${props?.className}`);

  const debouncedChangeHandler = debounce(changeHandler, 300);

  return (
    <div className={className}>
      <Input
        onChange={debouncedChangeHandler}
        className={`!bg-secondary ${shape === 'circle' ? 'rounded-full' : ''}`}
        prefix={<SearchOutlined className='text-lg' />}
        placeholder={'Tìm kiếm'}
      />
    </div>
  );
};
