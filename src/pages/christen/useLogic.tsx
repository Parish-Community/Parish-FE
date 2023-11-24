import { deleteBaptism, fetchBaptisms } from '@/services/apis/baptism';
import { Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { formatYYMMDD } from '@/utils/date';

const useLogic = () => {
  const [baptismData, setBaptismData] = useState<any[]>([]);
  const [tableKey, setTableKey] = useState(0);
  const [isMiddleScreen, setIsMiddleScreen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [baptismRes, setBaptismRes] = useState<any>();
  const [openDrawerEdit, setOpenDrawerEdit] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);

  useEffect(() => {
    const innerWidth = window.innerWidth;
    if (innerWidth > 1536) {
      setIsMiddleScreen(true);
      setTableKey((prevKey) => prevKey + 1);
    }

    const fetchBaptismData = async () => {
      console.log('currentPage', currentPage);
      const response = await fetchBaptisms(currentPage);
      setBaptismRes(response);
      setBaptismData(response.data);
    };

    fetchBaptismData();
  }, [currentPage, isRefresh]);

  const showDeleteModal = (record: any) => {
    if (record.isAccepted) {
      setDeleteModalVisible(false);
    } else {
      setSelectedRecord(record);
      setDeleteModalVisible(true);
    }
  };

  const handleDeleteConfirm = async () => {
    console.log('Deleting record:', selectedRecord);
    const res = await deleteBaptism(selectedRecord.id);
    console.log('res', res?.data);
    setDeleteModalVisible(false);
    setIsRefresh(!isRefresh);
  };

  const handleDeleteCancel = () => {
    setSelectedRecord(null);
    setDeleteModalVisible(false);
  };

  const showDrawerEdit = (record?: any) => {
    setOpenDrawerEdit(true);
    setSelectedRecord(record);
  };

  const onClose = () => {
    setOpenDrawerEdit(false);
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
      width: '2%'
    },
    {
      title: 'Họ và tên',
      dataIndex: 'parishioner',
      key: 'fullname',
      sorter: (a, b) => a.parishioner.fullname.localeCompare(b.parishioner.fullname),
      render: (parishioner) => `${parishioner?.christianName + ' ' + parishioner?.fullname}`,
      width: '6%'
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'parishioner',
      key: 'dateOfBirth',
      sorter: (a, b) => {
        return a.parishioner.dateOfBirth.localeCompare(b.parishioner.dateOfBirth);
      },
      render: (parishioner) => `${parishioner.dateOfBirth}`,
      width: '3%'
    },
    {
      title: 'Gender',
      dataIndex: 'parishioner',
      filters: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' }
      ],
      onFilter: (value, record) => record.gender === value,
      key: 'gender',
      render: (parishioner) => `${parishioner?.gender}`,
      width: '2%'
    },
    {
      title: 'Giáo họ',
      dataIndex: 'parishioner',
      key: 'parish_cluster',
      filters: [
        { text: 'Tràng Lưu', value: 'Tràng Lưu' },
        { text: 'Tràng Thị', value: 'Tràng Thị' },
        { text: 'Tân Lộc', value: 'Tân Lộc' },
        { text: 'Đô Khê', value: 'Đô Khê' },
        { text: 'Giang Lĩnh', value: 'Giang Lĩnh' },
        { text: 'Đồng Lưu', value: 'Đồng Lưu' }
      ],
      onFilter: (value, record) => record.parishioner.parish_cluster.name === value,
      render: (parishioner) => `${parishioner.parish_cluster.name}`,
      width: '2%'
    },
    {
      title: 'Cha rửa tội',
      dataIndex: 'priestBaptism',
      key: 'priestBaptism',
      className: 'text-center',
      render: (priestBaptism) => `${priestBaptism || 'none'}`,
      width: '4%'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isAccepted',
      key: 'isAccepted',
      className: 'text-center',
      filters: [
        { text: 'Accepted', value: true },
        { text: 'Pending', value: false }
      ],
      onFilter: (value, record) => record.isAccepted === value,
      render: (isAccepted) => (
        <>
          <div className={`${isAccepted ? 'bg-lime-500' : 'bg-slate-400'} w-[75px] rounded-md text-center`}>
            <span>{isAccepted ? 'Accepted' : 'Pending'}</span>
          </div>
        </>
      ),
      width: '2%'
    },
    {
      title: 'Ngày đăng ký',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => `${formatYYMMDD(createdAt)}`,
      width: '2%'
    },
    {
      title: 'Chức năng',
      key: 'action',
      width: '2%',
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

  return {
    baptismData,
    columns,
    tableKey,
    isMiddleScreen,
    setCurrentPage,
    baptismRes,
    deleteModalVisible,
    handleDeleteConfirm,
    handleDeleteCancel,
    selectedRecord,
    openDrawerEdit,
    onClose,
    currentPage
  };
};

export default useLogic;
