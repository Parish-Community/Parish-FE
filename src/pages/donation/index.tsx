import React, { useEffect, useState } from 'react';
import './styles.css';
import useLogic from './useLogic';
import { Layout, theme, Form, Modal } from 'antd';
import HeaderChristian from '@/components/HeaderContent/HeaderChristian';
import CoreDrawer from '@/components/Drawer';
import DrawerChristenComponent from '@/components/Drawer/DrawerChristen';
import { Table } from '@/components/table';
import UploadFile from '@/core/upload';
import { SearchBar } from "@/core/searchBar";

const { Header, Content } = Layout;

const DonationsPage = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken();
  const [form] = Form.useForm();

  const {
    donationsData,
    donationsRes,
    columns,
    tableKey,
    isMiddleScreen,
    setCurrentPage,
    selectedRecord,
    openDrawerEdit,
    onClose,
    currentPage,
    onFinishAccepted,
    setSearch,
    onSearch
  } = useLogic();

  const listBUttons = [
    // { label: 'Xuất danh sách', htmlType: 'submit', onClick: handleClickBtn, typeBtn: 'secondary' },
    // { label: 'Upload danh sách', htmlType: 'submit', onClick: handleClickBtn, typeBtn: 'secondary' },
    // { label: 'Rửa tội', htmlType: 'submit', onClick: showDrawer, typeBtn: 'primary' }
  ];

  return (
    <main>
      <Header style={{ padding: 0, background: colorBgContainer }}>
        <HeaderChristian children={undefined} />
      </Header>
      <Content style={{ margin: '26px 18px' }}>
        <div className='w-[280px] h-[60px]'>
          <SearchBar className='!bg-[#EFF4FB]' changeHandler={onSearch}></SearchBar>
        </div>
        <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
          <Table
            columns={columns}
            rowKey={tableKey}
            dataSource={donationsData}
            size={isMiddleScreen ? 'middle' : 'small'}
            pageSizeOptions={['10', '20', '30']}
            showSizeChanger={false}
            total={donationsRes?.totalDocs}
            onChange={(pagination) => setCurrentPage(pagination?.current || -1)}
            current={donationsRes?.page}
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
        onFinishSubmit={onFinishAccepted}
      />
    </main>
  );
};

export default DonationsPage;
