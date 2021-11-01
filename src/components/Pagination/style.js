import styled from 'styled-components';

export const ButtonsWrapper = styled.section`
  margin-top: auto;
  width: 100%;
`;

export const Button = styled.button`
  margin: 0 3px;
  border: 0;
  padding: .6em 1em;
  border-radius: 3px;
  box-shadow: 0 1px 3px 0 rgba(26, 24, 29, .1), 0 1px 2px 0 rgba(26, 24, 29, .1);
  cursor: pointer;
  transition: all ease .2s;

  &.active {
    background-color: var(--scd-color);
    color: white;
    box-shadow: 0 2px 6px 0 rgba(26, 24, 29, .1), 0 2px 4px 0 rgba(26, 24, 29, .1);
  }
`;