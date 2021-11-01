import React, { useState, useEffect } from 'react';
import Modal from 'components/Modal';
import Form from 'components/Form';
import Message from 'components/Message';
import Loading from 'components/Loading';
import { useDragons } from 'context/Dragons';
import { editDragon } from 'context/Dragons/dragonsReducer';
import { apiGetDragon, apiEditDragon } from 'services/api';
import { useHistory, useParams } from 'react-router';
import { BiError } from 'react-icons/bi';

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
      setError("Dragon doesn't exists")
      setLoading(false);
    });
  }, [id]);
  
  if (loading) return <Loading />;

  if (error) {
    return (
      <Modal title="Not Found">
        <Message 
          icon={<BiError size="1.5em"/>}
          text={error}
        />
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
