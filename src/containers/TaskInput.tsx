import React, { FC, useState, ChangeEvent, useEffect } from 'react';
import { Input, InputNumber, Select, Button, message } from 'antd';
import { Ticket } from '../types';
import { getTickets, addTask } from '../api';
const InputGroup = Input.Group;
const { Option } = Select;

interface Props {
  onAddTask: () => void;
}
const TaskInput: FC<Props> = ({ onAddTask }) => {
  const [workingTime, setWorkingTime] = useState(1);
  const [content, setContent] = useState('');
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [ticketId, setTicketId] = useState<string>();
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
  const onSubmit = async () => {
    // success
    if (!ticketId) {
      message.warning('Ticket을 선택해주세요.');
      return;
    }
    if (content.trim().length === 0) {
      message.warning('Task를 적어주세요.');
      return;
    }

    const data = {
      content,
      workingTime,
      ticketId,
    };
    await addTask(data);
    onAddTask();
  };
  const renderTicket = (ticket: Ticket) => {
    return <Option key={ticket.id} value={ticket.id}>{`[${ticket.id}] ${ticket.name}`}</Option>;
  };
  return (
    <div>
      <Select
        showSearch={true}
        value={ticketId}
        onChange={setTicketId}
        style={{ width: '100%', marginBottom: 16 }}
        placeholder="ticket"
      >
        {tickets.map(renderTicket)}
      </Select>
      <InputGroup compact={true}>
        <Input
          value={content}
          placeholder="수행한 업무를 입력해주세요"
          onChange={onChangeContent}
          style={{ width: '80%' }}
        />
        <InputNumber
          min={1}
          max={9}
          value={workingTime}
          onChange={onChangeWorkingTime}
          style={{ width: '20%' }}
        />
      </InputGroup>
      <Button block={true} onClick={onSubmit} style={{ marginTop: 16 }} type="primary">저장하기</Button>
    </div>
  );
};

export default TaskInput;
