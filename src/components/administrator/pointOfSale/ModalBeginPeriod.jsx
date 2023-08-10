import {Modal} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createView } from '../../../redux/states/dashboard';
const ModalBeginPeriod = ({show}) => {
  
  const dispatch = useDispatch();

  const handleRedirectPeriod = () => {
    window.localStorage.setItem("view", 'period');
    dispatch(createView('period'));
  }
  
  return (
    <Modal show={show} centered>
        <Modal.Header>
            <h5>Inicia Periodo</h5>
        </Modal.Header>
        <Modal.Body>
          No existe un periodo de trabajo activo, inicia un periodo de trabajo.
        </Modal.Body>
        <Modal.Footer>
            <button className='btn-main' onClick={handleRedirectPeriod}>Iniciar Periodo</button>
        </Modal.Footer>
    </Modal>

  )
}
export default ModalBeginPeriod