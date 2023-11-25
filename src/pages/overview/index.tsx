import React, { useState, useEffect } from 'react';
import { Column } from '@ant-design/plots';
import { each, groupBy } from 'lodash';
import { Space, Table, Tag, theme } from 'antd';
import { Header } from 'antd/es/layout/layout';
import HeaderChristian from '@/components/HeaderContent/HeaderChristian';
import { ReadOutlined, HeartOutlined, DollarOutlined, UserOutlined } from '@ant-design/icons';
import { fetchTotalParishioner } from "@/services/apis/parishioner";
import { fetchTotalCouple, fetchTotalCourse } from "@/services/apis/course";
import { fetchDonation } from "@/services/apis/donation";

const OverviewPage = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken();
  const [data, setData] = useState([]);
  const [total, setTotalParishoners] = useState(0);
  const [coursesTotal, setCoursesTotal] = useState(0);
  const [coupleTotal, setCoupleTotal] = useState(0);
  const [donationTotal, setDonationTotal] = useState<any>('');

  useEffect(() => {
    asyncFetch();
    totalParishoners();
    totalCourse();
    totalCouple();
    totalDonation();
  }, []);

  const totalParishoners = async () => {
    const data = await fetchTotalParishioner();
    setTotalParishoners(data.data);
  };

  const totalCourse = async () => {
    const data = await fetchTotalCourse();
    setCoursesTotal(data.data);
  };

  const totalCouple = async () => {
    const data = await fetchTotalCouple();
    setCoupleTotal(data.data);
  };

  const totalDonation = async () => {
    const data = await fetchDonation();
    console.log(data.total);
    setDonationTotal(data.total);
  };

  const asyncFetch = () => {
    fetch('http://localhost:8888/api/v1/parishioners/statistics/parish-cluster')
      .then((response) => response.json())
      .then((json) => setData(json.data))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  const annotations: any = [];
  each(groupBy(data, 'parishCluster'), (values: any, k: any) => {
    const value = values.reduce((a: any, b: any) => a + b.value, 0);
    annotations.push({
      type: 'text',
      position: [k, value],
      content: `${value}`,
      style: {
        textAlign: 'center',
        fontSize: 14,
        fill: 'rgba(0,0,0,0.85)'
      },
      offsetY: -10
    });
  });
  const config = {
    data,
    isStack: true,
    xField: 'parishCluster',
    yField: 'value',
    seriesField: 'type',
    label: {
      position: 'middle',
      // 'top', 'bottom', 'middle'
      layout: [
        {
          type: 'interval-adjust-position'
        },
        {
          type: 'interval-hide-overlap'
        },
        {
          type: 'adjust-color'
        }
      ]
    },
    annotations
  };

  return (
    <div className=''>
      <Header style={{ padding: 0, background: colorBgContainer }}>
        <HeaderChristian children={undefined} />
      </Header>
      <div className='ml-4 mb-12 flex justify-between'>
        <div className='bg-white w-[22%] h-[68px] items-center rounded-sm px-2 mt-6 shadow-lg flex justify-between'>
          <div>
            <h1 className='text-xl font-bold py-1'>Tổng giáo dân</h1>
            <p className='text-lg'>{total}</p>
          </div>
          <div className='mr-6'>
            <UserOutlined style={{ fontSize: '36px', color: '#08c' }} />
          </div>
        </div>
        <div className='bg-white w-[22%] h-[68px] items-center rounded-sm px-2 mt-6 shadow-lg flex justify-between'>
          <div>
            <h1 className='text-xl font-bold py-1'>Tổng số tiền</h1>
            <p className='text-lg'>{`${donationTotal}`}</p>
          </div>
          <div>
            <DollarOutlined style={{ fontSize: '36px', color: '#08c' }} />
          </div>
        </div>
        <div className='bg-white w-[22%] h-[68px] items-center rounded-sm px-2 mt-6 shadow-lg flex justify-between'>
          <div>
            <h1 className='text-xl font-bold py-1'>Tổng cặp đôi</h1>
            <p className='text-lg'>{coupleTotal}</p>
          </div>
          <div>
            <HeartOutlined style={{ fontSize: '36px', color: '#08c' }} />
          </div>
        </div>
        <div className='bg-white w-[22%] h-[68px] items-center rounded-sm px-2 mt-6 shadow-lg flex justify-between'>
          <div>
            <h1 className='text-xl font-bold py-1'>Tổng lớp học</h1>
            <p className='text-lg'>{coursesTotal}</p>
          </div>
          <div>
            <ReadOutlined style={{ fontSize: '36px', color: '#08c' }} />
          </div>
        </div>
      </div>
      <div className='w-[100%] h-[390px] mt-6 bg-white ml-4'>
        <Column
          {...config}
          label={{
            position: 'middle',
            layout: [{ type: 'interval-adjust-position' }, { type: 'interval-hide-overlap' }, { type: 'adjust-color' }]
          }}
        />
      </div>
    </div>
  );
};

export default OverviewPage;
