import React from 'react';
import Modal from 'components/Modal';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { useDragons } from 'context/Dragons';
import { newDragon } from 'context/Dragons/dragonsReducer';
import { apiCreateNewDragon } from 'services/api';
import {
  FieldWrapper,
  Label,
  StyledForm,
  StyledField,
} from './style';
import { Button } from 'globalStyles';
import { useHistory } from 'react-router-dom';

const AddNew = () => {
  const [, dispatch] = useDragons();

  const history = useHistory();

  const handleSubmit = (values) => {
    apiCreateNewDragon(values).then(({data}) => {
      dispatch(newDragon(data));
      history.push('/');
    });
  };
  
  return (
    <Modal title="New Dragon">
      <Formik
        initialValues={{
          name: '', 
          type: '',
          histories: '', 
        }}
        validationSchema={Yup.object({})}
        onSubmit={values => handleSubmit(values)}
      >
        <StyledForm aria-label="form">
          <FieldWrapper>
            <Label htmlFor="name">Name</Label>
            <StyledField id="name" name="name" type="text" />
          </FieldWrapper>
          
          <FieldWrapper>
            <Label htmlFor="type">Type</Label>
            <StyledField id="type" name="type" type="text" />
          </FieldWrapper>

          <FieldWrapper>
            <Label htmlFor="histories">Histories</Label>
            <Field id="histories" name="histories" as="textarea" />
          </FieldWrapper>

          <Button type="submit">Save</Button>
        </StyledForm>
      </Formik>
    </Modal>
  );
};

export default AddNew;
