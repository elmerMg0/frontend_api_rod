import React from "react";
import { Modal } from "react-bootstrap";
import { messages } from "../Main";
const ModalConfirm = ({ show, onHide, deleteSomething, message }) => {
  return (
    <Modal show={show} centered>
      <Modal.Header>
        <Modal.Title>
          {
            message === messages.SMSSUCCES ? 
            <h3>Gracias. </h3>
            :
            <h3>Alerta </h3>
          }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn-add" onClick={() => onHide(false)}>
          Cerrar
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConfirm;
