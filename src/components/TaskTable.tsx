import React, { FC } from 'react';
import { Table } from 'antd';
import { Task } from '../types';
import { ColumnProps } from 'antd/lib/table';
import { CSSProperties } from 'styled-components';

interface Props {
  tasks: Task[];
}
const TaskTable: FC<Props> = ({ tasks }) => {
  const columns: ColumnProps<Task>[] = [
    { title: 'Name', dataIndex: 'name' },
    { title: 'Type', dataIndex: 'type' },
    { title: 'Ticket', dataIndex: 'ticket' },
    { title: 'Task', dataIndex: 'task' },
    { title: 'Time', dataIndex: 'time' },
  ];
  const style: CSSProperties = {
    marginBottom: 16,
    marginTop: 16,
  };
  return <Table columns={columns} dataSource={tasks} bordered={true} style={style}/>;
};

export default TaskTable;
