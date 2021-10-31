import styled from 'styled-components';
import { Field } from 'formik';

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
