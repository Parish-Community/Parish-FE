import React, { useState } from 'react';
// import { Outlet } from 'react-router-dom';
import { UnorderedListOutlined, DollarOutlined, TeamOutlined, UserOutlined, HomeOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import logoTop from '@/assets/images/logoTop.svg';
import avatar from '@/assets/images/avatar.png';
import { Avatar } from 'antd';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const { Header, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  path: React.ReactNode,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    path
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Tổng quan', '1', 'overview', <HomeOutlined />),
  getItem('Giáo dân', '2', 'giáo-dân', <UserOutlined />),
  getItem('Rửa tội', '3', 'rửa-tội', <UnorderedListOutlined />),
  getItem('Giáo lý hôn nhân', 'sub1', 'giáo-lý-hôn-nhân', <TeamOutlined />, [
    getItem('Danh sách đăng ký', '4', 'hôn-nhân/danh-sách-đăng-ký'),
    getItem('Lớp hôn nhân', '5', 'hôn-nhân/lớp-hôn-nhân')
  ]),
  getItem('Donation', '6', 'donation', <DollarOutlined />)
];

const DashboardLayout = (prop) => {
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();

  const handleMenuItemClick = (key: string) => {
    navigate(`/parish/${key}`);
  };

  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   navigate('/auth/login');
  // };

  // const onConfirm = () => {
  //   console.log('confirm');
  // };

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
          <Menu theme='light' defaultSelectedKeys={['1']} mode='inline'>
            {items.map((item) =>
              item.children ? (
                <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
                  {item.children.map((subItem) => (
                    <Menu.Item key={subItem.key} onClick={() => handleMenuItemClick(subItem.path)}>
                      {subItem.label}
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
              ) : (
                <Menu.Item key={item.key} icon={item.icon} onClick={() => handleMenuItemClick(item.path)}>
                  {item.label}
                </Menu.Item>
              )
            )}
          </Menu>
        </Sider>
        <Layout>
          {prop.children}
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    </main>
  );
};

DashboardLayout.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  headerChildren: PropTypes.node,
  btnLabel: PropTypes.string
};

export default DashboardLayout;
