import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import {
  Background,
  Modal,
  Header,
  Content,
  BackButton,
  Name,
  Type,
} from './style';

const apiURL = 'http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon';

const Details = () => {
  const [details, setDetails] = useState();
  const [loading, setLoading] = useState(true);

  let history = useHistory();
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
      <Background onClick={() => history.push('/')}>
        <p>Loading</p>
      </Background>
    );
  };
  
  const date = new Date(details.createdAt).toLocaleDateString('en-US');

  return (
    <Background onClick={() => history.push('/')}>
      <Modal onClick={e => e.stopPropagation()}>
        <Header>
          <h2>Dragon Details</h2>
          <BackButton onClick={() => history.push('/')}>
            <HiOutlineArrowNarrowLeft /> Back
          </BackButton>
        </Header>
        <Content>
          <Name data-testid="details-name">{details.name}</Name>
          <Type data-testid="details-type">
            <span>{details.type}</span>
          </Type>
          <p data-testid="details-createdAt">{date}</p>
        </Content>
      </Modal>
    </Background>
  );
};

export default Details;
