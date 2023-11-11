import React, { useEffect, useState } from 'react';
import './styles.css';
import qs from 'qs';
import { Layout, theme, Form, Space, Image, Modal } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import HeaderChristian from '@/components/HeaderContent/HeaderChristian';
import CoreDrawer from '@/components/Drawer';
import icondDelete from '@/assets/icons/IconDelete.png';
import { DeleteOutlined } from '@ant-design/icons';
import useLogic from './useLogic';
import { Table } from '@/components/table';

const { Header, Content } = Layout;

const Main = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const {
    parishioners,
    tableKey,
    columns,
    isMiddleScreen,
    deleteModalVisible,
    selectedRecord,
    handleDeleteConfirm,
    handleDeleteCancel
  } = useLogic();

  const {
    token: { colorBgContainer }
  } = theme.useToken();

  const [open, setOpen] = useState(false);

  const handleClickBtn = () => {
    console.log('click');
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const listBUttons = [
    { label: 'Xuất danh sách', htmlType: 'submit', onClick: handleClickBtn, typeBtn: 'secondary' },
    { label: 'Upload danh sách', htmlType: 'submit', onClick: handleClickBtn, typeBtn: 'secondary' },
    { label: 'Giáo dân', htmlType: 'submit', onClick: showDrawer, typeBtn: 'primary' }
  ];

  return (
    <main>
      <Header style={{ padding: 0, background: colorBgContainer }}>
        <HeaderChristian buttons={listBUttons} />
      </Header>
      <Content style={{ margin: '26px 18px' }}>
        <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
          <Table
            key={tableKey}
            dataSource={parishioners}
            columns={columns}
            size={isMiddleScreen ? 'middle' : 'small'}
            pageSizeOptions={['10', '20', '30']}
            showSizeChanger={false}
          />
        </div>
      </Content>
      <CoreDrawer title='Thêm thông tin giáo dân' open={open} onClose={onClose} form={form} />
      <Modal
        title='Confirm Delete'
        visible={deleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      >
        <p>Are you sure you want to delete this record?</p>
        {/* Display additional information about the record if needed */}
        {/* For example: <p>{selectedRecord && selectedRecord.fullname}</p> */}
      </Modal>
    </main>
  );
};

export default Main;
