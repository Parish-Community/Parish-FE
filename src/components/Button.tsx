import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';

const CoreButton = (props) => {
  const buttonClassName = `core-button ${props.className}`;
  return (
    <Button
      className={buttonClassName}
      type={props.type}
      htmlType={props.htmlType}
      onClick={props.onClick}
      href={props.href}
    >
      {props.text}
    </Button>
  );
};

CoreButton.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  htmlType: PropTypes.string.isRequired,
  className: PropTypes.string,
  href: PropTypes.string
};

export default CoreButton;
