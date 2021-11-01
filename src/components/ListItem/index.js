import React from 'react';
import { useDragons } from 'context/Dragons';
import { deleteDragon } from 'context/Dragons/dragonsReducer';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { apiDeleteDragon } from 'services/api';
import { MdModeEdit, MdDelete } from 'react-icons/md';
import {
  Item,
  InfoWrapper,
  Name,
  Type,
  ButtonsWrapper,
  IconButton,
} from './style';

const ListItem = ({ id, name, type, createdAt }) => {
  const [, dispatch] = useDragons();

  let history = useHistory();
  const { url } = useRouteMatch();
  
  const handleDelete = () => {
    apiDeleteDragon(id).then(() => {
      dispatch(deleteDragon(id))
    })
    .catch(() => {
      dispatch(deleteDragon(id));
    });
  };

  return (
    <Item 
      data-testid="dragon-item"
      onClick={() => history.push(`${url}/details/${id}`)}
    >
      <InfoWrapper>
        <Name data-testid="dragon-item-name">{name}</Name>
        <Type>{type}</Type>
      </InfoWrapper>
      <ButtonsWrapper onClick={e => e.stopPropagation()}>
        <IconButton 
          aria-label="edit"
          onClick={() => history.push(`${url}/edit/${id}`)}
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

export default ListItem;
