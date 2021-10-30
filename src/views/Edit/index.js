import React, { useState, useEffect } from 'react';
import Modal from 'components/Modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { useParams } from 'react-router';

const apiURL = 'http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon';

const Edit = () => {
  const [dragon, setDragon] = useState();
  const { id } = useParams();
  
  useEffect(() => {
    axios.get(`${apiURL}/${id}`).then(res => {
      setDragon(res.data);
    })
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
