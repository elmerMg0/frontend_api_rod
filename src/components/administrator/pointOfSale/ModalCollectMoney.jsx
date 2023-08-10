import React, { useEffect,useRef } from "react";
import { Modal } from "react-bootstrap";

const ModalCollectMoney = ({
  showModal,
  totalPrice,
  setShowModal,
  createSale,
  setPayType,
  totalPaid, 
  setTotalPaid,
  change, 
  setChange,
}) => {

  const inputRef = useRef(null);
  const handleChangeMoney = (e) => {
    const paid = e.target.value; 
    setTotalPaid(paid);
    paid > totalPrice ? setChange(paid - totalPrice): setChange(0)

  };

  useEffect(() => {
    if(showModal){
      inputRef.current.focus();
    }
  },[showModal])
  const handleAcceptSale = () => {
    if( totalPaid >= totalPrice){
      createSale();
    }else{
      /* sms pago insuficiente */
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    //setTotalPaid(0)
    setChange(0)
    setPayType('')
  }
  return (
    <Modal show={showModal} centered>
      <Modal.Header>
        <Modal.Title>Cuenta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Metodo de pago</h5>
        <div className="options-pay">
          <label>
            Efectivo
            <input
              name="payType"
              type="radio"
              onChange={() => setPayType("efectivo")}
            />
          </label>
          <label>
            Transferencia
            <input
              name="payType"
              type="radio"
              onChange={() => setPayType("transferencia")}
            />
          </label>
          <label>
            Tarjeta
            <input
              name="payType"
              type="radio"
              onChange={() => setPayType("tarjeta")}
            />
          </label>
        </div>
        <table>
          <thead>
            <tr>
              {/* <th></th>
                        <th></th> */}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={2}>
                <div className="pos-acount__footer">
                  <h5>Total (Bs.)</h5>
                  <h5>{totalPrice}</h5>
                </div>
              </td>
            </tr>
            <tr style={{backgroundColor: 'white'}}>
              <td colSpan={2}>
                <div className="pos-acount__footer">
                  <h5>Pago (Bs.)</h5>
                  <input
                    style={{margin: '0'}}
                    className="pos-acount__change"
                    //value={paid}
                    value={totalPaid}
                    type="number"
                    placeholder="0"
                    onChange={handleChangeMoney}
                    ref={inputRef}
                    //onChange={(e) => setTotalPaid(e.target.value)}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <div className="pos-acount__footer">
                  <h5>Vuelto: (Bs.)</h5>
                  <h5>{change}</h5>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
  
      </Modal.Body>
      <Modal.Footer>
        <button className="btn-main-red" onClick={handleCancel}>
          Cancelar
        </button>
        <button className="btn-main" onClick={handleAcceptSale}>
          Aceptar
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCollectMoney;
