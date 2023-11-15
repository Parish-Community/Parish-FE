import React, { useState } from 'react';
import './styles.css';
import { Layout, theme, Form } from 'antd';
import HeaderChristian from '@/components/HeaderContent/HeaderChristian';
import useLogic from './useLogic';
import { Table } from '@/components/table';
import { useNavigate } from 'react-router-dom';
import DrawerCoupleComponent from '@/components/Drawer/DrawerCouple';

const { Header, Content } = Layout;

const MarriageRegister = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const { couple, tableKey, columns, listOpenClass, isMiddleScreen } = useLogic();

  const {
    token: { colorBgContainer }
  } = theme.useToken();

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
            onRow={(record) => ({
              onClick: () => {
                // navigate(`/page-404`);
                showDrawer();
              }
            })}
          />
        </div>
      </Content>
      <DrawerCoupleComponent
        title='Chi tiết đăng kí giáo lý hôn nhân'
        open={open}
        onClose={onClose}
        form={form}
        listOpenClass={listOpenClass}
      />
    </main>
  );
};

export default MarriageRegister;
