import React from 'react';
import { useAuth } from 'context/Auth';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({children, ...rest}) => {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
