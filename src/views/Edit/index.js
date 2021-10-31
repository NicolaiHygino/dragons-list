import React, { useState, useEffect } from 'react';
import Modal from 'components/Modal';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { getDragon, editDragon } from 'services/api';
import { useParams } from 'react-router';
import {
  FieldWrapper,
  Label,
  StyledField,
} from './style';
import { Button } from 'globalStyles';

const Edit = () => {
  const [dragon, setDragon] = useState();
  const { id } = useParams();
  
  const handleSubmit = (values) => {
    editDragon(id, values);
  }

  useEffect(() => {
    getDragon(id).then(res => {
      setDragon(res.data);
    });
  }, [id]);
  
  if (!dragon) {
    return (
      <Modal>
        <p>Loading...</p>
      </Modal>
    );
  };

  return (
    <Modal title="Edit Dragon">
      <Formik
        initialValues={{name: dragon.name, type: dragon.type }}
        validationSchema={Yup.object({})}
        onSubmit={values => handleSubmit(values)}
      >
        <Form aria-label="form">
          <FieldWrapper>
            <Label htmlFor="name">Name</Label>
            <StyledField id="name" name="name" type="text" />
          </FieldWrapper>
          
          <FieldWrapper>
            <Label htmlFor="type">Type</Label>
            <StyledField id="type" name="type" type="text" />
          </FieldWrapper>

          <Button type="submit">Save</Button>
        </Form>
      </Formik>
    </Modal>
  );
};

export default Edit;
