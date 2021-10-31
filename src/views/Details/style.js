import styled from 'styled-components';

export const Name = styled.h3`
  font-size: 1.8em;
  text-align: center;
`;

export const Type = styled.p`
  text-align: center;
  font-size: .9rem;
  color: white;
  
  & span {
    background-color: var(--main-color);
    padding: 0 3px;
  }
`;

export const Histories = styled.p`
  margin: 15px 0;
`;
