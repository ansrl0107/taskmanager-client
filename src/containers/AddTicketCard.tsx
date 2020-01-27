import React, { FC, useState, CSSProperties } from 'react';
import { Card, Input, InputNumber, Select, Button, message } from 'antd';
// import { TicketType } from '../types';
import { addTicket } from '../api';

export enum TicketType {
  DEV = 'development',
  ISSUE = 'issue',
  BUG = 'bug',
}

const { Option } = Select;
interface Props {
  onSuccess: () => void;
  projectId: string;
}
const style: CSSProperties = {
  marginBottom: 16,
  width: '100%',
};
const AddTicketCard: FC<Props> = ({ onSuccess, projectId }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState(TicketType.DEV);
  const [priority, setPriority] = useState(5);
  const saveTicket = async () => {
    const data = { name, description, type, priority, projectId };
    try {
      await addTicket(data);
      onSuccess();
    } catch (err) {
      message.error(err.message);
    }
  };
  const onChangePriority = (value: number | undefined) => {
    if (value) {
      setPriority(value);
    }
  };
  const onSelect = (value: TicketType) => {
    setType(value);
  };
  return (
    <Card hoverable={true} title="Add Ticket">
      <Input
        placeholder="Ticket name"
        style={style}
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <Select value={type} onChange={onSelect} style={style}>
        <Option value={TicketType.DEV}>{TicketType.DEV}</Option>
        <Option value={TicketType.BUG}>{TicketType.BUG}</Option>
        <Option value={TicketType.ISSUE}>{TicketType.ISSUE}</Option>
      </Select>
      <Input
        placeholder="Ticket description"
        style={style}
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <InputNumber
        style={style}
        value={priority}
        onChange={onChangePriority}
        min={1}
        max={5}
      />
      <Button block={true} type="primary" icon="edit" onClick={saveTicket}>Save</Button>
    </Card>
  );
};

export default AddTicketCard;
