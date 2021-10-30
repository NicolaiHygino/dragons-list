import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'components/Modal';
import { useParams } from 'react-router';
import {
  Name,
  Type,
} from './style';

const apiURL = 'http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon';

const Details = () => {
  const [details, setDetails] = useState();
  const [loading, setLoading] = useState(true);

  let { id } = useParams();
  
  useEffect(() => {
    axios.get(`${apiURL}/${id}`)
      .then(res => {
        setDetails(res.data)
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Modal>
        <p>Loading</p>
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
      <p data-testid="details-createdAt">{date}</p>
    </Modal>
  );
};

export default Details;
