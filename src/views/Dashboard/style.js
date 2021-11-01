import styled from 'styled-components';

export const Content = styled.section`
  position: relative;
  max-width: 500px;
  min-height: 500px;
  margin: 20px auto;
  padding: 10px;
  border-radius: 3px;
  background: white;

  @media screen and (max-width: 480px) {
    margin: 20px 10px;
  }
`;

export const AddNewButton = styled.button`
  background-color: var(--scd-color);
  width: 100%;
  font-weight: 600;
  color: white;
  border: 0;
  padding: 1em 1em;
  cursor: pointer;
  margin-bottom: 20px;
`;
