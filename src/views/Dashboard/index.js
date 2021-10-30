import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Content,
  Item,
  Name,
  Type,
  StyledDate,
} from './style';

const apiURL = 'http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon';

const DragonItem = ({ name, type, createdAt }) => {
  const date = new Date(createdAt).toLocaleDateString('en-US');
  return (
    <Item>
      <Name>{name} <Type>{type}</Type></Name>
      <StyledDate>{date}</StyledDate>
    </Item>
  );
};

const Dashboard = () => {
  const [dragons, setDragons] = useState([]);

  useEffect(() => {
    axios.get(apiURL).then(res => setDragons(res.data));
  }, []);
  
  return (
    <Content>
      <h1>Dashboard</h1>
      {dragons.map(dragon => (
        <DragonItem key={dragon.id} {...dragon} />
      ))}
    </Content>
  );
};

export default Dashboard;
