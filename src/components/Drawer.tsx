import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Drawer, Form, FormInstance, Input, Row, Select, Space } from 'antd';
import CoreButton from './Button';
import DatePickerComponent from './datePicker/DatePicker';
import { UploadOutlined, DeleteFilled } from '@ant-design/icons';
import avatarDefault from '@/assets/images/Avatar.jpeg';

interface CoreDrawerProps {
  title: string;
  open: boolean;
  onClose: () => void;
  form: FormInstance<unknown>;
}

const { Option } = Select;

const CoreDrawer = (props: CoreDrawerProps) => {
  const [image, setImage] = useState('');
  const onFinish = () => {
    props.form.validateFields();
    console.log('Received values of form: ', props.form.getFieldsValue());
  };

  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const onRemoveAvatar = () => {
    setImage('');
  };

  return (
    <>
      <Drawer
        title={props.title}
        width={720}
        onClose={props.onClose}
        open={props.open}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <CoreButton
              key={1}
              type='secondary'
              text='Cancel'
              htmlType='submit'
              onClick={props.onClose}
              className='w-[8%] button-secondary mt-3 h-10 mr-4 text-[#000] hover:text-[#fff]'
            />
            <CoreButton
              key={2}
              onClick={onFinish}
              type='primary'
              text='Save'
              htmlType='submit'
              className='w-[8%] button-primary mt-3 h-10 mr-4 text-[#fff]'
            />
          </Space>
        }
      >
        <Form layout='vertical' hideRequiredMark form={props.form}>
          <Form.Item label='Avatar' name='avatar'>
            <div className='w-full h-[140px] flex gap-6'>
              <div className=''>
                <img
                  alt='avatar'
                  src={image === '' ? avatarDefault : image}
                  className='rounded-full h-full w-[140px] border-4 border-[#174940]'
                />
              </div>
              <div className='flex items-center gap-3'>
                <div className='w-[180px] text-center font-medium bg-[#D7B300] cursor-pointer py-2 h-[40px] rounded-md border-2 flex justify-center items-center gap-2'>
                  <UploadOutlined style={{ fontSize: 22 }} />
                  <label htmlFor='file-upload' className='text-white'>
                    UPLOAD AVATAR
                  </label>
                  <input
                    id='file-upload'
                    type='file'
                    accept='image/*'
                    onChange={onImageChange}
                    style={{ display: 'none' }}
                  />
                </div>
                {image !== '' && (
                  <Button className='h-[40px]' onClick={onRemoveAvatar}>
                    <DeleteFilled style={{ fontSize: 22, color: '#174940' }} />
                  </Button>
                )}
                {/* <Button className='h-[40px]'>
                  <DeleteFilled style={{ fontSize: 22, color: '#174940' }} />
                </Button> */}
              </div>
            </div>
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='fullName'
                label='Full Name'
                rules={[{ required: true, message: 'Please enter user full name' }]}
              >
                <Input placeholder='Please enter user full name' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='email' label='Email' rules={[{ required: true, message: 'Please enter user email' }]}>
                <Input placeholder='Please enter user email' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='phoneNumber'
                label='Phone Number'
                rules={[{ required: true, message: 'Please enter user phone number' }]}
              >
                <Input placeholder='Please enter user phone number' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='giao_ho'
                label='Giáo họ'
                rules={[{ required: true, message: 'Please enter your giáo họ' }]}
              >
                <Input placeholder='Please enter your giáo họ' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='dateOfBirth'
                label='Date of birth'
                rules={[{ required: true, message: 'Please enter date of birth' }]}
              >
                {/* <Input placeholder='Please enter user phone number' /> */}
                <DatePickerComponent />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='gender' label='Gender' rules={[{ required: true, message: 'Please select gender' }]}>
                <Select placeholder='Select a gender' allowClear>
                  <Option value='Male'>Male</Option>
                  <Option value='Female'>Female</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name='father' label='Father' rules={[{ required: true, message: 'Please enter your Father' }]}>
                <Input placeholder='Please enter your ' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='mother' label='Mother' rules={[{ required: true, message: 'Please enter your mother' }]}>
                <Input placeholder='Please enter your mother' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='nguoi_do_dau'
                label='Người đỡ đầu '
                rules={[{ required: true, message: 'Please enter your Người đỡ đầu ' }]}
              >
                <Input placeholder='Please enter your Người đỡ đầu ' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name='address'
                label='Address'
                rules={[
                  {
                    required: true,
                    message: 'please enter your Address'
                  }
                ]}
              >
                <Input.TextArea rows={2} placeholder='please enter your description' />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

CoreDrawer.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default CoreDrawer;
