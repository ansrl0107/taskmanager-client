import React, { FC } from 'react';
import { Table, Button } from 'antd';
import { Task } from '../types';
import { CSSProperties } from 'styled-components';
import { deleteTask } from '../api';

/**
 * TODO
 * 1. addProject, addTicket 만들기
 * 2. task render하기전에 sort하기
 */
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
const columnRender = (rows: string[]) => {
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
  onDelete?: () => void;
}
const TaskTable: FC<Props> = ({ tasks, onDelete }) => {
  const data = tasks.sort(sortTask).map((task) => {
    const { ticket, content, workingTime } = task;
    return {
      key: task.id,
      // name: user.name,
      type: ticket.type,
      ticket: ticket.name,
      task: content,
      time: workingTime,
    };
  });
  const columns = [
    // { title: 'Name', dataIndex: 'name', render: columnRender(data.map(i => i.name)) },
    { title: 'Type', dataIndex: 'type', render: columnRender(data.map(i => i.type)) },
    { title: 'Ticket', dataIndex: 'ticket', render: columnRender(data.map(i => i.ticket)) },
    { title: 'Task', dataIndex: 'task' },
    { title: 'Time', dataIndex: 'time' },
    {
      title: 'Action',
      key: 'action',
      render: (row: any) => {
        console.log(row);
        const onClick = async () => {
          await deleteTask(row.key);
          if (onDelete) {
            onDelete();
          }
        };
        return <Button type="link" size="small" onClick={onClick}>Delete</Button>;
      },
    },
  ];
  const style: CSSProperties = {
    marginBottom: 16,
    marginTop: 16,
  };
  const username = tasks.length > 0 ? tasks[0].user.name : '';
  return (
    <Table
      columns={columns}
      dataSource={data}
      bordered={true}
      style={style}
      title={() => username}
    />
  );
};

export default TaskTable;
