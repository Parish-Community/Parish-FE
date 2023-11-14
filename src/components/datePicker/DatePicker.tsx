import React from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
// import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

// const dateFormat = 'DD/MM/YYYY';
// const weekFormat = 'MM/DD';

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

// const customFormat: DatePickerProps['format'] = (value) => `custom format: ${value.format(dateFormat)}`;

// const customWeekStartEndFormat: DatePickerProps['format'] = (value) =>
//   `${dayjs(value).startOf('week').format(weekFormat)} ~ ${dayjs(value).endOf('week').format(weekFormat)}`;

const DatePickerComponent = () => {
  return (
    <Space direction='vertical' size={12}>
      <DatePicker className='w-[218px]' defaultValue={dayjs('01/01/2015', dateFormatList[0])} format={dateFormatList} />
    </Space>
  );
};

export default DatePickerComponent;
