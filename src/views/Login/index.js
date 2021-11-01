import React, { useState } from 'react';
import { Formik, ErrorMessage } from 'formik';
import {
  LoginWrapper,
  StyledLogin,
  FieldWrapper,
  StyledForm,
  Label,
  StyledField,
  Header,
  StyledError,
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
    <LoginWrapper>
      <StyledLogin>
        <Formik
          initialValues={{ username: '', password: '' }}
          onSubmit={values => handleSubmit(values)}
        >
          <StyledForm aria-label="form">
            <Header>Login</Header>

            {error && <StyledError>{error}</StyledError>}

            <FieldWrapper>
              <Label htmlFor="username">Username</Label>
              <StyledField id="username" name="username" type="text" />
              <ErrorMessage name="username" />
            </FieldWrapper>
    
            <FieldWrapper>
              <Label htmlFor="password">Password</Label>
              <StyledField id="password" name="password" type="password" />
              <ErrorMessage name="password" />
            </FieldWrapper>

            <Button type="submit">Submit</Button>
          </StyledForm>
        </Formik>
      </StyledLogin>
    </LoginWrapper>
  );
};

export default Login;
