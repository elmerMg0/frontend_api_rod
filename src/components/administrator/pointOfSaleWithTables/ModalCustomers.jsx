import { useContext } from 'react';
import { useRef, useState, useEffect } from 'react';
import { Modal, Form, InputGroup} from 'react-bootstrap';
import { OrderDetailContext } from '../../../context/orderDetail';
const ModalCustomers = ( {show, onHide, customers}) => {
    const [customer, setCustomer] = useState({})
    const [customerFilter, setCustomerFilter] = useState([])
    const [customerInput, setCustomerInput] = useState('')
    const { setCustomerSelected } = useContext(OrderDetailContext)
    const inputRef = useRef(null);
  /*   const handleOnChange = (e) => {
        setCustomerSelected(e.target.value);
    } */
    const handleOnSave = () => {
        setCustomerSelected(customer);
        onHide(false);
    }

    const handleOnChange = (e) => {
        const value = e.target.value;
        setCustomerInput(value);
        setCustomerFilter(customers.filter( del => del.nombre.toLowerCase().includes(value.toLowerCase())));
        if(value === ''){
            setCustomerFilter([]);
        }
    }
    const handleDeliverySeleted = (del) => {
        setCustomerFilter([]);
        setCustomer(del);
        setCustomerInput(del.nombre);
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
           {/*  <InputGroup>
                <Form.Control
                    placeholder='Nombre de cliente'
                    type='text'
                    onChange={handleOnChange}
                    name='customer'
                    ref={inputRef}
                />

            </InputGroup> */}

            <InputGroup>
                <Form.Control
                    placeholder='Nombre de cliente'
                    type='text'
                    onChange={handleOnChange}
                    name='customerInput'
                    value={customerInput}
                    ref={inputRef}
                />
            {
                customerFilter?.length > 0 && 
            <div className='delivery-filtered'>
                {
                    customerFilter.map(del => <p key={del.id} onClick={() => handleDeliverySeleted(del)}>{del.nombre}</p>)
                }
            </div>
            }
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