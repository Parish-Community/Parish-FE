import React, { ReactNode } from 'react';

import { Button as AntdButton, ButtonProps as AntdButtonProps } from 'antd';
import { classNameCombine } from '@/utils/classNameCombine';

export interface ButtonProps extends AntdButtonProps {
  suffix?: ReactNode | JSX.Element | string;
  spaceBetween?: boolean;
}

export const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { className: classNameProps, type } = props;

  const className = classNameCombine(
    'rounded-full text-primary ',
    classNameProps ?? '',
    type === 'primary' ? 'text-secondary' : 'text-primary'
  );

  return (
    <AntdButton className={className} {...props}>
      {props.children}
      {props.suffix ?? ''}
    </AntdButton>
  );
};
