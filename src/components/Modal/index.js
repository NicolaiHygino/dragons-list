import React from 'react';
import { useHistory } from 'react-router';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import {
  Background,
  StyledModal,
  Header,
  Content,
  BackButton,
} from './style';

const Modal = ({ title, children }) => {
  let history = useHistory();

  return (
    <Background onClick={() => history.push('/')}>
      <StyledModal onClick={e => e.stopPropagation()}>
        <Header>
          <h2>{title}</h2>
          <BackButton onClick={() => history.push('/')}>
            <HiOutlineArrowNarrowLeft /> Back
          </BackButton>
        </Header>
        <Content>
          { children }
        </Content>
      </StyledModal>
    </Background>
  );
};

export default Modal;
