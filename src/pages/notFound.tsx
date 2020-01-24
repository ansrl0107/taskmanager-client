import React, { FC } from 'react';
import { Result, Button } from 'antd';
import { useHistory } from 'react-router-dom';

const NotFound: FC = () => {
  const history = useHistory();
  const onClick = () => {
    history.push('/');
  };
  return (
    <Result
      status="404"
      title="Oops!"
      subTitle="You've come to a strange page!"
      extra={<Button type="primary" onClick={onClick}>Back Home</Button>}
    />
  );
};

export default NotFound;
