import React, { FC } from 'react';
import Menu from './Menu';
import { Layout } from 'antd';
const { Sider, Content } = Layout;

const PageTemplate: FC = ({ children }) => (
  <Layout style={{ height: '100%' }}>
    <Sider breakpoint="md">
      <Menu/>
    </Sider>
    <Content style={{ padding: 0, height: '100vh' }}>{children}</Content>
  </Layout>
);

export default PageTemplate;
