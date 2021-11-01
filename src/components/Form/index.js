import React from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import {
  FieldWrapper,
  Label,
  StyledForm,
  StyledField,
  StyledError,
} from './style';
import { Button } from 'globalStyles';

const Form = ({ initialValues, onFormSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        name: Yup.string()
          .required('Required')
          .max(20, 'Must be 20 characters or less'),
        type: Yup.string()
          .required('Required')
          .max(15, 'Must be 15 characters or less'),
        histories: Yup.string().required('Required'),
      })}
      onSubmit={values => onFormSubmit(values)}
    >
      <StyledForm aria-label="form">
        <FieldWrapper>
          <Label htmlFor="name">Name</Label>
          <StyledField id="name" name="name" type="text" />
          <StyledError name="name" component="p" />
        </FieldWrapper>
        
        <FieldWrapper>
          <Label htmlFor="type">Type</Label>
          <StyledField id="type" name="type" type="text" />
          <StyledError name="type" component="p" />
        </FieldWrapper>

        <FieldWrapper>
          <Label htmlFor="histories">Histories</Label>
          <Field id="histories" name="histories" as="textarea" />
          <StyledError name="histories" component="p" />
        </FieldWrapper>

        <Button type="submit">Save</Button>
      </StyledForm>
    </Formik>
  );
};

export default Form;
