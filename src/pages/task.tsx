import React, { FC, useState, useEffect, useCallback, CSSProperties } from 'react';
import { TaskTable } from '../components';
import { TaskInput } from '../containers';
import { DatePicker } from 'antd';
import moment from 'moment';
import 'moment-timezone';
import { Task } from '../types';
import { getUserTasks } from '../api';

const TaskPage: FC = () => {
  const now = moment().tz('Asia/Seoul');
  const [date, setDate] = useState(now);

  const [tasks, setTasks] = useState<Task[]>([]);
  const onChange = (date: moment.Moment | null, dateString: string) => {
    if (date) {
      setDate(date);
    }
  };
  const loadTasks = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      throw new Error('나도몰랑');
    }
    const tasks = await getUserTasks(userId, date.format('YYYY-MM-DD'));
    setTasks(tasks);
  };
  const loadTasksCallback = useCallback(loadTasks, [date]);
  useEffect(() => { loadTasksCallback(); }, [loadTasksCallback]);
  const style: CSSProperties = {
    display: 'block',
    margin: '0 auto',
    width: '100%',
    maxWidth: 128,
  };
  return (
    <React.Fragment>
      <DatePicker onChange={onChange} value={date} style={style}/>
      <TaskTable tasks={tasks} onDelete={loadTasks} editMode={true}/>
      <TaskInput onAddTask={loadTasks}/>
    </React.Fragment>
  );
};

export default TaskPage;
