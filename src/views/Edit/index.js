import React, { useState, useEffect } from 'react';
import Modal from 'components/Modal';
import Form from 'components/Form';
import { useDragons } from 'context/Dragons';
import { editDragon } from 'context/Dragons/dragonsReducer';
import { apiGetDragon, apiEditDragon } from 'services/api';
import { useHistory, useParams } from 'react-router';

const Edit = () => {
  const [dragon, setDragon] = useState();
  const [, dispatch] = useDragons();

  const history = useHistory();
  const { id } = useParams();

  const handleSubmit = (values) => {
    values.id = id;
    apiEditDragon(id, values);
    dispatch(editDragon(values));
    history.push('/');
  }

  useEffect(() => {
    apiGetDragon(id).then(res => {
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
      <Form
        initialValues={{
          name: dragon.name, 
          type: dragon.type,
          histories: dragon.histories, 
        }}
        onFormSubmit={handleSubmit}
      />
    </Modal>
  );
};

export default Edit;
