import React from 'react';
import { Modal } from 'rsuite';


export const ModalWindow = ({ title, description, show, close, onConfirm, hasBottom }) => {
  return (
    <div className="modal-container">
      <Modal show={show} onHide={close}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {description}
        </Modal.Body>
      </Modal>
    </div>
  )
}