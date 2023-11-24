import React from 'react';
import PropTypes from 'prop-types';
import CoreButton from '../Button';

interface HeaderChristianProps {
  label: string;
  htmlType: string;
  onClick: () => void;
  typeBtn: string;
  isUploadFile?: boolean;
}

const HeaderChristian = (props: { buttons?: HeaderChristianProps[]; children: any }) => {
  const handleClick = (onclickFunction: () => void) => {
    onclickFunction();
  };

  return (
    <div className='flex justify-end mr-6'>
      <div className='mr-4'>{props.children}</div>
      {props?.buttons?.map((button: HeaderChristianProps) => {
        return (
          <CoreButton
            key={button.label}
            type='primary'
            text={button.label}
            htmlType={button.htmlType}
            onClick={() => handleClick(button.onClick)}
            className={`w-[8%] button-${button.typeBtn} mt-3 h-10 mr-4 ${
              button.typeBtn == 'primary' ? 'text-[#fff]' : 'text-[#000]'
            }`}
          />
        );
      })}
    </div>
  );
};

HeaderChristian.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default HeaderChristian;
