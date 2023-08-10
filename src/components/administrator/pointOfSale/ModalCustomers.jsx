import { useRef, useState, useEffect } from 'react';
import { Modal, Form, InputGroup} from 'react-bootstrap';
const ModalCustomers = ( {show, onHide, customers, setCustomer}) => {
    const [customerSelected, setCustomerSelected] = useState('')

    const inputRef = useRef(null);
    const handleOnChange = (e) => {
        setCustomerSelected(e.target.value);
    }
    const handleOnSave = () => {
        setCustomer(customerSelected);
        onHide(false);
    }

    useEffect(() => {
        if (show) {
          inputRef.current.focus();
        }
      }, [show]);

    return (
    <Modal show={show} centered>
        <Modal.Header>
            <h5>Escriba el nombre del cliente</h5>
        </Modal.Header>
        <Modal.Body>
            <InputGroup>
                <Form.Control
                    placeholder='Nombre de cliente'
                    type='text'
                    onChange={handleOnChange}
                    name='customer'
                    ref={inputRef}
                />

            </InputGroup>
        </Modal.Body>
        <Modal.Footer>
            <button className='btn-main-red' onClick={() => onHide(false)}>Cancelar</button>
            <button className='btn-main' onClick={handleOnSave}>Guardar</button>
        </Modal.Footer>
    </Modal>
  )
}
export default ModalCustomers