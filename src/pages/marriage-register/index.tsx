import React, { useEffect, useState } from 'react';
import './styles.css';
import qs from 'qs';
import { Layout, theme, Form } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import HeaderChristian from '@/components/HeaderContent/HeaderChristian';
import CoreDrawer from '@/components/Drawer';
import DrawerChristenComponent from "@/components/Drawer/DrawerChristen";
import useLogic from "./useLogic";
import { Table } from '@/components/table';

const { Header, Content } = Layout;

const MarriageRegister = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const {
    couple,
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

  const handleClickBtn = () => {
    console.log('click');
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <main>
      <Header style={{ padding: 0, background: colorBgContainer }}>
        {/* <HeaderChristian buttons={listBUttons} /> */}
      </Header>
      <Content style={{ margin: '26px 18px' }}>
        <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
          <Table
            key={tableKey}
            columns={columns}
            dataSource={couple}
            size={isMiddleScreen ? 'middle' : 'small'}
            pageSizeOptions={['10', '20', '30']}
            showSizeChanger={false}
          />
        </div>
      </Content>
      <DrawerChristenComponent title='Thêm thông tin rửa tội' open={open} onClose={onClose} form={form} />
    </main>
  );
};

export default MarriageRegister;
