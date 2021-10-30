import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const apiURL = 'http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon';

const Dashboard = () => {
  const [dragons, setDragons] = useState([]);

  useEffect(() => {
    axios.get(apiURL).then(res => setDragons(res.data));
  }, []);
  
  return (
    <>
      <h1>Dashboard</h1>
      {dragons.map(dragon => (
        <div key={dragon.id}>
          <h2>{dragon.name}</h2>
          <h2>{dragon.type}</h2>
          <h2>{dragon.histories}</h2>
          <h2>{dragon.createdAt}</h2>
        </div>
      ))}
    </>
  );
};

export default Dashboard;
