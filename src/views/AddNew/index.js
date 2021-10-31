import React from 'react';
import Modal from 'components/Modal';
import Form from 'components/Form';
import { useDragons } from 'context/Dragons';
import { newDragon } from 'context/Dragons/dragonsReducer';
import { apiCreateNewDragon } from 'services/api';
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
      <Form 
        initialValues={{
          name: '', 
          type: '', 
          histories: ''
        }} 
        onFormSubmit={handleSubmit}
      />
    </Modal>
  );
};

export default AddNew;
