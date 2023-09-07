import React, { useContext, useEffect, useState } from "react";
import OrderDetailRow from "./OrderDetailRow";
import { CalendarIcon, ClockIcon } from "../../icons/Icons";
import { OrderDetailContext } from "../../../context/orderDetail";
const PosAcount = ( ) => {
  const [dateCurrently, setDateCurrently] = useState("");
/*   const orderDetail = useSelector( state => state.carrito.orderDetail); */
/*   const [totalPrice, setTotalPrice] = useState(0); */
const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
const { orderDetail, infoCollectMoney, customerSelected, infoSale } = useContext(OrderDetailContext);
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
            <CalendarIcon/>
            {dateCurrently}
          </div>
          <div className="pos-account__time">
            <ClockIcon/>
            {currentTime}
          </div>
          <p>{ infoSale.nombre?? 'Generico'}</p>
      
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
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orderDetail?.length > 0 ? (
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
              <td colSpan={6}>No existen pedidos</td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
      <div className="pos-acount__accumulated">
        <h5>Total (Bs.)</h5>
        <h5>{infoCollectMoney.totalPrice}</h5>
      </div>
    </div>
  );
};

export default PosAcount;
