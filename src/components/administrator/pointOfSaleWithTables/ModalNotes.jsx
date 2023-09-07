import React, { useEffect , useState } from 'react'
import { useContext } from 'react'
import { Form, Modal } from 'react-bootstrap'
import { OrderDetailContext } from '../../../context/orderDetail'

const ModalNotes = ({show, onHide}) => {
  
  const { setInfoSale } = useContext(OrderDetailContext)
  const [inputNote, setInputNote] = useState('')

  const inputRef = React.useRef(null)

  useEffect(() => {
    if(show){
      inputRef.current.focus();
    }
  },[show])

  const handleAccept = () => {
    setInfoSale(prevState => ({...prevState, nota: inputNote}));
    onHide(false);
  }
  return (
    <Modal show={show} centered>
        <Modal.Header>
          <h5>Agregar una nota</h5>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type='text'
            placeholder='agregue una nota'
            onChange={(e) => setInputNote(e.target.value)}
            name='inputNote'
            ref={inputRef}
          />
        </Modal.Body>
        <Modal.Footer>
            <button className='btn-main-red' onClick={() => onHide(false)}>Cancelar</button>
            <button className='btn-main' onClick={() => handleAccept()}>Aceptar </button>
        </Modal.Footer>
    </Modal>
  )
}

export default ModalNotes