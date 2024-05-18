import React from 'react';
import Modal from 'react-bootstrap/Modal';
import './modal.scss';
import { IoClose } from "react-icons/io5";

const ModalPopup = ({modalTitle,modalShow,modalHide,children}) => {

  //close the modal
  const handleClose = () => {
    modalHide();
  };

  return (
    <Modal show={modalShow} centered size='lg'>
      <Modal.Header closeButton={false}>
          <Modal.Title>{modalTitle}</Modal.Title>
          <IoClose onClick={handleClose}/>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
    </Modal>
  )
}

export default ModalPopup;