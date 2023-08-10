import React from "react";
import plus from "../../../assets/svg/plus.svg";
import minus from "../../../assets/svg/minus.svg";
import { useDispatch } from "react-redux";
import {
  incrementQuantity,
  decreaseQuantity,
  deleteProduct,
} from "../../../redux/states/carrito";
import trash from "../../../assets/svg/trash.svg";
const OrderDetailRow = ({ product }) => {
  const dispatch = useDispatch();

  const handlePlusQuantity = () => {
    dispatch(incrementQuantity(product));
  };

  const handleMinusQuantity = () => {
    dispatch(decreaseQuantity(product));
  };

  const handleDeleteProduct = () => {
    dispatch(deleteProduct(product))
  }

  return (
    <tr>
      <td>
        {" "}
        <button className="btn-main-red" onClick={handleDeleteProduct}>
          <img src={trash} alt="" />
        </button>
      </td>
      <td>{product.cantidad}</td>
      <td>{product.nombre}</td>
      <td style={{textAlign: 'right'}}>{`${product.precio_venta * product.cantidad}`}</td>
      <td className="btns-quantity">
        <button onClick={() => handlePlusQuantity()}>
          <img src={plus} alt="" />
        </button>{" "}
        <button onClick={() => handleMinusQuantity()}>
          <img src={minus} alt="" />
        </button>
      </td>
    </tr>
  );
};

export default OrderDetailRow;
