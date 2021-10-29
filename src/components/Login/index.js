import React, { useState } from 'react';
import { Formik, ErrorMessage } from 'formik';
import {
  StyledLogin,
  FieldWrapper,
  StyledForm,
  StyledField,
  Header,
  Error,
} from './style';
import { Button } from 'globalStyles';

const dummyLoginApi = (username, password) => {
  if (username === 'admin' && password === 'admin') {
    return Promise.resolve(username);
  }
  return Promise.reject('No user found for this username/password');
};

const Login = ({ setUser }) => {
  const [error, setError] = useState('');
  
  const handleSubmit = ({username, password}) => {
    dummyLoginApi(username, password).then(res => {
      setUser(res);
    })
    .catch(err => {
      setError(err);
    });
  };
  
  return (
    <StyledLogin>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={values => handleSubmit(values)}
      >
        <StyledForm aria-label="form">
          <Header>Login</Header>

          {error && <Error>{error}</Error>}

          <FieldWrapper>
            <label htmlFor="username">Username</label>
            <StyledField id="username" name="username" type="text" />
            <ErrorMessage name="username" />
          </FieldWrapper>
  
          <FieldWrapper>
            <label htmlFor="password">Password</label>
            <StyledField id="password" name="password" type="password" />
            <ErrorMessage name="password" />
          </FieldWrapper>

          <Button type="submit">Login</Button>
        </StyledForm>
      </Formik>
    </StyledLogin>
  );
};

export default Login;
