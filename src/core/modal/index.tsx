import React from 'react';
import { Modal as AntdModal, ModalProps as AntdModalProps } from 'antd';

export interface ModalProps extends AntdModalProps {
  title: any;
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  cancelText?: any;
  cancelButtonProps?: any;
  okButtonProps?: any;
  okText?: any;
}

const CoreModel = (props: ModalProps) => {
  return (
    <AntdModal
      className='text-center mt-3'
      title={props.title}
      open={props.open}
      onOk={props.onOk}
      onCancel={props.onCancel}
      cancelText={props.cancelText ?? 'No'}
      cancelButtonProps={props.cancelButtonProps ?? {}}
      okButtonProps={props.okButtonProps ?? {}}
      closeIcon={false}
      okText={props.okText ?? 'Ok'}
    >
      {props.children}
    </AntdModal>
  );
};

export default CoreModel;
