import React, { FC, useState, useEffect, useCallback, CSSProperties } from 'react';
import { TaskTable } from '../components';
import { getTeamTasks } from '../api';
import { Task } from '../types';
import { DatePicker } from 'antd';
import moment from 'moment';
import 'moment-timezone';
import { RangePickerValue } from 'antd/lib/date-picker/interface';

const Report: FC = () => {
  const now = moment().tz('Asia/Seoul');
  const initialDateRange: [moment.Moment, moment.Moment] = [moment(now).day(1), moment(now).day(5)];
  const [dateRange, setDateRange] = useState(initialDateRange);
  const [tasks, setTasks] = useState<Task[]>([]);
  const onChangeDateRange = (dates: RangePickerValue) => {
    const [startDate, endDate] = dates;
    if (startDate && endDate) {
      setDateRange([startDate, endDate]);
    }
  };

  const loadTasks = async () => {
    const [from, to] = dateRange;
    const dateFormat = 'YYYY-MM-DD';
    const tasks = await getTeamTasks('dev', from.format(dateFormat), to.format(dateFormat));
    setTasks(tasks);
  };
  const loadTasksCallback = useCallback(loadTasks, [dateRange]);
  useEffect(() => { loadTasksCallback(); }, [dateRange, loadTasksCallback]);
  const style: CSSProperties = {
    display: 'block',
    margin: '0 auto',
    maxWidth: 256,
    width: '100%',
  };
  const usernames = tasks
    .map(task => task.user.name)
    .reduce((acc: string[], cur) => acc.includes(cur) ? acc : [...acc, cur], []);
  const renderUserTaskTable = (username: string) => (
    <TaskTable tasks={tasks.filter(task => task.user.name === username)}/>
  );
  return (
    <React.Fragment>
      <DatePicker.RangePicker onChange={onChangeDateRange} value={dateRange} style={style}/>
      {usernames.map(renderUserTaskTable)}
    </React.Fragment>
  );
};

export default Report;
