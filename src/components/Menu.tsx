import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import { CSSProperties } from 'styled-components';

const MyMenu: FC = () => {
  const history = useHistory();
  const movePage = (path: string) => history.push(path);
  const onClickHome = () => movePage('/');
  const onClickPlan = () => movePage('/plan');
  const onClickReport = () => movePage('/report');
  const onClickTask = () => movePage('/task');
  const style: CSSProperties = {
    height: '100%',
    padding: '32px 0',
  };
  return (
    <Menu mode="inline" theme="light" style={style}>
      <Menu.Item key="1" onClick={onClickHome}>
        <Icon type="home"/>
        <span>Home</span>
      </Menu.Item>
      <Menu.Item key="2" onClick={onClickPlan}>
        <Icon type="schedule"/>
        <span>Plan</span>
      </Menu.Item>
      <Menu.Item key="3" onClick={onClickTask}>
        <Icon type="appstore" />
        <span>Task</span>
      </Menu.Item>
      <Menu.Item key="4" onClick={onClickReport}>
        <Icon type="profile"/>
        <span>Report</span>
      </Menu.Item>
    </Menu>
  );
};

export default MyMenu;
