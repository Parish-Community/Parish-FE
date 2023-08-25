import React, { useState, ReactNode } from 'react';
// import { Outlet } from 'react-router-dom';
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import logoTop from '@/assets/images/logoTop.svg';
import avatar from '@/assets/images/avatar.png';
import { Avatar } from 'antd';
import CoreButton from '@/components/Button';

interface DashboardLayoutProps {
  children: ReactNode;
}

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return {
    key,
    icon,
    children,
    label
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [getItem('Tom', '3'), getItem('Bill', '4'), getItem('Alex', '5')]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />)
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  const handleButtonClick = () => {
    console.log('Button clicked!');
  };

  return (
    <main>
      <Header style={{ display: 'flex', backgroundColor: '#174940' }}>
        <div className='flex w-screen justify-between'>
          <div>
            <img className='inline' src={logoTop} alt='' />
          </div>
          <div className=''>
            <Avatar size='large' src={avatar} />
          </div>
        </div>
      </Header>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          style={{ backgroundColor: '#FFFFFF' }}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className='demo-logo-vertical' />
          <Menu theme='light' defaultSelectedKeys={['1']} mode='inline' items={items} />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <div className='flex justify-end mr-6'>
              <CoreButton
                type='primary'
                text='In/Xuất file'
                htmlType='submit'
                onClick={handleButtonClick}
                className='w-[8%] button-secondary mt-3 h-10 mr-4 text-[#174940]'
              />
              <CoreButton
                type='primary'
                text='Upload danh sách'
                htmlType='submit'
                onClick={handleButtonClick}
                className='w-[10%] button-secondary mt-3 h-10 mr-4 text-[#174940]'
              />
              <CoreButton
                type='primary'
                text='Thêm mới'
                htmlType='submit'
                onClick={handleButtonClick}
                className='w-[8%] button-primary mt-3 h-10 text-[#174940]'
              />
            </div>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
              {/* <Outlet /> */}
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    </main>
  );
};

export default DashboardLayout;
