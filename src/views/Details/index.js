import React, { useState, useEffect } from 'react';
import Modal from 'components/Modal';
import Message from 'components/Message';
import Loading from 'components/Loading';
import { useParams } from 'react-router';
import { apiGetDragon } from 'services/api';
import { BiError } from 'react-icons/bi';
import {
  Name,
  Type,
  Histories,
} from './style';

const Details = () => {
  const [details, setDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  let { id } = useParams();

  useEffect(() => {
    apiGetDragon(id).then(res => {
      setDetails(res.data);
      setLoading(false);
    })
    .catch(() => {
      setError("Dragon doesn't exists");
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

  const date = new Date(details.createdAt).toLocaleDateString('en-US');

  return (
    <Modal title="Dragon Details">
      <Name data-testid="details-name">{details.name}</Name>
      <Type data-testid="details-type">
        <span>{details.type}</span>
      </Type>
      <Histories>{details.histories}</Histories>
      <p data-testid="details-createdAt">{date}</p>
    </Modal>
  );
};

export default Details;
