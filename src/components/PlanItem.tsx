import React, { FC, CSSProperties } from 'react';
import { Plan } from '../types';
import { Checkbox, Icon } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

interface Props {
  plan: Plan;
  onClose: (planId: string) => void;
  onOpen: (planId: string) => void;
  onDelete: (planId: string) => void;
}
export const PlanItem: FC<Props> = ({ plan, onClose, onOpen, onDelete }) => {
  const { id, closedAt, content } = plan;

  const onChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      onClose(id);
    } else {
      onOpen(id);
    }
  };

  const isOpen = closedAt === null;
  const style: CSSProperties = {
    backgroundColor: 'white',
    padding: 16,
    textDecoration: isOpen ? 'none' : 'line-through',
    color: isOpen ? 'rgba(0, 0, 0, 0.65)' : '#aaa',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    height: 24,
    lineHeight: '24px',
    boxSizing: 'content-box',
  };
  const prefixStyle: CSSProperties = {
    float: 'left',
    marginRight: 16,
  };
  const suffixStyle: CSSProperties = {
    float: 'right',
    marginLeft: 16,
  };
  return (
    <article style={style}>
      <Checkbox onChange={onChange} checked={!isOpen} style={prefixStyle}/>
      {content}
      {isOpen ? <Icon type="delete" onClick={() => onDelete(id)} style={suffixStyle}/> : null}
    </article>
  );
};
