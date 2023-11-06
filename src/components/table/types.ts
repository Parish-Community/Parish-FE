import { TableProps as AntdTableProps } from 'antd';
import { ColumnsType } from 'antd/es/table';
export interface TableProps<T> extends AntdTableProps<T> {
  dataSource: T[];
  columns: ColumnsType<T>;
  className?: string;
  rowClassName?: string;
  total?: number;
  current?: number;
  showSizeChanger?: boolean;
  pageSizeOptions?: string[];
}
