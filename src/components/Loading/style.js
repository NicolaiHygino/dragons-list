import styled , { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Background = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;

  width: 100%;
  height: 100%;
  background-color: rgba(57, 17, 91, .5);
  backdrop-filter: blur(2px);
`;

export const LoadingSpinner = styled.div`
  border: 5px solid white;
  border-top: 5px solid var(--main-color);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite;
`;
