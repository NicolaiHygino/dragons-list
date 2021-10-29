import styled from 'styled-components';
import { Form, Field } from 'formik';

export const StyledLogin = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

export const Header = styled.h1`
  text-align: center;
  margin-bottom: 30px;
`;

export const StyledForm = styled(Form)`
  max-width: 300px;
  width: 100%;
  padding: 10px;
`;

export const StyledField = styled(Field)`
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: .8em 1em;
`;

export const FieldWrapper = styled.div`
  margin-bottom: 20px;
`;

export const Button = styled.button`
  border: 0;
  border-radius: 3px;
  background-color: var(--main-color);
  color: white;
  padding: .8em;
  cursor: pointer;
`;

export const Error = styled.p`
  font-size: .9em;
  color: var(--error);
  margin-bottom: 20px;
`;
