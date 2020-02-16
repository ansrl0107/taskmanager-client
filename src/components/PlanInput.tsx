import React, { FC, FormEvent, useState, CSSProperties } from 'react';
import { Form, Input, Button, DatePicker } from 'antd';
import moment from 'moment';

interface PlanBody {
  content: string;
  deadline: string;
}
interface Props{
  addPlan: (body: PlanBody) => void;
}
export const PlanInput: FC<Props> = ({ addPlan }) => {
  const initialDeadline = moment().tz('Asia/Seoul');
  const [content, setContent] = useState('');
  const [deadline, setDeadline] = useState(initialDeadline);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setContent('');
    setDeadline(initialDeadline);
    addPlan({ content, deadline: deadline.tz('Asia/Seoul').format('YYYY-MM-DD') });
  };

  const formStyle: CSSProperties = {
    backgroundColor: 'white',
    padding: 16,
    height: '100%',
    borderLeft: '1px solid rgba(0, 0, 0, 0.1)',
  };
  return (
    <Form onSubmit={onSubmit} style={formStyle}>
      <Form.Item label="Deadline" labelAlign="right" colon={false}>
        <DatePicker
          value={deadline}
          onChange={(e) => { if (e) setDeadline(e); }}
          allowClear={false}
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item label="Title" labelAlign="right" colon={false}>
        <Input
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="계획을 적어주세요."
          autoFocus={true}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block={true}>추가하기</Button>
      </Form.Item>
    </Form>
  );
};
