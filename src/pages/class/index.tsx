import React, { useEffect, useState } from 'react';
import './styles.css';
import { Layout, theme, Form, Modal } from 'antd';
import HeaderChristian from '@/components/HeaderContent/HeaderChristian';
import CoreDrawer from '@/components/Drawer';
import useLogic from './useLogic';
import { Table } from '@/components/table';
import DrawerClassComponent from "@/components/Drawer/DrawerClass";

const { Header, Content } = Layout;

const CourseScreen = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const {
    courses,
    teacherOpts,
    tableKey,
    columns,
    isMiddleScreen,
    deleteModalVisible,
    selectedRecord,
    handleDeleteConfirm,
    handleDeleteCancel,
    onFinish
  } = useLogic();

  const {
    token: { colorBgContainer }
  } = theme.useToken();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const listBUttons = [{ label: 'Lớp học', htmlType: 'submit', onClick: showDrawer, typeBtn: 'primary' }];

  return (
    <main>
      <Header style={{ padding: 0, background: colorBgContainer }}>
        <HeaderChristian buttons={listBUttons} />
      </Header>
      <Content style={{ margin: '26px 18px' }}>
        <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
          <Table
            key={tableKey}
            dataSource={courses}
            columns={columns}
            size={isMiddleScreen ? 'middle' : 'small'}
            pageSizeOptions={['10', '20', '30']}
            showSizeChanger={false}
          />
        </div>
      </Content>
      <DrawerClassComponent
        title='Thêm lớp giáo lý hôn nhân'
        open={open}
        onClose={onClose}
        form={form}
        teacherOption={teacherOpts}
        onFinishSubmit={onFinish}
      />
      <Modal
        title='Confirm Delete'
        visible={deleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      >
        <p>Are you sure you want to delete {selectedRecord && selectedRecord.courseName} ?</p>
        {/* <p>{selectedRecord && selectedRecord.fullname}</p> */}
        {/* Display additional information about the record if needed */}
        {/* For example: <p>{selectedRecord && selectedRecord.fullname}</p> */}
      </Modal>
    </main>
  );
};

export default CourseScreen;
