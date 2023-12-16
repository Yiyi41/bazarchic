import React from "react";

import {
  ModalClose,
  ModalContainer,
  ModalContent,
  ModalMessage
} from "./Styles";

interface ModalProps {
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Modal({ modalIsOpen, setModalIsOpen }: ModalProps) {
  function slideModalOut() {
    setModalIsOpen(!modalIsOpen);
  }

  return (
    <ModalContainer>
      <ModalContent>
        <ModalClose onClick={slideModalOut}>&times;</ModalClose>
        <ModalMessage>Please enter an exisisting city 😉</ModalMessage>
      </ModalContent>
    </ModalContainer>
  );
}

export default Modal;
