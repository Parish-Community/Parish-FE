import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Drawer, Form, FormInstance, Input, Row, Select, Space, Modal } from 'antd';
import CoreButton from '../Button';
import DatePickerComponent from '../datePicker/DatePicker';
import SelectBox, { SelectBoxOptionProps } from '@/core/selectBox';
import { fetchParishCluster } from '@/services/apis/parishioner';
import { formatDateString, formatYYMMDD } from '@/utils/date';

interface DrawerChristenProps {
  title: string;
  open: boolean;
  onClose: () => void;
  form: FormInstance<unknown>;
  record?: any;
  page?: number;
}

const { Option } = Select;
const DrawerChristenComponent = (props: DrawerChristenProps) => {
  const [parishCluster, setParishCluster] = useState<any[]>([]);
  const [dateBaptism, setDateBaptism] = useState<any>();

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
    if (props.record) {
      console.log('props.record', props.record);
      props.form.setFieldsValue({
        christianName: props.record.parishioner.christianName,
        fullname: props.record.parishioner.fullname,
        phonenumber: props.record.parishioner?.phonenumber || 'Chưa có',
        gender: props.record.parishioner.gender,
        name_father: props.record.parishioner.name_father,
        name_mother: props.record.parishioner.name_mother,
        god_parent: props.record?.parishioner?.god_parent || 'Chưa có',
        priestBaptism: props.record.priestBaptism,
        parish_cluster: props.record.parishioner.parish_cluster.name,
        parish_clusterId: props.record.parish_clusterId,
        dateOfBirth: formatDateString(props.record.parishioner.dateOfBirth),
        dateBaptism: formatDateString(props.record?.dateBaptism || '2023-12-02')
      });
    }
  }, [props?.page, props.record?.id]);

  const onFinish = () => {
    props.form.validateFields();
    console.log('Received values of form: ', props.form.getFieldsValue());
    // Modal.success({
    //   content: 'You have successfully added parishioners.'
    // });
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
            {props.record?.isAccepted ? null : (
              <CoreButton
                key={2}
                onClick={onFinish}
                type='primary'
                text='Accept'
                htmlType='submit'
                className='w-[8%] button-primary mt-3 h-10 mr-4 text-[#fff]'
              />
            )}
          </Space>
        }
      >
        <Form layout='vertical' hideRequiredMark form={props.form}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='christianName'
                label='Tên thánh'
                rules={[{ required: true, message: 'Please enter user full name' }]}
              >
                <Input className='bg-slate-200 cursor-not-allowed' placeholder='Please enter user full name' readOnly />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='fullname'
                label='Full Name'
                rules={[{ required: true, message: 'Please enter user full name' }]}
              >
                <Input className='bg-slate-200 cursor-not-allowed' placeholder='Please enter user full name' readOnly />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='phonenumber'
                label='Số điện thoại'
                rules={[{ required: true, message: 'Please enter user email' }]}
              >
                <Input className='bg-slate-200 cursor-not-allowed' placeholder='Please enter email' readOnly />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='parish_cluster'
                label='Giáo họ'
                rules={[{ required: true, message: 'Please enter your giáo họ' }]}
              >
                <Input className='bg-slate-200 cursor-not-allowed' placeholder='Please enter your giáo họ' readOnly />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='dateOfBirth'
                label='Ngày sinh'
                rules={[{ required: true, message: 'Please enter date of birth' }]}
              >
                <Input className='bg-slate-200 cursor-not-allowed' placeholder='' readOnly />
                {/* <DatePickerComponent recordDate={dateOfBirth} onDateChange={undefined} disabled={true} /> */}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name='gender' label='Giới tính' rules={[{ required: true, message: 'Please select gender' }]}>
                <Select placeholder='Select a gender' allowClear disabled>
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
                label='Tên bố'
                rules={[{ required: true, message: 'Please enter your Father' }]}
              >
                <Input className='bg-slate-200 cursor-not-allowed' placeholder='Please enter tên bố' readOnly />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='name_mother'
                label='Tên mẹ'
                rules={[{ required: true, message: 'Please enter your mother' }]}
              >
                <Input className='bg-slate-200 cursor-not-allowed' placeholder='Please enter tên mẹ' readOnly />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='god_parent'
                label='Người đỡ đầu '
                rules={[{ required: true, message: 'Please enter your người đỡ đầu ' }]}
              >
                <Input
                  className='bg-slate-200 cursor-not-allowed'
                  placeholder='Please enter your người đỡ đầu '
                  readOnly
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='priestBaptism'
                label='Cha cử hành'
                rules={[{ required: true, message: 'Please enter your Người đỡ đầu ' }]}
              >
                <Input
                  className={`${props?.record?.isAccepted ? 'bg-slate-200 cursor-not-allowed' : ''}`}
                  placeholder='Please enter cha cử hành'
                  readOnly={props?.record?.isAccepted ? true : false}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name='dateBaptism'
                label='Ngày cử hành'
                rules={[{ required: true, message: 'Please enter your Người đỡ đầu ' }]}
              >
                {props?.record?.isAccepted ? (
                  <Input className='bg-slate-200 cursor-not-allowed' placeholder='' readOnly />
                ) : (
                  <DatePickerComponent
                    recordDate={dateBaptism}
                    onDateChange={undefined}
                    disabled={props?.record?.isAccepted ? true : false}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='parish_clusterId'
                label='Nơi cử hành'
                rules={[{ required: true, message: 'Please select nơi cử hành' }]}
              >
                <SelectBox
                  options={parishCluster?.map((option: SelectBoxOptionProps) => ({
                    label: option?.label,
                    value: option?.value
                  }))}
                  label='Giáo họ'
                  name='parish_clusterId'
                  placeholder='chọn giáo họ'
                  disabled={props?.record?.isAccepted ? true : false}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <div>
          <h2 className='mt-1 text-base font-bold'>Thông tin người đăng ký:</h2>
          <table className='custom-table'>
            <tbody>
              <tr>
                <td>Họ và tên:</td>
                <td>
                  {props?.record?.account.christianName} {props?.record?.account.fullname}
                </td>
              </tr>
              <tr>
                <td>Số điện thoại:</td>
                <td>{props?.record?.account.phonenumber}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{props?.record?.account.email}</td>
              </tr>
              <tr>
                <td>Ngày đăng ký:</td>
                <td>{formatYYMMDD(props?.record?.createdAt)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Drawer>
    </>
  );
};

DrawerChristenComponent.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default DrawerChristenComponent;
