import React, { useEffect, useState } from "react";
import { Modal, InputGroup, Form } from "react-bootstrap";

const initialState = {
  nombre: "",
  estado: "",
  habilitado: 0,
};

export const tableStates = {
    HABILITADO: 'habilitado',
    OCUPADO: 'ocupado',
    DISPONIBLE: 'disponible',
    CAMINO: 'camino'
}

const ModalEditTable = ({ show, onHide, tableToEdit, updateTable }) => {
  const [tableInfo, setTableInfo] = useState(initialState);

  const handleDelete = () => {
    updateTable(tableToEdit.id, {
        nombre: tableToEdit.nombre, 
        estado: tableStates.CAMINO,
        habilitado: 0,
    })
    onHide(false);
    setTableInfo(initialState)
  };
  const handleSave = () => {
    updateTable(tableToEdit.id, {
        nombre: tableInfo.nombre === '' ? tableToEdit.nombre: tableInfo.nombre, 
        estado: tableStates.DISPONIBLE,
        habilitado: 1,
    })
    onHide(false);
    setTableInfo(initialState)
  };
  const handleOnChange = (e) => {
    setTableInfo({ ...setTableInfo, [e.target.name]: e.target.value });
  };

  return (
    <Modal show={show} centered>
      <Modal.Header>
        <h5>Nuevo Salon</h5>
      </Modal.Header>
      <Modal.Body>
        <InputGroup>
          <InputGroup.Text>Nombre</InputGroup.Text>
          <Form.Control
            type="text"
            placeholder={tableToEdit.nombre}
            value={tableInfo.nombre}
            name="nombre"
            onChange={handleOnChange}
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn-main-red" onClick={handleDelete}>
          Eliminar
        </button>
        <button className="btn-main" onClick={handleSave}>
          Guardar
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEditTable;
