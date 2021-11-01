import styled from 'styled-components';

export const Content = styled.section`
  position: relative;
  max-width: 500px;
  min-height: 530px;
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

export const AccountWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

export const User = styled.span`
  color: var(--main-color);
`;

export const Signout = styled.button`
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
