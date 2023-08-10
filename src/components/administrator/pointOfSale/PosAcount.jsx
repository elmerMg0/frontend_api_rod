import React, { useEffect, useState } from "react";
import calendar from "../../../assets/svg/calendar.svg";
import clock from "../../../assets/svg/clock.svg";
import OrderDetailRow from "./OrderDetailRow";
import { useSelector } from 'react-redux'
const PosAcount = ( { totalPrice, accumulate, customer} ) => {
  const [dateCurrently, setDateCurrently] = useState("");
  const orderDetail = useSelector( state => state.carrito.orderDetail);
/*   const [totalPrice, setTotalPrice] = useState(0); */
const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
 
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    setDateCurrently(new Date().toLocaleDateString())
    return () => clearInterval(interval);
  }, []);


  return (
    <div className="pos-acount">
      <div className="pos-acount-row">
        <div colSpan={4} className="pos-acount__header">
          <div className="pos-account__time">
            <img src={calendar} alt="fecha" />
            {dateCurrently}
          </div>
          <div className="pos-account__time">
            <img src={clock} alt="hora" />
            {currentTime}
          </div>
        {/*   <h5>{customer ? customer: 'Generico'}</h5> */}
        {
          customer.length > 0 ? <p>{customer}</p> : <p>Genérico</p>
        }
        </div>
      </div>
      <div className="pos-acount__scroll">
      <table className="pos-acount__table">
        <thead>
          <tr>
            <th></th>
            <th>Can</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orderDetail && orderDetail.length > 0 ? (
            orderDetail.map((prod) => {
              return (
                <OrderDetailRow
                  key={`${prod.id + prod.nombre}`}
                  product={prod}
                />
              );
            })
          ) : (
            <tr>
              <td colSpan={5}>No existen pedidos</td>
            </tr>
          )}
          <tr>
              <td colSpan={5}>
                <div className='pos-acount__footer'>
                  <h5>Total (Bs.)</h5>
                  <h5>{totalPrice}</h5>
                </div>
              </td>
            </tr>
        </tbody>
      </table>
      </div>
      <div className="pos-acount__accumulated">
        <h5>Acumulado (Bs.)</h5>
        <h5>{accumulate}</h5>
      </div>
    </div>
  );
};

export default PosAcount;
