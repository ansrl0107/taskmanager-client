import React, { FC } from 'react';
import { Table, Button } from 'antd';
import { Task } from '../types';
import { CSSProperties } from 'styled-components';
import { deleteTask } from '../api';

const getRowSpan = (arr: string[]) => {
  let cursor = 0;
  let cursorItem = arr[0];
  const res = [1];
  for (let idx = 1; idx < arr.length; idx += 1) {
    if (arr[idx] === cursorItem) {
      res[cursor] += 1;
      res.push(0);
    } else {
      cursor = idx;
      cursorItem = arr[idx];
      res.push(1);
    }
  }
  return res;
};
const sortTask = (a: Task, b: Task) => {
  if (a.user.name !== b.user.name) {
    return a.user.name < b.user.name ? 1 : -1;
  }
  if (a.ticket.type !== b.ticket.type) {
    return a.ticket.type < b.ticket.type ? 1 : -1;
  }
  if (a.ticket.name !== b.ticket.name) {
    return a.ticket.name < b.ticket.name ? 1 : -1;
  }
  return 0;
};
const mergeColumns = (rows: string[]) => {
  const render = (value: any, row: any, index: number) => {
    const obj = {
      children: value,
      props: {
        rowSpan: getRowSpan(rows)[index],
      },
    };
    return obj;
  };
  return render;
};

interface Props {
  tasks: Task[];
  editMode?: boolean;
  onDelete?: () => void;
}
const TaskTable: FC<Props> = ({ tasks, onDelete, editMode = false }) => {
  const data = tasks.sort(sortTask).map((task) => {
    const { ticket, content, workingTime } = task;
    return {
      key: task.id,
      type: ticket.type,
      ticket: ticket.name,
      task: content,
      time: workingTime,
    };
  });
  const actionColumn = {
    title: 'Action',
    render: (row: any) => {
      console.log(row);
      const onClick = async () => {
        await deleteTask(row.key);
        if (onDelete) {
          onDelete();
        }
      };
      return <Button icon="delete" type="link" size="small" onClick={onClick}></Button>;
    },
  };

  const columns = [
    { title: 'Type', dataIndex: 'type', render: mergeColumns(data.map(i => i.type)) },
    { title: 'Ticket', dataIndex: 'ticket', render: mergeColumns(data.map(i => i.ticket)) },
    { title: 'Task', dataIndex: 'task' },
    { title: 'Time', dataIndex: 'time' },
  ];
  const style: CSSProperties = {
    marginBottom: 16,
    marginTop: 16,
  };
  const username = tasks.length > 0 ? tasks[0].user.name : '';
  const totalWorkingTime = tasks.reduce((acc, cur) => acc + cur.workingTime, 0);
  return (
    <Table
      columns={editMode ? [...columns, actionColumn] : columns}
      dataSource={data}
      bordered={true}
      style={style}
      title={() => <h1>{username}</h1>}
      footer={() => <div style={{ textAlign: 'right' }}><b>Total</b> : {totalWorkingTime}</div>}
      pagination={false}
    />
  );
};

export default TaskTable;
