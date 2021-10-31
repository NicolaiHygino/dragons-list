import React, { useState, useEffect } from 'react';
import Details from 'views/Details';
import Edit from 'views/Edit';
import { Switch, Route } from 'react-router-dom';
import { useHistory } from 'react-router';
import { getAllDragons } from 'services/api';
import {
  Content,
  Item,
  Name,
  Type,
  StyledDate,
} from './style';

const DragonItem = ({ id, name, type, createdAt }) => {
  let history = useHistory();
  
  const date = new Date(createdAt).toLocaleDateString('en-US');
  
  return (
    <Item 
      data-testid="dragon-item"
      onClick={() => history.push(`/details/${id}`)}
    >
      <Name>{name} <Type>{type}</Type></Name>
      <StyledDate>{date}</StyledDate>
      <div onClick={e => e.stopPropagation()}>
        <button 
          aria-label="edit"
          onClick={() => history.push(`/edit/${id}`)}
        >
          Edit
        </button>
      </div>
    </Item>
  );
};

const Dashboard = () => {
  const [dragons, setDragons] = useState([]);

  useEffect(() => {
    getAllDragons().then(res => setDragons(res.data));
  }, []);
  
  return (
    <>
      <Content>
        <h1>Dashboard</h1>
        {dragons.map(dragon => <DragonItem key={dragon.id} {...dragon} />)}
      </Content>
      <Switch>
        <Route path="/edit/:id">
          <Edit />
        </Route>
        <Route path="/details/:id">
          <Details />
        </Route>
      </Switch>
    </>
  );
};

export default Dashboard;
