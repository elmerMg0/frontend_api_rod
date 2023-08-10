import React, { useState, useEffect} from "react";
import { Modal} from "react-bootstrap";
import { Form, InputGroup } from "react-bootstrap";

const initialState = {
  nombre:'',
  celular: '',
  direccion: '',
  descripcion_domicilio:''
}

const UserModal = ({ show, setShow, create, customerToEdit, setCustomerToEdit ,updateCustomer}) => {

  const [customer, setCustomer] = useState(initialState)


  useEffect ( ( ) => {
    if(Object.keys(customerToEdit).length !== 0){
      setCustomer(customerToEdit) 
    }else{
      setCustomer(initialState)
    }
  },[show])

  const handleConfirm = () => {
    setShow(false);
    if( !customer.id ){
      create(customer);
    }else{
      updateCustomer(customer);
    }
    setCustomerToEdit({})
  }
  const handleOnChange = (e) => {
    setCustomer({
      ...customer, 
      [e.target.name]:e.target.value
    })
  }

  const handleCancel = () => {
    setShow(false)
    setCustomerToEdit({})
  }

  return (
    <Modal show={show} size="md" centered backdrop>
      <Modal.Header>
        <Modal.Title>
          <h5>Crear Nuevo Cliente</h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body >
        <InputGroup className="mb-3">
          <InputGroup.Text>Nombre</InputGroup.Text>
          <Form.Control 
            placeholder="Nombre"
            type="text"
            onChange={handleOnChange}
            name='nombre'
            value={customer.nombre}
            required
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Celular</InputGroup.Text>
          <Form.Control 
            placeholder="Celular"
            type="number"
            onChange={handleOnChange}
            name='celular'
            value={customer.celular}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Dirección</InputGroup.Text>
          <Form.Control 
            placeholder="Dirección"
            type="text"
            onChange={handleOnChange}
            name='direccion'
            value={customer.direccion}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Descripción domicilio</InputGroup.Text>
          <Form.Control 
            placeholder="Descripción domicilio"
            type="text"
            onChange={handleOnChange}
            name='descripcion_domicilio'
            value={customer.descripcion_domicilio}
          />
        </InputGroup>

      </Modal.Body>
      <Modal.Footer >
        <button onClick={()=> handleCancel()} className='btn-main-red'>Cancelar</button>
        <button onClick={handleConfirm} className="btn-main">Confirmar</button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserModal;
