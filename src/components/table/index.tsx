import { Table as TableAntd } from 'antd';
import { TableProps } from './types';

export function Table<T extends object>(props: TableProps<T>) {
  const showSizeChanger = props?.showSizeChanger || false;
  const pageZise = props?.pageSizeOptions || [''];
  const total = props?.total || 1;
  const current = props?.current || 1;

  return (
    <TableAntd
      {...props}
      columns={props?.columns}
      dataSource={props?.dataSource}
      pagination={{
        showSizeChanger: showSizeChanger,
        pageSizeOptions: pageZise,
        total: total,
        current: current
      }}
    />
  );
}
