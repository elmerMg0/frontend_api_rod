import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal, Table } from "react-bootstrap";
import LoadingRed from "../loader/LoadingRed";
const initialState = {
  delivery: true,
  pickup: false,
  rightnow: true,
  after: false,
  address: "",
  description: "",
  day: "",
  hour: "",
  nombre: '',
  phone: '',
};
const values = {
  DELIVERY: "delivery",
  PICKUP: "pickup",
  RIGHTNOW: "rightnow",
  AFTER: "after",
};
const errorInputs = {
  address: false,
  name: false,
  day: false,
  hour: false,
  nombre: false,
  phone: false
};

const messageError = "*Este campo es requerido"

const ModalSendDetail = ({ show, setShow, infoBussines, sendOrder, showSpinner, active, setShowModalSuccess }) => {
  const [infoDetailSale, setInfoDetailSale] = useState(initialState);
  const [nroView, setNroView] = useState(1);
  const orderDetail = useSelector((store) => store.carritoUser);
  const [totalPrice, setTotalPrice] = useState(0);
  const [inputsRequired, setInputsRequired] = useState(errorInputs);

  useEffect(() => {
    getTotalPrice();
  }, []);

  const getTotalPrice = () => {
    if (orderDetail) {
      setTotalPrice(
        orderDetail.reduce((ac, val) => ac + val.cantidad * val.precio_venta, 0)
      );
    }
  };

  const handleOnChange = (e) => {
    let updated = {};
    if (e.target.name === values.RIGHTNOW) {
      updated = {
        rightnow: true,
        after: false,
      };
    } else {
      updated = {
        rightnow: false,
        after: true,
      };
    }
    setInfoDetailSale({ ...infoDetailSale, ...updated });
  };

  const handleOnChangePay = (e) => {
    let updated = {};
    if (e.target.name === values.DELIVERY) {
      updated = {
        delivery: true,
        pickup: false,
      };
    } else {
      updated = {
        delivery: false,
        pickup: true,
      };
    }
    setInfoDetailSale({ ...infoDetailSale, ...updated });
  };

  const handleOnChangeInput = (e) => {
    setInfoDetailSale({ ...infoDetailSale, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    console.log(infoDetailSale);
    if (infoDetailSale.address === "" && infoDetailSale.pickup === false) {
      setInputsRequired({ ...inputsRequired, ...{ address: true } });
    } else {
      setInputsRequired({ ...inputsRequired, ...{ address: false } });
      setNroView(2);
    }
  };

  const handleSendOrder = () => {
    if(active){
      if(infoDetailSale.nombre === '' ){
        setInputsRequired({ ...inputsRequired, ...{ nombre: true } });
        return;
      }
      sendOrder(infoDetailSale, totalPrice);
    }else{
      setShow(false)
      setShowModalSuccess(true);
    }
  };

  const address = (
    <div className={ infoDetailSale.delivery ? 'modal-send-detail__address active-delivery': "modal-send-detail__address "}>
      <div>
        <h5 htmlFor="address">Direccion de Entrega*</h5>
        <input
          type="text"
          id="address"
          name="address"
          value={infoDetailSale.address}
          onChange={handleOnChangeInput}
        />
        {inputsRequired.address && (
          <p className="sms-error">{messageError}</p>
        )}
      </div>
      <div>
        <h5 htmlFor="description">Aclaración de dirección</h5>
        <textarea
          placeholder="Casa de color naranja, puerta cafe..."
          type="text"
          id="description"
          name="description"
          value={infoDetailSale.description}
          onChange={handleOnChangeInput}
        ></textarea>
      </div>{" "}
    </div>
  );

  const timeDelivery = (
    <div className={ `modal-choose-hour ${infoDetailSale.after ? "active-timer": ''}`}>
      <div className="modal-order__time">
        <h5 htmlFor="hora">Hora</h5>
        <input
          type="time"
          name="hour"
          value={infoDetailSale.hour}
          onChange={handleOnChangeInput}
        />
      </div>
      <p className="sms-error">
        Horario de atención: {infoBussines.horario_atencion}
      </p>
    </div>
  );

  const view1 = (
    <>
      <div className="modal-send-detail__delivery">
        <h5>Forma de entrega</h5>
        <div className="modal-send-delivery__inputs">
          <div>
            <input
              type="checkbox"
              name="delivery"
              checked={infoDetailSale.delivery}
              value={infoDetailSale.delivery}
              onChange={handleOnChangePay}
              id='delivery'
            />
            <label htmlFor="delivery">Delivery</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="pickup"
              id='pickup'
              checked={infoDetailSale.pickup}
              value={infoDetailSale.pickup}
              onChange={handleOnChangePay}
            />
            <label htmlFor="pickup">Recojo</label>
          </div>
        </div>
      </div>

      <div className="modal-send-detail__delivery">
        <h5>Recibir la orden</h5>
        <div className="modal-send-delivery__inputs">
          <div>
            <input
              type="checkbox"
              name="rightnow"
              value={infoDetailSale.rightnow}
              onChange={handleOnChange}
              checked={infoDetailSale.rightnow}
            />
            <label htmlFor="">Ahora mismo</label>
          </div>

          <div>
            <input
              type="checkbox"
              name="after"
              value={infoDetailSale.after}
              checked={infoDetailSale.after}
              onChange={handleOnChange}
            />
            <label htmlFor="">Programar entrega</label>
          </div>
        </div>
      </div>
      {timeDelivery}
      {address}
   {/*    {infoDetailSale.delivery ? (
        address
      ) : (
        <div className="address-order">
          <h5>Direccion de recojo</h5>
          <p>{infoBussines.direccion}</p>
        </div>
      )} */}
        <div className="address-order">
          <h5>Direccion de recojo</h5>
          <p>{infoBussines.direccion}</p>
        </div>

      <button className="next" onClick={handleNext}>
        Siguiente
      </button>
    </>
  );

  return (
   /*  <div className="modal-send-bg"> */
      <Modal show={show} centered /* className="modal-send-detail" */ >
        <section className="modal-main">
        <div className="modal-send-detail__header">
          <div className="modal-send-detail__header-btns">
            <button
              className={nroView === 1 ? "modal-btn__flag" : ""}
              onClick={() => setNroView(1)}
            >
              1
            </button>
            <button
              className={nroView === 2 ? "modal-btn__flag" : ""}
              onClick={() => setNroView(2)}
            >
              2
            </button>
          </div>
          <span className="btn-close" onClick={() => setShow(false)}></span>
        </div>

        {nroView === 1 && view1}
        {nroView === 2 && (
          <div className={ orderDetail.length > 5 ? "modal-send-order__table": ''}>
            <div className="modal-send-detail__infouser">
              <div>
                <h5 htmlFor="name">Nombre</h5>
                 <input type="text" name="nombre" value={infoDetailSale.nombre} onChange={handleOnChangeInput}/>
                {inputsRequired.nombre && <p className="sms-error">{messageError}</p>}
              </div>
              <div>
                <h5 htmlFor="phone">Teléfono*</h5>
                <input type="tel" placeholder={infoBussines.celular} value={infoDetailSale.phone} name='phone' onChange={handleOnChangeInput}/>
                {inputsRequired.phone && <p className="sms-error">{messageError}</p>}
              </div>
            </div>
            <h5 style={{marginTop: '15px', fontSize: '16px'}}>Resumen del Pedido</h5>
            <Table>
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>Cant.</th>
                  <th>Producto</th>
                  <th style={{ textAlign: "right" }}>Precio</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orderDetail && orderDetail.length > 0 ? (
                  orderDetail.map((prod) => {
                    return (
                      <tr key={prod.id}>
                        <td style={{ textAlign: "center" }}>
                          <div className="table-column-cant">
                            <input
                              style={{ border: "none" }}
                              type="number"
                              value={prod.cantidad}
                              onChange={handleOnChange}
                              placeholder="0"
                            />
                          </div>
                        </td>
                        <td>{prod.nombre}</td>
                        <td style={{ textAlign: "right" }}>{`${
                          prod.precio_venta * prod.cantidad
                        },00`}</td>
                        <td></td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={3}>Aun no tienes pedidos</td>
                  </tr>
                )}
                <tr>
                  <td colSpan={4}>
                    <div className="table-total-row">
                      <h5 style={{fontSize: '16px'}}>Total (Bs.)</h5>
                      <h5>{totalPrice}</h5>
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>
            <div className="modal-order__confirm">
              <button className="next" onClick={handleSendOrder}>
                Confirmar Pedido
              </button>
              {
                showSpinner &&   <LoadingRed/> 
              }
            </div>
          </div>
        )}
        </section>

      </Modal>
  /*   </div> */
  );
};
export default ModalSendDetail;
