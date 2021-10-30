import styled from 'styled-components';

export const Content = styled.section`
  max-width: 500px;
  margin: 30px auto;
  padding: 10px;
  border-radius: 3px;
  background: #edecee;
`;

export const Item = styled.div`
  background: white;
  margin-bottom: 20px;
  border-radius: 2px;
  padding: 10px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1), 0 1px 4px 0 rgba(0, 0, 0, 0.1);
  transition: all ease 0.1s;
  cursor: pointer;

  &:hover {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 1px 6px 0 rgba(0, 0, 0, 0.2);
  }
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