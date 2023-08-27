import React from 'react';
import PropTypes from 'prop-types';
import CoreButton from '../Button';

const HeaderChristian = (props) => {
  return (
    <div className='flex justify-end mr-6'>
      <CoreButton
        type='primary'
        text={'Xuất danh sách'}
        htmlType='submit'
        onClick={props.onClick}
        className='w-[8%] button-secondary mt-3 h-10 mr-4 text-[#174940]'
      />
      <CoreButton
        type='primary'
        text='Upload danh sách'
        htmlType='submit'
        onClick={props.onClick}
        className='w-[10%] button-secondary mt-3 h-10 mr-4 text-[#174940]'
      />
      <CoreButton
        type='primary'
        text={props.btnLabel}
        htmlType='submit'
        onClick={props.onClick}
        className='w-[8%] button-primary mt-3 h-10 text-[#174940]'
      />
    </div>
  );
};

HeaderChristian.propTypes = {
  btnLabel: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default HeaderChristian;
