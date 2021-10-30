import styled, { keyframes } from 'styled-components';

const firstRender = keyframes`
  from {
    top: -30px;
  }

  to {
    top: 0px;
  }
`;

export const Background = styled.div`
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;

  background-color: rgba(7, 118, 66, .3);
`;

export const StyledModal = styled.section`
  position: relative;
  max-width: 300px;
  background-color: white;
  border-radius: 5px;
  margin: 30px auto;

  animation: ${firstRender} .5s ease;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: var(--scd-color);
  color: white;
  border-bottom-right-radius: 30px;
`;

export const Content = styled.div`
  padding: 10px;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  border: 0;
  background: transparent;
  color: white;
  cursor: pointer;
`;
