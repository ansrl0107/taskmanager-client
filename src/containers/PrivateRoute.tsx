import React, { FC } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

const PrivateRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const accessToken = localStorage.getItem('accessToken');
  // TODO: expired 시간에 따른 예외 처리 및 재발급
  const isAuthenticated = accessToken ? true : false;
  return (
    <Route
      {...rest}
      render={(props) => {
        return isAuthenticated
        ? children
        : <Redirect to = {{ pathname: '/sign-in', state: { from: props.location } }}/>;
      }}
    />
  );
};

export default PrivateRoute;
