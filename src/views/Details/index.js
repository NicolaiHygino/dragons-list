import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

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
  }, []);

  if (loading) return <p>loading</p>;
  
  const date = new Date(details.createdAt).toLocaleDateString('en-US');

  return (
    <>
      <h2>Dragon Details</h2>
      <p data-testid="details-name">{details.name}</p>
      <p data-testid="details-type">{details.type}</p>
      <p data-testid="details-createdAt">{date}</p>
    </>
  );
};

export default Details;
