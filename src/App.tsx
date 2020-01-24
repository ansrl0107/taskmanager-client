import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { PrivateRoute } from './containers';
import { Home, Login, Task, Report, Plan, NotFound } from './pages';
import { PageTemplate } from './components';

const App: FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/sign-in"><Login/></Route>
        <PageTemplate>
          <PrivateRoute exact={true} path="/"><Home/></PrivateRoute>
          <PrivateRoute path="/task"><Task/></PrivateRoute>
          <PrivateRoute path="/report"><Report/></PrivateRoute>
          <PrivateRoute path="/plan"><Plan/></PrivateRoute>
        </PageTemplate>
        <Route><NotFound/></Route>
      </Switch>
    </Router>
  );
};

export default App;
