import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';

const CoreButton = ({ type, text, htmlType, onClick, className }) => {
  const buttonClassName = `core-button ${className}`;
  return (
    <Button className={buttonClassName} type={type} htmlType={htmlType} onClick={onClick}>
      {text}
    </Button>
  );
};

CoreButton.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  htmlType: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default CoreButton;
