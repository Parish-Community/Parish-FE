import React from 'react';
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';

const props: UploadProps = {
  name: 'file',
  // action: 'http://localhost:8888/api/v1/parishioner/import-parishioner',
  action: 'http://localhost:8888/api/v1/baptism/import',
  headers: {
    authorization: 'authorization-text'
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  progress: {
    strokeColor: {
      '0%': '#108ee9',
      '100%': '#87d068',
    },
    strokeWidth: 3,
    format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`
  }
};

const UploadFile: React.FC = () => (
  <Upload {...props} className='items-center content-center'>
    <Button className='h-10 w-[112px] items-center'>Import</Button>
  </Upload>
);

export default UploadFile;
