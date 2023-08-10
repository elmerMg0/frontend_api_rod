import React from "react";
import { Modal } from "react-bootstrap";
const ModalConfirm = ({ show, onHide, deleteSomething, message }) => {
  return (
    <Modal show={show} centered>
      <Modal.Header>
        <Modal.Title>
          <h3>Advertencia</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn-main-red" onClick={() => onHide(false)}>
          Cancelar
        </button>
        <button className="btn-main" onClick={() => deleteSomething()}>
          Aceptar
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConfirm;
