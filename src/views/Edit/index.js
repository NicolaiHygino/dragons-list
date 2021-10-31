import React, { useState, useEffect } from 'react';
import Modal from 'components/Modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { getDragon } from 'services/api';
import { useParams } from 'react-router';

const Edit = () => {
  const [dragon, setDragon] = useState();
  const { id } = useParams();
  
  useEffect(() => {
    getDragon(id).then(res => {
      setDragon(res.data);
    });
  }, [id]);
  
  if (!dragon) return <p>loading</p>;

  return (
    <Modal title="Edit Dragon">
      <Formik
        initialValues={{name: dragon.name, type: dragon.type }}
      >
        <Form aria-label="form">
          <label htmlFor="name">Name</label>
          <Field id="name" name="name" type="text" />
          
          <label htmlFor="type">Type</label>
          <Field id="type" name="type" type="text" />

          <button type="submit">Save</button>
        </Form>
      </Formik>
    </Modal>
  );
};

export default Edit;
