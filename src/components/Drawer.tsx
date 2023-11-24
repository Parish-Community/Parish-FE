import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Drawer, Form, FormInstance, Input, Row, Select, Space, Modal } from 'antd';
import CoreButton from './Button';
import DatePickerComponent from './datePicker/DatePicker';
import { UploadOutlined, DeleteFilled } from '@ant-design/icons';
import avatarDefault from '@/assets/images/Avatar.jpeg';
import { fetchParishCluster } from '@/services/apis/parishioner';
import SelectBox, { SelectBoxOptionProps } from '@/core/selectBox';
import { GENDER } from '@/core/constants/enum';
import { dateFormatList, formatDateReq, formatYYMMDD } from "@/utils/date";
import { DatePicker } from "@/core/input";

interface CoreDrawerProps {
  title: string;
  open: boolean;
  onClose: () => void;
  form: FormInstance<unknown>;
  onFinishSubmit: any;
}

const { Option } = Select;

const CoreDrawer = (props: CoreDrawerProps) => {
  const [image, setImage] = useState('');
  const [file, setFile] = useState<any>(null);
  const [parishCluster, setParishCluster] = useState<any[]>([]);
  const [dateOfBirth, setDateOfBirth] = useState<any>(null);

  const getBase64 = (img: any, callback: any) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
    console.log('reader', reader);
  };

  const getParishCluster = async () => {
    const response = await fetchParishCluster();
    if (response.data) {
      const options = response?.data.map((item: any) => ({
        label: item.name,
        value: item.parish_clusterId
      }));
      setParishCluster(options);
    }
  };

  useEffect(() => {
    getParishCluster();
  }, []);

  const onFinish = () => {
    props.form.validateFields();
    const payload = {
      fullname: (props.form.getFieldsValue() as { fullname: string }).fullname,
      christianName: (props.form.getFieldsValue() as { christianName: string }).christianName,
      phonenumber: (props.form.getFieldsValue() as { phonenumber: string }).phonenumber,
      name_father: (props.form.getFieldsValue() as { name_father: string }).name_father,
      name_mother: (props.form.getFieldsValue() as { name_mother: string }).name_mother,
      god_parent: (props.form.getFieldsValue() as { god_parent: string }).god_parent,
      address: (props.form.getFieldsValue() as { address: string }).address,
      gender: (props.form.getFieldsValue() as { gender: string }).gender,
      parish_clusterId: (props.form.getFieldsValue() as { parish_clusterId: number }).parish_clusterId,
      avatar: file,
      dateOfBirth: dateOfBirth
    };
    console.log('Received values of form: ', payload);
    props.onFinishSubmit(payload);
    Modal.success({
      content: 'You have successfully added parishioners'
    });
  };

  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setImage(URL.createObjectURL(event.target.files[0]));
      // getBase64(event.target.files[0], (imageUrl: any) => setImage(imageUrl));
    }
  };
  console.log('image', image);

  const onRemoveAvatar = () => {
    setImage('');
  };

  const handleDateChange = (date: any) => {
    console.log('Selected date:', date);
    setDateOfBirth(date);
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
                  className='rounded-full h-full w-[140px] border-2 border-[#174940]'
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
                    name='image'
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
              </div>
            </div>
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='christianName'
                label='Tên Thánh'
                rules={[{ required: true, message: 'Please enter tên thánh' }]}
              >
                <Input placeholder='Please enter tên thánh' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='fullname'
                label='Full Name'
                rules={[{ required: true, message: 'Please enter user full name' }]}
              >
                <Input placeholder='Please enter user full name' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='phonenumber'
                label='Phone Number'
                rules={[{ required: true, message: 'Please enter user phone number' }]}
              >
                <Input placeholder='Please enter user phone number' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='parish_clusterId'
                label='Giáo họ'
                rules={[{ required: true, message: 'Please enter your giáo họ' }]}
              >
                <SelectBox
                  options={parishCluster?.map((option: SelectBoxOptionProps) => ({
                    label: option?.label,
                    value: option?.value
                  }))}
                  label='Giáo họ'
                  name='parish_clusterId'
                  placeholder='Select a teacher'
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='date'
                label='Date of birth'
                rules={[{ required: false, message: 'Please enter date of birth' }]}
              >
                <DatePickerComponent onDateChange={handleDateChange} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='gender' label='Gender' rules={[{ required: true, message: 'Please select gender' }]}>
                <Select placeholder='Select a gender' allowClear>
                  <Option value='male'>Male</Option>
                  <Option value='female'>Female</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='name_father'
                label='Father'
                rules={[{ required: true, message: 'Please enter your Father' }]}
              >
                <Input placeholder='Please enter your ' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='name_mother'
                label='Mother'
                rules={[{ required: true, message: 'Please enter your mother' }]}
              >
                <Input placeholder='Please enter your mother' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='god_parent'
                label='Người đỡ đầu '
                rules={[{ required: true, message: 'Please enter your Người đỡ đầu ' }]}
              >
                <Input placeholder='Please enter your Người đỡ đầu ' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='address'
                label='Address'
                rules={[{ required: true, message: 'please enter your address' }]}
              >
                <Input placeholder='please enter your address' />
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

