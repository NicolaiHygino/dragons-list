import React from 'react';
import styled from 'styled-components';

const MessageWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 30px 0;
  color: #A5A0AC;
`;

const TextMessage = styled.p`
  font-weight: 600;
  font-size: .9em;
  text-align: center;
`;

const Message = ({ text, icon }) => {
  return (
    <MessageWrapper>
      {icon}
      <TextMessage>{text}</TextMessage>
    </MessageWrapper>
  )
};

export default Message;
