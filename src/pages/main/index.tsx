import './styles.css';
import { Layout, theme, Form, Modal } from 'antd';
import HeaderChristian from '@/components/HeaderContent/HeaderChristian';
import CoreDrawer from '@/components/Drawer';
import useLogic from './useLogic';
import { Table } from '@/components/table';
import UploadFile from '@/core/upload';
import DrawerEdit from "./components/DrawerEdit";

const { Header, Content } = Layout;

const Main = () => {
  const [form] = Form.useForm();

  const {
    open,
    openDrawerEdit,
    showDrawer,
    onCloseDrawer,
    onCloseDrawerEdit,
    parishioners,
    tableKey,
    columns,
    isMiddleScreen,
    deleteModalVisible,
    selectedRecord,
    handleDeleteConfirm,
    handleDeleteCancel,
    onFinish,
    parishionersRes,
    setCurrentPage,
    onFinishUpdate
  } = useLogic();

  const {
    token: { colorBgContainer }
  } = theme.useToken();

  const listBUttons = [
    // { label: 'Xuất danh sách', htmlType: 'submit', onClick: handleClickBtn, typeBtn: 'secondary' },
    { label: 'Giáo dân', htmlType: 'submit', onClick: showDrawer, typeBtn: 'primary' }
  ];

  return (
    <main>
      <Header style={{ padding: 0, background: colorBgContainer }}>
        <HeaderChristian buttons={listBUttons} children={<UploadFile />} />
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
            total={parishionersRes?.totalDocs}
            onChange={(pagination) => setCurrentPage(pagination?.current || -1)}
            current={parishionersRes?.page}
          />
        </div>
      </Content>
      <CoreDrawer
        title='Thêm thông tin giáo dân'
        open={open}
        onClose={onCloseDrawer}
        form={form}
        onFinishSubmit={onFinish}
      />
      <DrawerEdit
        title='Thông tin giáo dân chi tiết'
        open={openDrawerEdit}
        onClose={onCloseDrawerEdit}
        form={form}
        onFinishSubmit={onFinishUpdate}
        record={selectedRecord}
      />
      <Modal
        title='Confirm Delete'
        visible={deleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      >
        <p>Are you sure you want to delete {selectedRecord && selectedRecord.fullname} ?</p>
        {/* <p>{selectedRecord && selectedRecord.name_father}</p> */}
        {/* <p>{selectedRecord && selectedRecord.fullname}</p> */}
        {/* Display additional information about the record if needed */}
        {/* For example: <p>{selectedRecord && selectedRecord.fullname}</p> */}
      </Modal>
    </main>
  );
};

export default Main;
