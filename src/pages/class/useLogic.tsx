import { Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { createCourse, fetchCourses } from '@/services/apis/course';
import { SelectBoxOptionProps } from '@/core/selectBox';
import { fetchParishionerWithMonk } from '@/services/apis/parishioner';
import { formatYYMMDD } from '@/utils/date';

const useLogic = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [tableKey, setTableKey] = useState(0);
  const [isMiddleScreen, setIsMiddleScreen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [teacherOpts, setTeacherOpts] = useState<SelectBoxOptionProps[]>([]);

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
        const response = await fetchCourses();
        const getTeacher = await fetchParishionerWithMonk();

        if (getTeacher) {
          const options = getTeacher?.data.map((teacher: any) => ({
            label: teacher.fullname,
            value: teacher.id
          }));
          setTeacherOpts(options);
        }

        setCourses(response.data);
      } catch (error) {
        console.log('Error fetching parishioners:', error);
      }
    };

    getAllParishioners();
  }, []);

  const columns: ColumnsType<DataType> = [
    {
      title: 'Tên lớp',
      dataIndex: 'courseName',
      render: (courseName) => `${courseName}`,
      width: '16%'
    },
    {
      title: 'Giáo viên',
      dataIndex: 'parishioner',
      render: (parishioner) => `${parishioner.christianName + ' ' + parishioner.fullname}`,
      width: '20%'
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'startDate',
      render: (startDate) => `${startDate}`,
      width: '10%'
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'endDate',
      render: (endDate) => `${endDate}`,
      width: '10%'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'courseStatus',
      filters: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' }
      ],
      width: '10%'
    },
    {
      title: 'Số lượng',
      dataIndex: 'totalMember',
      render: (totalMember) => `${totalMember}`,
      width: '8%'
    },
    {
      title: 'Chức năng',
      width: '8%',
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

  const onFinish = async (values: any) => {
    const startDate = formatYYMMDD(values.startAndEndDate[0]) || '';
    const endDate = formatYYMMDD(values?.startAndEndDate[1]) || '';

    const payload = {
      courseName: values.courseName,
      startDate,
      endDate,
      profileId: Number(values.profileId),
      courseStatus: 'open'
    };

    const submitCourse = await createCourse(payload);

    if (submitCourse) {
      console.log('submitCourse', submitCourse);
      setTableKey((prevKey) => prevKey + 1);
    }
  };

  return {
    courses,
    teacherOpts,
    tableKey,
    columns,
    isMiddleScreen,
    deleteModalVisible,
    selectedRecord,
    handleDeleteConfirm,
    handleDeleteCancel,
    onFinish
  };
};

export default useLogic;
