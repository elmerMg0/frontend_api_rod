import React from "react";
import { useDispatch } from "react-redux";
import {
  incrementQuantity,
  decreaseQuantity,
  deleteProduct,
} from "../../../redux/states/carrito";
import { DecrementIcon, PlusIcon, TrashIcon } from "../../icons/Icons";
import { color } from "../../../utilities/constans";
const OrderDetailRow = ({ product }) => {
  const dispatch = useDispatch();

  const handlePlusQuantity = () => {
    if(product.bebida && product.stock === 0){
      messageToastSucess('Stock Agotado');
      return;
    } 
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
          <TrashIcon color={color.WHITE}/>
        </button>
      </td>
      <td>{product.cantidad}</td>
      <td>{product.nombre}</td>
      <td style={{textAlign: 'right'}}>{`${product.precio_venta * product.cantidad}`}</td>
      <td className="btns-quantity">
        <button onClick={() => handlePlusQuantity()}>
          <PlusIcon/>
        </button>{" "}
        <button onClick={() => handleMinusQuantity()}>
          <DecrementIcon/>
        </button>
      </td>
    </tr>
  );
};

export default OrderDetailRow;
