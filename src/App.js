import React from 'react';
import Login from 'views/Login';
import Dashboard from 'views/Dashboard';
import PageNotFound from 'components/PageNotFound';
import PrivateRoute from 'components/PrivateRoute';
import { Switch, Route, Redirect } from 'react-router';
import { useAuth } from 'context/Auth';

const App = () => {
  const auth = useAuth();

  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/dashboard" />
      </Route>
      <PrivateRoute path="/dashboard">
        <Dashboard />
      </PrivateRoute>
      <Route path="/login">
        {auth.token && <Redirect to="/" />}
        <Login />
      </Route>
      <Route path="*">
        <PageNotFound />
      </Route>
    </Switch>
  );
};

export default App;
