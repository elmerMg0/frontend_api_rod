import { useContext, useRef } from 'react';
import { AirplaneIcon, CustomerIcon, NoteIcon, TablesIcon } from '../../icons/Icons';
import { OrderDetailContext } from '../../../context/orderDetail';
import { Spinner } from 'react-bootstrap';
const PosBarLef = ({setShow, setShowPos, setShowNotes, getTables}) => {
  const {sendOrder, cleanTableInfo, loading } = useContext(OrderDetailContext)

  const handleShowTables = () => {
    setShowPos(false);
    cleanTableInfo();
    getTables();
  }
  const handleSendOrder = () => {
    if(!loading)sendOrder();
  }
  
  const handleOpenNote = () => {
      setShowNotes(true);
  }
  return (    
    <aside className="aside">
      <ul>
      
        <li onClick={handleSendOrder}>
          {
            loading ? 
            <div className='content-loader content-loaeder--send'>
              <Spinner variant='light' animation='border'/>
            </div>
            :
            <>
              <AirplaneIcon/>
              <p>Enviar</p>
            </>
          }
        </li>
       {/*  <li onClick={() => setShow(true)}>
         <CustomerIcon/>
          <p>Cliente</p>    
        </li> */}
        <li onClick={() => handleShowTables()}>
          <TablesIcon/>
          <p>Mesas</p>
        </li>
        <li onClick={() => handleOpenNote()}>
        <NoteIcon/>
          <p>Nota</p>
        </li>
      </ul>
    </aside>
  )
}
export default PosBarLef