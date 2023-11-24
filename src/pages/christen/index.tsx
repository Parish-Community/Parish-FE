import React, { useEffect, useState } from 'react';
import './styles.css';
import useLogic from './useLogic';
import { Layout, theme, Form, Modal } from 'antd';
import HeaderChristian from '@/components/HeaderContent/HeaderChristian';
import CoreDrawer from '@/components/Drawer';
import DrawerChristenComponent from '@/components/Drawer/DrawerChristen';
import { Table } from '@/components/table';
import UploadFile from '@/core/upload';

const { Header, Content } = Layout;

const ChristenPage = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken();
  const [form] = Form.useForm();

  const {
    baptismData,
    baptismRes,
    columns,
    tableKey,
    isMiddleScreen,
    setCurrentPage,
    deleteModalVisible,
    handleDeleteCancel,
    handleDeleteConfirm,
    selectedRecord,
    openDrawerEdit,
    onClose,
    currentPage
  } = useLogic();

  const listBUttons = [
    // { label: 'Xuất danh sách', htmlType: 'submit', onClick: handleClickBtn, typeBtn: 'secondary' },
    // { label: 'Upload danh sách', htmlType: 'submit', onClick: handleClickBtn, typeBtn: 'secondary' },
    // { label: 'Rửa tội', htmlType: 'submit', onClick: showDrawer, typeBtn: 'primary' }
  ];

  return (
    <main>
      <Header style={{ padding: 0, background: colorBgContainer }}>
        <HeaderChristian children={<UploadFile />} />
      </Header>
      <Content style={{ margin: '26px 18px' }}>
        <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
          <Table
            columns={columns}
            rowKey={tableKey}
            dataSource={baptismData}
            size={isMiddleScreen ? 'middle' : 'small'}
            pageSizeOptions={['10', '20', '30']}
            showSizeChanger={false}
            total={baptismRes?.totalDocs}
            onChange={(pagination) => setCurrentPage(pagination?.current || -1)}
            current={baptismRes?.page}
          />
        </div>
      </Content>
      <DrawerChristenComponent
        title='Thông tin chi tiết'
        open={openDrawerEdit}
        onClose={onClose}
        form={form}
        record={selectedRecord}
        page={currentPage}
      />
      <Modal
        title='Confirm Delete'
        visible={deleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      >
        <p>Are you sure you want to delete {selectedRecord && selectedRecord.parishioner.fullname} ?</p>
        {/* <p>{selectedRecord && selectedRecord.name_father}</p> */}
        {/* <p>{selectedRecord && selectedRecord.fullname}</p> */}
        {/* Display additional information about the record if needed */}
        {/* For example: <p>{selectedRecord && selectedRecord.fullname}</p> */}
      </Modal>
    </main>
  );
};

export default ChristenPage;
