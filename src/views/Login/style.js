import styled from 'styled-components';
import { Form, Field } from 'formik';

export const LoginWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 85vh;
`;

export const StyledLogin = styled.section`
  display: flex;
  background-color: white;
  align-items: center;
  justify-content: center;
  max-width: 300px;
  width: 100%;
  margin: 0 10px;
  border-radius: 5px;
`;

export const Header = styled.h1`
  text-align: center;
  margin-bottom: 10px;
`;

export const StyledForm = styled(Form)`
  max-width: 300px;
  width: 100%;
  padding: 10px;
`;

export const Label = styled.label`
  display: block;
  font-weight: 600;
`;

export const FieldWrapper = styled.div`
  margin-bottom: 20px;
`;

export const StyledField = styled(Field)`
  border: 0;
  background-color: #e1dfe2;
  color: #676767;
  width: 100%;
  padding: .7em;
  transition: all ease .3s;

  &:hover {
    background-color: #D8D6D9;
  }
`;

export const StyledError = styled.p`
  font-size: .9em;
  color: var(--error);
  margin-bottom: 20px;
`;
