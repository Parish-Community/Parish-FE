import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Drawer, Form, FormInstance, Input, Row, Select, Space, Modal } from 'antd';
import CoreButton from '../Button';
import avatarDefault from '@/assets/images/Avatar.jpeg';
import SelectBox, { SelectBoxOptionProps } from '@/core/selectBox';

interface DrawerChristenProps {
  title: string;
  open: boolean;
  onClose: () => void;
  form: FormInstance<unknown>;
  listOpenClass: SelectBoxOptionProps[];
}

const { Option } = Select;
const DrawerCoupleComponent = (props: DrawerChristenProps) => {
  const [image, setImage] = useState('');
  const onFinish = () => {
    props.form.validateFields();
    console.log('Received values of form: ', props.form.getFieldsValue());
    // Modal.success({
    //   content: 'You have successfully added parishioners.'
    // });
  };

  const onAcceptCouple = () => {
    console.log('Received values of form: ', props.form.getFieldsValue());
  };

  return (
    <>
      <Drawer
        title={props.title}
        width={1560}
        onClose={props.onClose}
        open={props.open}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <CoreButton
              key={2}
              onClick={onFinish}
              type='primary'
              text='Accept'
              htmlType='submit'
              className='w-[8%] button-primary mt-3 h-10 mr-4 text-[#fff]'
            />
            <CoreButton
              key={1}
              type='secondary'
              text='Cancel'
              htmlType='submit'
              onClick={props.onClose}
              className='w-[8%] button-secondary mt-3 h-10 mr-4 text-[#000] hover:text-[#fff]'
            />
          </Space>
        }
      >
        <div className='flex w-[100%] justify-between items-center'>
          <div>
            <h2 className='font-bold text-base'>Ngày đăng ký: 06/11/2023</h2>
          </div>
          <Form>
            <Form.Item
              name='courseId'
              label='Lớp giáo lý hôn nhân'
              rules={[{ required: true, message: 'Please select class' }]}
            >
              <SelectBox
                options={props.listOpenClass?.map((option: SelectBoxOptionProps) => ({
                  label: option?.label,
                  value: option?.value
                }))}
                label='Lớp giáo lý hôn nhân'
                name='courseId'
                placeholder='Select a class'
              />
            </Form.Item>
          </Form>
        </div>
        <div className='mt-4 flex justify-between w-[100%] h-[78%]'>
          <div className='w-[90%] h-[100%] border-2 border-sky-600 mr-4 rounded-md'>
            <div>
              <h2>Bên nam</h2>
              <div>
                <img
                  alt='avatar'
                  src={image === '' ? avatarDefault : image}
                  className='rounded-full h-full w-[140px] border-2 border-[#174940]'
                />
                <h3>Nguyen Van B</h3>
                <div>
                  <p>Đã rửa tội</p>
                  <p>Detail</p>
                </div>
              </div>
            </div>
            <div>
              <div>
                <p>
                  Số điện thoại: <span>0961135481</span>
                </p>
                <p>
                  Email: <span>0961135481</span>
                </p>
                <p>
                  Giáo họ: <span>0961135481</span>
                </p>
                <p>
                  Ngày sinh: <span>0961135481</span>
                </p>
                <p>
                  Giới tính: <span>0961135481</span>
                </p>
                <p>
                  Địa chỉ: <span>0961135481</span>
                </p>
              </div>
            </div>
          </div>
          <div className='w-[90%] h-[100%] border-2 border-fuchsia-500 rounded-md'>
            <h2>Bên nữ</h2>
          </div>
        </div>
      </Drawer>
    </>
  );
};

DrawerCoupleComponent.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default DrawerCoupleComponent;
