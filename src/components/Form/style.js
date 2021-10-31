import styled from 'styled-components';
import { Form, Field, ErrorMessage } from 'formik';

export const StyledForm = styled(Form)`
  & textarea {
    max-width: 100%;
    height: 200px;
    max-height: 250px;
    border: 0;
    background-color: #e1dfe2;
    color: #757575;
    width: 100%;
    padding: .7em;
    transition: all ease .3s;

    &:hover {
      background-color: #D8D6D9;
    }
  }
`;

export const FieldWrapper = styled.div`
  margin-bottom: 15px;
`;

export const Label = styled.label`
  display: block;
  color: #757575;
  font-weight: 600;
`;

export const StyledField = styled(Field)`
  border: 0;
  background-color: #e1dfe2;
  color: #757575;
  width: 100%;
  padding: .7em;
  transition: all ease .3s;

  &:hover {
    background-color: #D8D6D9;
  }
`;

export const StyledError = styled(ErrorMessage)`
  color: var(--error);
  font-size: .9em;
`;
