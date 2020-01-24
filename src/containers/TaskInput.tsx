import React, { FC, useState, ChangeEvent, useEffect } from 'react';
import { Input, InputNumber, Select, Button } from 'antd';
import { Ticket } from '../types';
import { getTickets } from '../api';
const InputGroup = Input.Group;
const { Option } = Select;

interface Props {
  onAddTask: () => void;
}
const TaskInput: FC<Props> = ({ onAddTask }) => {
  const [workingTime, setWorkingTime] = useState(1);
  const [content, setContent] = useState('');
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [ticket, setTicket] = useState(tickets[0]);
  const onChangeWorkingTime = (value?: number) => {
    if (value) {
      setWorkingTime(value);
    }
  };
  const loadTickets = async () => {
    const tickets = await getTickets();
    setTickets(tickets);
  };
  useEffect(() => { loadTickets(); }, []);
  const onChangeContent = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };
  const onSubmit = () => {
    // success
    onAddTask();
  };
  return (
    <div>
      <InputGroup compact={true}>
        <Select
          showSearch={true}
          value={ticket}
          onChange={setTicket}
          style={{ width: '20%' }}
          placeholder="ticket"
        >
          {tickets.map(ticket => <Option value={ticket.id}>{ticket.name}</Option>)}
        </Select>
        <Input
          value={content}
          placeholder="수행한 업무를 입력해주세요"
          onChange={onChangeContent}
          style={{ width: '70%' }}
        />
        <InputNumber
          min={1}
          max={9}
          value={workingTime}
          onChange={onChangeWorkingTime}
          style={{ width: '10%' }}
        />
      </InputGroup>
      <Button block={true} onClick={onSubmit} style={{ marginTop: 16 }} type="primary">저장하기</Button>
    </div>
  );
};

export default TaskInput;
