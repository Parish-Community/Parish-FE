import { createParishioner, deleteParishioner, fetchParishioners, updateParishioner } from '@/services/apis/parishioner';
import { Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const useLogic = () => {
  const [open, setOpen] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [openDrawerEdit, setOpenDrawerEdit] = useState(false);
  const [parishioners, setParishioner] = useState<any[]>([]);
  const [parishionersRes, setParishionerRes] = useState<any>();
  const [tableKey, setTableKey] = useState(0);
  const [isMiddleScreen, setIsMiddleScreen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');

  // const { isAuthenticated } = useSelector(selectAuth);
  // const isAuthenticated = useSelector((state: any) => state.user.isAuthenticated);

  const showDeleteModal = (record: any) => {
    setSelectedRecord(record);
    setDeleteModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    console.log('Deleting record:', selectedRecord);
    const res = await deleteParishioner(selectedRecord.id);
    console.log('res', res?.data);
    setDeleteModalVisible(false);
    setIsRefresh(!isRefresh);
  };

  const handleDeleteCancel = () => {
    setSelectedRecord(null);
    setDeleteModalVisible(false);
  };

  useEffect(() => {
    const innerWidth = window.innerWidth;
    if (innerWidth > 1536) {
      setIsMiddleScreen(true);
      setTableKey((prevKey) => prevKey + 1);
    }

    const getAllParishioners = async () => {
      try {
        const response = await fetchParishioners(currentPage, search);
        setParishionerRes(response);
        setParishioner(response.data);
      } catch (error) {
        console.log('Error fetching parishioners:', error);
      }
    };

    getAllParishioners();
  }, [currentPage, isRefresh]);

  const showDrawer = (record?: any) => {
    setOpen(true);
  };

  const showDrawerEdit = (record?: any) => {
    setSelectedRecord(record);
    console.log('Deleting record:', selectedRecord);
    setOpenDrawerEdit(true);
  };

  const onCloseDrawer = () => {
    setOpen(false);
  };

  const onCloseDrawerEdit = () => {
    setOpenDrawerEdit(false);
  };

  const onSearch = (value?: any) => {
    console.log('onSearch', value);
    setSearch(value);
    setIsRefresh(!isRefresh);
  };

  const columns: ColumnsType<any> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: {
        compare: (a, b) => a?.id - b.id
      },
      render: (id) => (
        <>
          <span className='ml-3 text-base text-dialogBg font-regular min-[1600px]:text-md capitalize '>{id}</span>
        </>
      ),
      width: '3%'
    },
    {
      title: 'Tên thánh',
      dataIndex: 'christianName',
      key: 'christianName',
      render: (christianName) => `${christianName}`,
      width: '3%'
    },
    {
      title: 'Họ và tên',
      dataIndex: 'fullname',
      key: 'fullname',
      sorter: (a, b) => a.fullname.localeCompare(b.fullname),
      render: (fullname) => `${fullname}`,
      width: '8%'
    },
    {
      title: 'Số điện thoại',
      key: 'phonenumber',
      dataIndex: 'phonenumber',
      width: '6%'
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
      sorter: (a, b) => {
        return a.dateOfBirth.localeCompare(b.dateOfBirth);
      },
      render: (dateOfBirth) => `${dateOfBirth}`,
      width: '6%'
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      // sorter: (a, b) => a.gender.localeCompare(b.gender),
      filters: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' }
      ],
      onFilter: (value, record) => record.gender === value,
      width: '4%'
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
      // sorter: (a, b) => a.gender.localeCompare(b.gender),
      filters: [
        { text: 'Priest', value: 'priest' },
        { text: 'Nun', value: 'nun' },
        { text: 'Monk', value: 'monk' },
        { text: 'Christianity', value: 'christianity' }
      ],
      onFilter: (value, record) => record.position === value,
      width: '4%'
    },
    {
      title: 'Giáo họ',
      dataIndex: 'parish_cluster',
      key: 'parish_cluster',
      filters: [
        { text: 'Tràng Lưu', value: 'Tràng Lưu' },
        { text: 'Tràng Thị', value: 'Tràng Thị' },
        { text: 'Tân Lộc', value: 'Tân Lộc' },
        { text: 'Đô Khê', value: 'Đô Khê' },
        { text: 'Giang Lĩnh', value: 'Giang Lĩnh' },
        { text: 'Đồng Lưu', value: 'Đồng Lưu' }
      ],
      onFilter: (value, record) => record.parish_cluster.name === value,
      render: (parish_cluster) => `${parish_cluster.name}`,
      width: '4%'
    },
    {
      title: 'Chức năng',
      key: 'action',
      width: '3%',
      render: (_, record) => (
        <div className='flex justify-around'>
          <Space size='middle'>
            <a onClick={() => showDrawerEdit(record)}>
              {' '}
              <EyeOutlined style={{ fontSize: '18px' }} />
            </a>
          </Space>
          <Space size='middle'>
            <a onClick={() => showDeleteModal(record)}>
              {' '}
              <DeleteOutlined style={{ fontSize: '18px' }} />
            </a>
          </Space>
        </div>
      )
    }
  ];

  const onFinish = async (values: any) => {
    console.log('Data submit', values);
    const res = await createParishioner(values);
    console.log('res', res?.data);
    setIsRefresh(!isRefresh);
    setOpen(!open);
  };

  const onFinishUpdate = async (values: any) => {
    console.log('Data submit', values);
    const res = await updateParishioner(values);
    console.log('res', res?.data);
    setIsRefresh(!isRefresh);
    setOpenDrawerEdit(!openDrawerEdit);
  };

  return {
    parishioners,
    tableKey,
    columns,
    isMiddleScreen,
    deleteModalVisible,
    selectedRecord,
    handleDeleteConfirm,
    handleDeleteCancel,
    onFinish,
    setCurrentPage,
    currentPage,
    parishionersRes,
    setSearch,
    open,
    showDrawer,
    onCloseDrawer,
    onCloseDrawerEdit,
    openDrawerEdit,
    onFinishUpdate,
    onSearch
  };
};

export default useLogic;
