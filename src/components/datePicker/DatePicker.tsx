import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DatePicker, Space } from 'antd';
import { formatDateString } from "@/utils/date";

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

// const dateFormat = 'DD/MM/YYYY';
// const weekFormat = 'MM/DD';

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

// const customFormat: DatePickerProps['format'] = (value) => `custom format: ${value.format(dateFormat)}`;

// const customWeekStartEndFormat: DatePickerProps['format'] = (value) =>
//   `${dayjs(value).startOf('week').format(weekFormat)} ~ ${dayjs(value).endOf('week').format(weekFormat)}`;

interface DateTimeProps {
  onDateChange?: (date: any) => void;
  recordDate?: any;
  disabled?: boolean;
  idRecord?: any;
}

const DatePickerComponent = (props: DateTimeProps) => {
  console.log('props.recordDate', props.recordDate)
  const [selectedDate, setSelectedDate] = useState<any>(dayjs(props.recordDate) || dayjs('01/01/2015'));

  const handleDateChange = (date: any, dateString: any) => {
    setSelectedDate(date);
    if (props.onDateChange) {
      props.onDateChange(dateString);
    }
  };
  return (
    <Space direction='vertical' size={12}>
      <DatePicker
        className='w-[328px]'
        defaultValue={selectedDate}
        format={dateFormatList}
        onChange={handleDateChange}
        disabled={props.disabled}
      />
    </Space>
  );
};

export default DatePickerComponent;
