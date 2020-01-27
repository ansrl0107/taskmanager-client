import React, { FC, useState, FormEvent } from 'react';
import { Form, Input, Button, Col, message } from 'antd';
import { addTeamMember } from '../api';
import { useHistory } from 'react-router-dom';

const size = {
  xs: { offset: 2, span: 20 },
  sm: { offset: 4, span: 16 },
  md: { offset: 6, span: 12 },
  lg: { offset: 8, span: 8 },
  xl: { offset: 9, span: 6 },
};
const SignUp: FC = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const register = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addTeamMember({ name, password, email: email + emailSuffix, teamId: 'dev' });
      message.success('회원가입이 완료되었습니다.');
      history.push('/sign-in');
    } catch (err) {
      message.error(err.response.data.message || err.message);
    }
  };
  const emailSuffix = '@tablemanager.io';
  return (
    <Col {...size} style={{ marginTop: 64 }}>
      <Form onSubmit={register}>
        <h1>Sign up</h1>
        <Form.Item>
          <Input
            placeholder="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Input
            placeholder="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            suffix={emailSuffix}
          />
        </Form.Item>
        <Form.Item>
          <Input
            placeholder="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block={true}
            icon="user-add"
          >
            Sign up
          </Button>
        </Form.Item>
      </Form>
    </Col>
  );
};

export default SignUp;
