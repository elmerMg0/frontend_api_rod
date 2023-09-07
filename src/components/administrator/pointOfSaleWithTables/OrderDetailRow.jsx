import React, { useContext } from "react";
import { DecrementIcon, PlusIcon, TrashIcon } from "../../icons/Icons";
import { OrderDetailContext } from "../../../context/orderDetail";
const OrderDetailRow = ({ product }) => {
  const {incrementProduct, decrementQuantityProduct, deleteProduct} = useContext(OrderDetailContext);
  return (
    <tr>
      <td>
        {" "}
        <button className="btn-main-red" onClick={() => deleteProduct(product)}>
         <TrashIcon color='#ffffff'/>
        </button>
      </td>
      <td style={{textAlign: 'center'}}>{product.cantidad}</td>
      <td>{product.nombre}</td>
      <td style={{ textAlign: "center" }}>{`${
        product.precio_venta * product.cantidad
      }`}</td>
      <td>{product.estado}</td>
      <td className="btns-quantity">
        <button onClick={() => incrementProduct(product)}>
          <PlusIcon/>
        </button>{" "}
        <button onClick={() => decrementQuantityProduct(product)}>
         <DecrementIcon/>
        </button>
      </td>
    </tr>
  );
};

export default OrderDetailRow;
