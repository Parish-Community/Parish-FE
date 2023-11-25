import { deleteBaptism, fetchBaptisms, updateBaptism } from '@/services/apis/baptism';
import { Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { formatDateReq, formatYYMMDD } from '@/utils/date';
import { fetchDonations } from "@/services/apis/donation";

const useLogic = () => {
  const [donationsData, setDonationsData] = useState<any[]>([]);
  const [tableKey, setTableKey] = useState(0);
  const [isMiddleScreen, setIsMiddleScreen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [donationsRes, setDonationsRes] = useState<any>();
  const [openDrawerEdit, setOpenDrawerEdit] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const innerWidth = window.innerWidth;
    if (innerWidth > 1536) {
      setIsMiddleScreen(true);
      setTableKey((prevKey) => prevKey + 1);
    }

    const fetchDonationsData = async () => {
      console.log('currentPage', currentPage);
      console.log('search', search);
      const response = await fetchDonations(currentPage, search);
      setDonationsRes(response);
      setDonationsData(response.data);
    };

    fetchDonationsData();
  }, [currentPage, isRefresh]);

  const showDrawerEdit = (record?: any) => {
    setOpenDrawerEdit(true);
    setSelectedRecord(record);
  };

  const onClose = () => {
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
      width: '2%'
    },
    {
      title: 'Họ và tên',
      dataIndex: 'account',
      key: 'fullname',
      sorter: (a, b) => a.fullname.localeCompare(b.parishioner.fullname),
      render: (account) => `${account?.christianName + ' ' + account?.fullname}`,
      width: '6%'
    },
    {
      title: 'Donations date',
      dataIndex: 'initiatedAt',
      key: 'initiatedAt',
      sorter: (a, b) => {
        return a.initiatedAt.localeCompare(b.initiatedAt);
      },
      render: (initiatedAt) => `${initiatedAt.toString().split('T')[0]}`,
      width: '3%'
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      sorter: (a, b) => {
        return a.initiatedAt.localeCompare(b.amount);
      },
      render: (amount) => `${amount}`,
      width: '2%'
    },
    {
      title: 'Giáo họ',
      dataIndex: 'account',
      key: 'parish_cluster',
      filters: [
        { text: 'Tràng Lưu', value: 'Tràng Lưu' },
        { text: 'Tràng Thị', value: 'Tràng Thị' },
        { text: 'Tân Lộc', value: 'Tân Lộc' },
        { text: 'Đô Khê', value: 'Đô Khê' },
        { text: 'Giang Lĩnh', value: 'Giang Lĩnh' },
        { text: 'Đồng Lưu', value: 'Đồng Lưu' }
      ],
      onFilter: (value, record) => record.account.parishioner.parish_cluster.name === value,
      render: (account) => `${account.parishioner.parish_cluster.name}`,
      width: '2%'
    },
    {
      title: 'Nội dung',
      dataIndex: 'description',
      key: 'description',
      render: (description) => `${description}`,
      width: '4%'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      className: 'text-center',
      filters: [
        { text: 'Paid', value: 'paid' },
        { text: 'Unpaid', value: 'unpaid' }
      ],
      onFilter: (value, record) => record.paymentStatus === value,
      render: (paymentStatus) => (
        <>
          <div
            className={`${paymentStatus === 'paid' ? 'bg-lime-500' : 'bg-slate-400'} w-[75px] rounded-md text-center`}
          >
            <span>{paymentStatus === 'paid' ? 'Paid' : 'Unpaid'}</span>
          </div>
        </>
      ),
      width: '2%'
    }
  ];

  const onFinishAccepted = async (values: any) => {
    console.log('Data submit', values);
    const payload = {
      baptismId: values.id,
      priestBaptism: values.priestBaptism,
      dateBaptism: formatDateReq(values.dateBaptism),
      parish_clusterId: values.parish_clusterId,
      christianName: values.christianName,
      fullname: values.fullname,
      email: values.email,
      regisname: values.regisname
    }

    console.log(payload)
    const res = await updateBaptism(payload);
    console.log('res', res?.data);
    setIsRefresh(!isRefresh);
    setOpenDrawerEdit(!openDrawerEdit);
  };

  return {
    donationsData,
    columns,
    tableKey,
    isMiddleScreen,
    setCurrentPage,
    donationsRes,
    selectedRecord,
    openDrawerEdit,
    onClose,
    currentPage,
    onFinishAccepted,
    setSearch,
    onSearch
  };
};

export default useLogic;
