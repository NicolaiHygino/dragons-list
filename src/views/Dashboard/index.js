import React, { useState, useEffect } from 'react';
import Details from 'views/Details';
import Edit from 'views/Edit';
import { useDragons } from 'context/Dragons';
import { addDragons } from 'context/Dragons/dragonsReducer';
import { Switch, Route } from 'react-router-dom';
import { useHistory } from 'react-router';
import { apiGetAllDragons } from 'services/api';
import { MdModeEdit } from 'react-icons/md';
import {
  Content,
  Item,
  InfoWrapper,
  Name,
  Type,
  StyledDate,
  ButtonsWrapper,
  IconButton,
} from './style';

const DragonItem = ({ id, name, type, createdAt }) => {
  let history = useHistory();
  
  const date = new Date(createdAt).toLocaleDateString('en-US');
  
  return (
    <Item 
      data-testid="dragon-item"
      onClick={() => history.push(`/details/${id}`)}
    >
      <InfoWrapper>
        <Name>{name} <Type>{type}</Type></Name>
        <StyledDate>{date}</StyledDate>
      </InfoWrapper>
      <ButtonsWrapper onClick={e => e.stopPropagation()}>
        <IconButton 
          aria-label="edit"
          onClick={() => history.push(`/edit/${id}`)}
        >
          <MdModeEdit />
        </IconButton>
      </ButtonsWrapper>
    </Item>
  );
};

const Dashboard = () => {
  const [state, dispatch] = useDragons();
  const { dragons } = state;

  useEffect(() => {
    apiGetAllDragons().then(({ data }) => {
      dispatch(addDragons(data));
    });
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
