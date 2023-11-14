import { Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { fetchCoupleRegistration } from "@/services/apis/course";

const useLogic = () => {
  const [couple, setCouple] = useState<any[]>([]);
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
    const getAllCoupleRegis = async () => {
      try {
        const response = await fetchCoupleRegistration();
        setCouple(response.data);
        console.log('Parishioners:', response.data);
      } catch (error) {
        console.log('Error fetching parishioners:', error);
      }
    };

    getAllCoupleRegis();
  }, []);

  const columns: ColumnsType<DataType> = [
    {
      title: 'Tên bên nam',
      dataIndex: 'parishioner1',
      sorter: true,
      render: (parishioner1) => `${parishioner1.fullname}`,
      width: '20%'
    },
    {
      title: 'Tên bên nữ',
      dataIndex: 'parishioner2',
      sorter: true,
      render: (parishioner2) => `${parishioner2.fullname}`,
      width: '20%'
    },
    {
      title: 'Ngày đăng ký',
      dataIndex: 'createdAt',
      width: '20%'
    },
    {
      title: 'Lớp học',
      dataIndex: 'courseId',
      render: (courseId) => `${courseId}`,
      width: '20%'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      filters: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' }
      ],
      width: '20%'
    },
    // {
    //   title: 'Giáo họ',
    //   dataIndex: 'parish_cluster',
    //   // filters: [
    //   //   { text: 'Male', value: 'male' },
    //   //   { text: 'Female', value: 'female' }
    //   // ],
    //   render: (parish_cluster) => `${parish_cluster.name}`,
    //   width: '20%'
    // },
    // {
    //   title: 'Chức năng',
    //   width: '20%',
    //   render: (_, record) => (
    //     <>
    //       <Space size='middle'>
    //         <a onClick={() => showDeleteModal(record)}>
    //           {' '}
    //           <DeleteOutlined style={{ fontSize: '18px' }} />
    //         </a>
    //       </Space>
    //     </>
    //   )
    // }
  ];

  return {
    couple,
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
