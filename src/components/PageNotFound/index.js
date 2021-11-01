import React from 'react';
import Modal from 'components/Modal';
import Message from 'components/Message';
import { BiError } from 'react-icons/bi';

const PageNotFound = () => {
  return (
    <Modal>
      <Message
        icon={<BiError size="2em" />}
        text="Page does not exists"
      />
    </Modal>
  );
};

export default PageNotFound;
