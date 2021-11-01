import React, { useState, useEffect } from 'react';
import Details from 'views/Details';
import Edit from 'views/Edit';
import AddNew from 'views/AddNew';
import ListItem from 'components/ListItem';
import PageNotFound from 'components/PageNotFound';
import Pagination from 'components/Pagination';
import Message from 'components/Message';
import { useDragons } from 'context/Dragons';
import { addDragons } from 'context/Dragons/dragonsReducer';
import { useAuth } from 'context/Auth';
import { Switch, Route, useHistory, useRouteMatch } from 'react-router-dom';
import { apiGetAllDragons } from 'services/api';
import { FiInbox } from 'react-icons/fi';
import {
  Content,
  AddNewButton,
  AccountWrapper,
  User,
  Signout,
} from './style';

const Dashboard = () => {
  const [state, dispatch] = useDragons();
  const { dragons } = state;
  const [currentPage, setCurrentPage] = useState(1);
  const [dragonsPerPage] = useState(5);

  const auth = useAuth()
  
  dragons.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });

  const indexOfLastPost = currentPage * dragonsPerPage;
  const indexOfFirstPost = indexOfLastPost - dragonsPerPage;
  const currentDragons = dragons.slice(indexOfFirstPost, indexOfLastPost);
  
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const history = useHistory();
  const { path, url } = useRouteMatch();

  useEffect(() => {
    apiGetAllDragons().then(({ data }) => {
      dispatch(addDragons(data));
    });
  }, [dispatch]);

  return (
    <>
      <Content>
        <div>
          <AccountWrapper>
            <p>Hello, <User>{auth.user}</User>!</p>
            <Signout onClick={() => auth.signout()}>Signout</Signout>
          </AccountWrapper>
          <AddNewButton onClick={() => history.push(`${url}/add`)}>
            Add New Dragon
          </AddNewButton>
          {dragons.length === 0 && (
            <Message
              icon={<FiInbox size="1.5em" />}
              text="No dragons registered, start adding yours!"
            />
          )}
          {currentDragons.map(dragon => <ListItem key={dragon.id} {...dragon} />)}
        </div>
        <Pagination 
          currentPage={currentPage}
          itemsPerPage={dragonsPerPage} 
          totalItems={dragons.length}
          paginate={paginate}
        />
      </Content>
      <Switch>
        <Route path={`${path}/edit/:id`}>
          <Edit />
        </Route>
        <Route path={`${path}/details/:id`}>
          <Details />
        </Route>
        <Route path={`${path}/add`}>
          <AddNew />
        </Route>
        <Route path="/dashboard/*">
          <PageNotFound />
        </Route>
      </Switch>
    </>
  );
};

export default Dashboard;
