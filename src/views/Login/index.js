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
import { useAuth } from 'context/Auth';

const dummyLoginApi = (username, password) => {
  if (username === 'admin' && password === 'admin') {
    return Promise.resolve({
      data: {
        token: 'dummytoken', 
        user: username
      }
    });
  }
  return Promise.reject('No user found for this username/password');
};

const Login = () => {
  const [error, setError] = useState('');
  const auth = useAuth();
  
  const handleSubmit = ({username, password}) => {
    dummyLoginApi(username, password).then(({ data }) => {
      auth.signin(data.token, data.user);
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
