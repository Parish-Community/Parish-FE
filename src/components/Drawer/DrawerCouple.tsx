import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Drawer, Form, FormInstance, Input, Row, Select, Space, Modal } from 'antd';
import CoreButton from '../Button';
import avatarDefault from '@/assets/images/Avatar.jpeg';
import SelectBox, { SelectBoxOptionProps } from '@/core/selectBox';
import { acceptRegistration } from "@/services/apis/course";

interface DrawerChristenProps {
  title: string;
  open: boolean;
  onClose: () => void;
  form: FormInstance<unknown>;
  listOpenClass: SelectBoxOptionProps[];
  coupleRegistration?: any;
}

const { Option } = Select;
const DrawerCoupleComponent = (props: DrawerChristenProps) => {
  const [image, setImage] = useState('');
  const onFinish = async () => {
    props.form.validateFields();
    const id = props.coupleRegistration?.id;
    console.log('Received values of form: ', props.form.getFieldsValue());
    const data = await props.form.getFieldsValue();

    const handleAcceptCouple = await acceptRegistration(id, data);

    if (handleAcceptCouple?.data?.status === 200) {
      Modal.success({
        content: 'You have successfully accepted couple registration.'
      });
    }
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
          <Form form={props.form}>
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
        <div className='mt-4 flex justify-between w-[100%] h-[68%]'>
          <div className='w-[90%] h-[100%] border-2 border-sky-600 mr-4 rounded-md'>
            <div className='flex justify-around w-[80%] mt-4'>
              <h2 className='ml-[8%] w-[100%] mt-[8%] text-lg font-medium text-[#386DF5]'>Bên nam</h2>
              <div className='w-[100%] ml-[18%] items-center'>
                <img
                  alt='avatar'
                  src={image === '' ? avatarDefault : image}
                  className='h-[55%] w-[55%] ml-[78%] border-2 border-[#174940] mb-2'
                />
                <div className=''>
                  <h3 className='font-medium text-[18px] w-[100%] mb-2 ml-[62%]'>{`${props.coupleRegistration?.parishioner1?.christianName} ${props.coupleRegistration?.parishioner1?.fullname}`}</h3>
                  <div className='flex items-center w-[100%] content-center ml-[68%]'>
                    <p className='w-[100px] bg-[#10C9001F] text-center content-center rounded-md h-[27px] text-[#10C900]'>
                      Đã rửa tội
                    </p>
                    {/* <p className='ml-2'>Detail</p> */}
                    <div className='mt-3 mb-4 ml-2 flex justify-end'>
                      <a className='text-[#386DF5] font-normal' href=''>
                        Detail
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='ml-6'>
              <div>
                <p className='text-[16px]'>
                  Số điện thoại: <span>{props.coupleRegistration?.parishioner1?.phonenumber}</span>
                </p>
                <p className='text-[16px]'>
                  Email: <span>{props.coupleRegistration?.parishioner1?.email}</span>
                </p>
                <p className='text-[16px]'>
                  Giáo họ: <span>{props.coupleRegistration?.parishioner1?.phonenumber}</span>
                </p>
                <p className='text-[16px]'>
                  Ngày sinh: <span>{props.coupleRegistration?.parishioner1?.dateOfBirth}</span>
                </p>
                <p className='text-[16px]'>
                  Giới tính: <span>{props.coupleRegistration?.parishioner1?.gender}</span>
                </p>
                <p className='text-[16px]'>
                  Địa chỉ: <span>{props.coupleRegistration?.parishioner1?.address}</span>
                </p>
                <p className='text-[16px]'>
                  Tên bố: <span>{props.coupleRegistration?.parishioner1?.name_father}</span>
                </p>
                <p className='text-[16px]'>
                  Tên mẹ: <span>{props.coupleRegistration?.parishioner1?.name_mother}</span>
                </p>
              </div>
            </div>
          </div>
          <div className='w-[90%] h-[100%] border-2 border-fuchsia-500 rounded-md'>
            <div className='flex justify-around w-[80%] mt-4 flex-row-reverse ml-8'>
              <h2 className='ml-[8%] w-[100%] mt-[8%] text-lg font-medium text-[#FF00C7] flex justify-end'>Bên nữ</h2>
              <div className='w-[100%] mr-[10%] items-center'>
                <img
                  alt='avatar'
                  src={image === '' ? avatarDefault : image}
                  className='h-[53%] w-[53%] ml-8 border-2 border-[#174940] mb-2'
                />
                <div className='w-[100%]'>
                  <h3 className='font-medium text-[18px] w-[100%] mb-2'>{`${props.coupleRegistration?.parishioner2?.christianName} ${props.coupleRegistration?.parishioner2?.fullname}`}</h3>
                  <div className='flex items-center w-[100%] content-center'>
                    <p className='w-[100px] ml-6 bg-[#10C9001F] text-center content-center rounded-md h-[27px] text-[#10C900]'>
                      Đã rửa tội
                    </p>
                    {/* <p className='ml-2'>Detail</p> */}
                    <div className='mt-3 mb-4 ml-2 flex justify-end'>
                      <a className='text-[#386DF5] font-normal' href=''>
                        Detail
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='ml-6'>
              <div>
                <p className='text-[16px]'>
                  Số điện thoại: <span>{props.coupleRegistration?.parishioner2?.phonenumber}</span>
                </p>
                <p className='text-[16px]'>
                  Email: <span>{props.coupleRegistration?.parishioner2?.email}</span>
                </p>
                <p className='text-[16px]'>
                  Giáo họ: <span>{props.coupleRegistration?.parishioner2?.phonenumber}</span>
                </p>
                <p className='text-[16px]'>
                  Ngày sinh: <span>{props.coupleRegistration?.parishioner2?.dateOfBirth}</span>
                </p>
                <p className='text-[16px]'>
                  Giới tính: <span>{props.coupleRegistration?.parishioner2?.gender}</span>
                </p>
                <p className='text-[16px]'>
                  Địa chỉ: <span>{props.coupleRegistration?.parishioner2?.address}</span>
                </p>
                <p className='text-[16px]'>
                  Tên bố: <span>{props.coupleRegistration?.parishioner2?.name_father}</span>
                </p>
                <p className='text-[16px]'>
                  Tên mẹ: <span>{props.coupleRegistration?.parishioner2?.name_mother}</span>
                </p>
              </div>
            </div>
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
