import { Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { fetchCoupleRegistration, fetchCourses } from '@/services/apis/course';

const useLogic = () => {
  const [couple, setCouple] = useState<any[]>([]);
  const [tableKey, setTableKey] = useState(0);
  const [isMiddleScreen, setIsMiddleScreen] = useState(false);
  const [listOpenClass, setListOpenClass] = useState([]);

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
        const openClass = await fetchCourses('open');
        setCouple(response.data);
        console.log('couple:', response.data);

        if (openClass) {
          const options = openClass?.data.map((item: any) => ({
            label: item.courseName,
            value: item.id
          }));
          setListOpenClass(options);
          console.log('response', listOpenClass);
        }
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
        { text: 'Pending', value: 'pending' },
        { text: 'Reject', value: 'reject' },
        { text: 'Accept', value: 'accept' },
        { text: 'Completed', value: 'completed' },
      ],
      width: '20%'
    }
  ];

  return {
    couple,
    listOpenClass,
    tableKey,
    columns,
    isMiddleScreen
  };
};

export default useLogic;
