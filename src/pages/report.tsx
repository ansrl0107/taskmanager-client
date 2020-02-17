import React, { FC, useState, useEffect, useCallback, CSSProperties } from 'react';
import { TaskTable } from '../components';
import { getTeamTasks } from '../api';
import { Task } from '../types';
import { DatePicker, Button, Col, Row } from 'antd';
import moment from 'moment';
import 'moment-timezone';
import { RangePickerValue } from 'antd/lib/date-picker/interface';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Report: FC = () => {
  const now = moment().tz('Asia/Seoul');
  const initialDateRange: [moment.Moment, moment.Moment] = [moment(now).day(1), moment(now).day(5)];
  const [dateRange, setDateRange] = useState(initialDateRange);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [printLoading, setPrintLoading] = useState(false);
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
    width: '100%',
  };
  const usernames = tasks
    .map(task => task.user.name)
    .reduce((acc: string[], cur) => acc.includes(cur) ? acc : [...acc, cur], []);
  const filterToday = (task: Task) => {
    const { createdAt } = task;
    const today = moment().tz('Asia/Seoul').format('YYYY-MM-DD');
    return moment(createdAt).tz('Asia/Seoul').format('YYYY-MM-DD') === today;
  };

  interface CountPerUser {
    [username: string]: number;
  }
  const groupByUser = (acc: CountPerUser, cur: Task) => {
    if (!acc[cur.user.name]) {
      acc[cur.user.name] = 0;
    }
    acc[cur.user.name] += cur.workingTime;
    return acc;
  };
  const countPerUser = tasks.filter(filterToday).reduce(groupByUser, {});
  console.log(countPerUser);
  const renderUserTaskTable = (username: string) => (
    <TaskTable key={username} tasks={tasks.filter(task => task.user.name === username)}/>
  );
  const printReport = async () => {
    setPrintLoading(true);
    const target = document.querySelector<HTMLElement>('section.report-table-list');
    const tables = document.querySelectorAll('.ant-table-wrapper');
    let h = 0;
    tables.forEach(table => h += (table.clientHeight + 32));

    if (target) {
      const canvas = await html2canvas(target, {
        height: h,
        windowHeight: h,
        width: tables.item(0).clientWidth + 16,
      });
      const imgData = canvas.toDataURL('image/png');

      const imgWidth = 210;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const pageHeight = imgWidth * 1.414;
      let heightLeft = imgHeight;

      const doc = new jsPDF('p', 'mm');
      let position = 0;

      doc.addImage(imgData, 'PNG', 16, position, imgWidth - 32, imgHeight, '', 'FAST');
      heightLeft -= pageHeight;

      while (heightLeft >= 20) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 16, position, imgWidth - 32, imgHeight, '', 'FAST');
        heightLeft -= pageHeight;
      }

      const [from, to] = dateRange.map(d => d.format('YYYY-MM-DD'));
      doc.save(`개발팀 주간보고 ${from}~${to}.pdf`);
      setPrintLoading(false);
    }
  };

  const datepickerSize = {
    xs: { offset: 0, span: 24 },
    sm: { offset: 0, span: 18 },
    md: { offset: 6, span: 12 },
    lg: { offset: 8, span: 8 },
  };
  const printButtonSize = {
    xs: { offset: 0, span: 24 },
    sm: { offset: 0, span: 6 },
    md: { push: 2, span: 4 },
    lg: { push: 6, span: 2 },
  };
  return (
    <section style={{ padding: 16 }}>
      <Row gutter={[8, 8]}>
        <Col {...datepickerSize}>
          <DatePicker.RangePicker onChange={onChangeDateRange} value={dateRange} style={style}/>
        </Col>
        <Col {...printButtonSize}>
          <Button loading={printLoading} onClick={printReport} block={true}>Print</Button>
        </Col>
      </Row>
      <Row>

      </Row>
      <section className="report-table-list">
        {usernames.map(renderUserTaskTable)}
      </section>
    </section>
  );
};

export default Report;
