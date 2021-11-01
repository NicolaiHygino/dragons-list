import styled, { keyframes } from 'styled-components';

const firstRender = keyframes`
  from {
    top: -30px;
    opacity: 0;
  }

  to {
    top: 0px;
    opacity: 1;
  }
`;

export const Background = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;

  background-color: rgba(57, 17, 91, .5);
  backdrop-filter: blur(2px);
`;

export const StyledModal = styled.section`
  position: relative;
  max-width: 300px;
  background-color: white;
  border-radius: 8px;
  margin: 30px auto;

  animation: ${firstRender} .3s ease;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: var(--scd-color);
  color: white;
`;

export const Content = styled.div`
  padding: 20px 10px;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  border: 0;
  background: transparent;
  color: white;
  cursor: pointer;
`;
