import React, { FC, useState } from 'react';
import { Row, Col, Card, Button } from 'antd';

const Home: FC = () => {
  const size = {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 12 },
    lg: { span: 8 },
    xl: { span: 6 },
  };

  return (
    <React.Fragment>
      <h1>Tasks</h1>
      <Row gutter={[8, 8]}>
        <Col {...size}>
          <Card hoverable={true} title="test">dsad</Card>
        </Col>
        <Col {...size}>
          <Card></Card>
        </Col>
        <Col {...size}>
          <Card hoverable={true}></Card>
        </Col>
        <Col {...size}>
          <Card></Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Home;
