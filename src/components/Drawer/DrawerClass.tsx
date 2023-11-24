import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Drawer, Form, FormInstance, Input, Row, Select, Space, Modal } from 'antd';
import CoreButton from '../Button';
import DatePickerComponent from '../datePicker/DatePicker';
import SelectBox, { SelectBoxOptionProps } from '@/core/selectBox';
import { dateFormatList } from "@/utils/date";
import { DatePicker } from "@/core/input";

interface DrawerChristenProps {
  title: string;
  open: boolean;
  onClose: () => void;
  form: FormInstance<unknown>;
  teacherOption: SelectBoxOptionProps[];
  onFinishSubmit: any;
}

// const { Option } = Select;
const DrawerClassComponent = (props: DrawerChristenProps) => {
  const onFinish = () => {
    props.form.validateFields();
    console.log('Received values of form: ', props.form.getFieldsValue());
    props.onFinishSubmit(props.form.getFieldsValue());
    // Modal.success({
    //   content: 'You have successfully added parishioners.'
    // });
  };

  return (
    <>
      <Drawer
        title={props.title}
        width={520}
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
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name='courseName'
                label='Tên lớp'
                rules={[{ required: true, message: 'Please enter course name' }]}
              >
                <Input placeholder='Please enter course' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name='startAndEndDate'
                label='Thời gian lớp học'
                rules={[{ required: true, message: 'Please enter start date' }]}
              >
                <DatePicker format={dateFormatList} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name='profileId'
                label='Giáo viên'
                rules={[{ required: true, message: 'Please select teacher' }]}
              >
                {/* <Select placeholder='Select a teacher' allowClear>
                  <Option value='Male'>Male</Option>
                  <Option value='Female'>Female</Option>
                </Select> */}
                <SelectBox
                  options={props.teacherOption?.map((option: SelectBoxOptionProps) => ({
                    label: option?.label,
                    value: option?.value
                  }))}
                  label='Giáo viên'
                  name='profileId'
                  placeholder='Select a teacher'
                />
              </Form.Item>
            </Col>
          </Row>
          {/* <Row gutter={16}>
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
          </Row> */}
        </Form>
      </Drawer>
    </>
  );
};

DrawerClassComponent.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default DrawerClassComponent;
