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
        <button className="btn-add" onClick={() => onHide(false)}>
          No
        </button>
        <button className="btn-add" onClick={() => deleteSomething()}>
          Si
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConfirm;
