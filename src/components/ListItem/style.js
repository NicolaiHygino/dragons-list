import styled from 'styled-components';

export const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--bg-color);
  margin-bottom: 10px;
  border-radius: 2px;
  padding: 10px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 1px 4px 0 rgba(0, 0, 0, 0.1);
  transition: all ease 0.1s;
  cursor: pointer;

  &:hover {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 1px 6px 0 rgba(0, 0, 0, 0.2);
  }
`;

export const InfoWrapper = styled.div`

`;

export const Name = styled.h2`
  font-size: 1.4em;
`;

export const Type = styled.span`
  background-color: var(--main-color);
  padding: 0 3px;
  font-size: .9rem;
  color: white;
`;

export const Histories = styled.p`
  color: #333;
  font-size: 1.1em;
`;

export const StyledDate = styled.p`
  color: #333;
  font-size: .9em;
`;

export const ButtonsWrapper = styled.div`
  
`;

export const IconButton = styled.button`
  box-shadow: 0 1px 3px 0 rgba(26, 24, 29, .1), 0 1px 2px 0 rgba(26, 24, 29, .1);
  border: 0;
  cursor: pointer;
  background-color: white;
  color: #4e4a57;
  border-radius: 3px;
  padding: .6em .8em;
  margin-left: 10px;
  transition: all ease .2s;

  &:hover {
    color: var(--main-color);
    box-shadow: 0 2px 6px 0 rgba(26, 24, 29, .1), 0 2px 4px 0 rgba(26, 24, 29, .1);
  }
`;
