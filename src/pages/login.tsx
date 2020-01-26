import React, { FC, useState, ChangeEvent, FormEvent } from 'react';
import { Form, Icon, Input, Button, Row, Col, Typography, message } from 'antd';
import { login } from '../api';
import { useHistory } from 'react-router-dom';
import { CSSProperties } from 'styled-components';

const Login: FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailSuffix = '@tablemanager.io';
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await login(email + emailSuffix, password);
      const { accessToken, refreshToken, user } = res.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('userId', user.id);
      localStorage.setItem('userName', user.name);
      history.push('/');
    } catch (err) {
      message.error(err.message);
    }
  };
  const backgroundStyle: CSSProperties = {
    height: '100%',
    backgroundImage: `url('https://picsum.photos/${window.innerWidth}/${window.innerHeight}?grayscale&blur=3')`,
    backgroundSize: 'cover',
    padding: '0 32px',
    paddingTop: 128,
  };
  const rowStyle: CSSProperties = {
    backgroundColor: 'white',
    padding: '32px 16px',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: 4,
  };
  const size = {
    xs: { offset: 2, span: 20 },
    sm: { offset: 4, span: 16 },
    md: { offset: 6, span: 12 },
    lg: { offset: 8, span: 8 },
    xl: { offset: 9, span: 6 },
  };
  return (
    <main style={backgroundStyle}>
      <Col {...size}>
      <Row style={rowStyle} align="bottom">
        <Col >
          <Typography.Title style={{ textAlign: 'center' }}>Sign in</Typography.Title>
          <Form onSubmit={onSubmit}>
            <Form.Item>
              <Input
                prefix={<Icon type="user"/>}
                placeholder="Email"
                suffix={emailSuffix}
                value={email}
                onChange={onChangeEmail}
                size="large"
              />
            </Form.Item>
            <Form.Item>
              <Input
                prefix={<Icon type="lock"/>}
                type="password"
                placeholder="Password"
                value={password}
                onChange={onChangePassword}
                size="large"
              />
            </Form.Item>
            <Form.Item>
              <Col span={12} offset={6}>
                <Button
                  type="primary"
                  htmlType="submit"
                  block={true}
                  size="large"
                  icon="unlock"
                >
                  Log in
                </Button>
              </Col>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      </Col>
    </main>
  );
};

export default Form.create({ name: 'login' })(Login);
