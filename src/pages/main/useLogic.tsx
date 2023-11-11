import { fetchParishioners } from '@/services/apis/parishioner';
import { Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { DeleteOutlined } from '@ant-design/icons';

const useLogic = () => {
  const [parishioners, setParishioner] = useState<any[]>([]);
  const [tableKey, setTableKey] = useState(0);
  const [isMiddleScreen, setIsMiddleScreen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const showDeleteModal = (record: any) => {
    setSelectedRecord(record);
    setDeleteModalVisible(true);
  };

  const handleDeleteConfirm = () => {
    // Add your logic to delete the selected record here
    console.log('Deleting record:', selectedRecord);
    setDeleteModalVisible(false);
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const getAllParishioners = async () => {
      try {
        const response = await fetchParishioners();
        setParishioner(response.data);
        console.log('Parishioners:', response.data);
      } catch (error) {
        console.log('Error fetching parishioners:', error);
      }
    };

    getAllParishioners();
  }, []);

  const columns: ColumnsType<DataType> = [
    {
      title: 'Họ và tên',
      dataIndex: 'fullname',
      sorter: true,
      render: (fullname) => `${fullname}`,
      width: '20%'
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phonenumber',
      width: '20%'
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'dateOfBirth',
      render: (dateOfBirth) => `${dateOfBirth}`,
      width: '20%'
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      filters: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' }
      ],
      width: '20%'
    },
    {
      title: 'Giáo họ',
      dataIndex: 'parish_cluster',
      // filters: [
      //   { text: 'Male', value: 'male' },
      //   { text: 'Female', value: 'female' }
      // ],
      render: (parish_cluster) => `${parish_cluster.name}`,
      width: '20%'
    },
    {
      title: 'Chức năng',
      width: '20%',
      render: (_, record) => (
        <>
          <Space size='middle'>
            <a onClick={() => showDeleteModal(record)}>
              {' '}
              <DeleteOutlined style={{ fontSize: '18px' }} />
            </a>
          </Space>
        </>
      )
    }
  ];

  return {
    parishioners,
    tableKey,
    columns,
    isMiddleScreen,
    deleteModalVisible,
    selectedRecord,
    handleDeleteConfirm,
    handleDeleteCancel
  };
};

export default useLogic;
