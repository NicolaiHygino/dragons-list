import React, { useState, useEffect } from 'react';
import Modal from 'components/Modal';
import Form from 'components/Form';
import Loading from 'components/Loading';
import { useDragons } from 'context/Dragons';
import { editDragon } from 'context/Dragons/dragonsReducer';
import { apiGetDragon, apiEditDragon } from 'services/api';
import { useHistory, useParams } from 'react-router';

const Edit = () => {
  const [, dispatch] = useDragons();
  const [dragon, setDragon] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
      setLoading(false);
    })
    .catch(() => {
      setError("dragon doesn't exists")
      setLoading(false);
    });
  }, [id]);
  
  if (loading) return <Loading />;

  if (error) {
    return (
      <Modal title="Not Found">
        <p>{error}</p>
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
