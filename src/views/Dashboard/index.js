import React, { useEffect } from 'react';
import Details from 'views/Details';
import Edit from 'views/Edit';
import AddNew from 'views/AddNew';
import ListItem from 'components/ListItem';
import Message from 'components/Message';
import { useDragons } from 'context/Dragons';
import { addDragons } from 'context/Dragons/dragonsReducer';
import { Switch, Route, useHistory } from 'react-router-dom';
import { apiGetAllDragons } from 'services/api';
import { FiInbox } from 'react-icons/fi';
import {
  Content,
  AddNewButton,
} from './style';

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
        {dragons.length === 0 && (
          <Message
            icon={<FiInbox size="1.5em" />}
            text="No dragons registered, start adding yours!"
          />
        )}
        {dragons.map(dragon => <ListItem key={dragon.id} {...dragon} />)}
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
