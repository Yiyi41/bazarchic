import React, { useEffect } from "react";

import {
  ModalClose,
  ModalContainer,
  ModalContent,
  ModalMessage
} from "./Styles";
import { WeatherDataType } from "../util/types";

interface ModalProps {
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Modal({ modalIsOpen, setModalIsOpen }: ModalProps) {
  console.log("before click", modalIsOpen);
  const handleClose = () => {
    console.log("clicked");
    setModalIsOpen(false);
  };

  useEffect(() => {
    console.log("after click", modalIsOpen);
  }, [modalIsOpen]);

  return (
    <ModalContainer $display={modalIsOpen ? "auto" : "none"}>
      <ModalContent>
        <ModalClose onClick={handleClose}>&times;</ModalClose>
        <ModalMessage>Please enter an exisisting city 😉</ModalMessage>
      </ModalContent>
    </ModalContainer>
  );
}

export default Modal;
