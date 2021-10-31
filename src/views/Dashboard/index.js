import React, { useEffect } from 'react';
import Details from 'views/Details';
import Edit from 'views/Edit';
import AddNew from 'views/AddNew';
import { useDragons } from 'context/Dragons';
import { addDragons, deleteDragon } from 'context/Dragons/dragonsReducer';
import { Switch, Route, useHistory } from 'react-router-dom';
import { apiGetAllDragons, apiDeleteDragon } from 'services/api';
import { MdModeEdit, MdDelete } from 'react-icons/md';
import {
  Content,
  Item,
  InfoWrapper,
  Name,
  Type,
  StyledDate,
  ButtonsWrapper,
  IconButton,
  AddNewButton,
} from './style';

const DragonItem = ({ id, name, type, createdAt }) => {
  const [, dispatch] = useDragons();

  let history = useHistory();
  
  const date = new Date(createdAt).toLocaleDateString('en-US');
  
  const handleDelete = () => {
    apiDeleteDragon(id)
      .then(dispatch(deleteDragon(id)));
  };

  return (
    <Item 
      data-testid="dragon-item"
      onClick={() => history.push(`/details/${id}`)}
    >
      <InfoWrapper>
        <Name data-testid="dragon-item-name">{name} <Type>{type}</Type></Name>
        <StyledDate>{date}</StyledDate>
      </InfoWrapper>
      <ButtonsWrapper onClick={e => e.stopPropagation()}>
        <IconButton 
          aria-label="edit"
          onClick={() => history.push(`/edit/${id}`)}
        >
          <MdModeEdit />
        </IconButton>
        <IconButton 
          aria-label="delete"
          onClick={() => handleDelete()}
        >
          <MdDelete />
        </IconButton>
      </ButtonsWrapper>
    </Item>
  );
};

const Dashboard = () => {
  const [state, dispatch] = useDragons();
  const { dragons } = state;
  
  dragons.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });

  const history = useHistory();

  useEffect(() => {
    apiGetAllDragons().then(({ data }) => {
      dispatch(addDragons(data));
    });
  }, [dispatch]);
  
  return (
    <>
      <Content>
        <AddNewButton onClick={() => history.push('/add')}>
          Add New Dragon
        </AddNewButton>
        {dragons.map(dragon => <DragonItem key={dragon.id} {...dragon} />)}
      </Content>
      <Switch>
        <Route path="/edit/:id">
          <Edit />
        </Route>
        <Route path="/details/:id">
          <Details />
        </Route>
        <Route path="/add">
          <AddNew />
        </Route>
      </Switch>
    </>
  );
};

export default Dashboard;
