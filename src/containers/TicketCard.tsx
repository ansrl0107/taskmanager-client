import React, { FC } from 'react';
import { Ticket } from '../types';
import { Col, Card, Icon, Popconfirm, message } from 'antd';
import * as api from '../api';

const colSize = {
  xs: 24,
  sm: 12,
  lg: 8,
  xl: 6,
};

interface Props {
  ticket: Ticket;
  onDelete?: () => void;
  onClose?: () => void;
}

interface TicketCloseProps {
  ticketId: string;
  onClose?: () => void;
}
const TicketCloseButton: FC<TicketCloseProps> = ({ ticketId, onClose }) => {
  const closeTicket = async () => {
    try {
      await api.closeTicket(ticketId);
      if (onClose) {
        onClose();
      }
    } catch (err) {
      message.error(err.message);
    }
  }
  return (
    <Popconfirm
      title="Are you sure close this ticket?"
      onConfirm={closeTicket}
      okText="close"
      cancelText="cancel"
    >
      <Icon type="check" key="close"/>
    </Popconfirm>
  )
}

interface TicketDeleteProps {
  ticketId: string;
  onDelete?: () => void;
}
const TicketDeleteButton: FC<TicketDeleteProps> = ({ ticketId, onDelete }) => {
  const deleteTicket = async () => {
    try {
      await api.deleteTicket(ticketId);
      if (onDelete) {
        onDelete();
      }
    } catch (err) {
      message.error(err.message);
    }
  }

  return (
    <Popconfirm
      title="Are you sure delete this ticket?"
      onConfirm={deleteTicket}
      okText="delete"
      cancelText="cancel"
    >
      <Icon type="delete" key="delete"/>
    </Popconfirm>
  )
}

export const TicketCard: FC<Props> = ({ ticket, onDelete, onClose }) => {
  const { id, name, description } = ticket;

  return (
    <Col {...colSize}>
      <Card
        title={`[${id}] ${name}`}
        hoverable={true}
        bodyStyle={{
          minHeight: 128,
          overflow: 'hidden'
        }}
        actions={[
          <TicketDeleteButton ticketId={id} onDelete={onDelete}/>,
          <TicketCloseButton ticketId={id} onClose={onClose}/>
        ]}
      >
        {description}
      </Card>
    </Col>
  )
}
