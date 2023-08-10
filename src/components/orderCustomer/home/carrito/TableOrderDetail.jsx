import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import trashRed from "../../../../assets/svg/trashRed.svg";
import { useEffect, useState } from "react";
import { decrementQuantity, deleteProduct, incrementQuantity } from "../../../../redux/states/carritoUser";
import ModalConfirm from "../../../global/modal/ModalConfirm";
import ModalSendDetail from "./ModalSendDetail";
const TableOrderDetail = () => {
  const orderDetail = useSelector((store) => store.carritoUser);
  const dispatch = useDispatch();
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    getTotalPrice();
  }, [orderDetail]);

  const getTotalPrice = () => {
    if (orderDetail) {
      setTotalPrice(
        orderDetail.reduce((ac, val) => ac + val.cantidad * val.precio_venta, 0)
      );
    }
  };

  const handleDeleteProduct = (prod) => {
    setProductToDelete(prod.id);
    setShowModalConfirm(true);
  };
  const deleteProductCarrito = () => {
    dispatch(deleteProduct(productToDelete));
    setShowModalConfirm(false);
  };

  const handleIncrement = (prod) => {
    dispatch(incrementQuantity(prod.id))
  };

  const handleDecrement = (prod) => {
    if(prod.cantidad > 1){
      dispatch(decrementQuantity(prod.id))
    }
  };

  const handleOnChange = () => {};

  return (
    <Table className="contenedor" style={{width: '90%'}}>
      <thead>
        <tr>
          <th style={{textAlign: 'center'}}>Cant.</th>
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
                    <button onClick={() => handleDecrement(prod)}>-</button>
                    <input
                      type="number"
                      value={prod.cantidad}
                      onChange={handleOnChange}
                      placeholder="0"
                    />
                    <button onClick={() => handleIncrement(prod)}>+</button>
                  </div>
                </td>
                <td>{prod.nombre}</td>
                <td style={{ textAlign: "right" }}>{`${
                  prod.precio_venta * prod.cantidad
                },00`}</td>
                <td>
                  
                  <img
                    src={trashRed}
                    alt="icon editar"
                    onClick={() => handleDeleteProduct(prod)}
                  />
                </td>
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
              <h5>Total (Bs.)</h5>
              <h5>{totalPrice}</h5>
            </div>
          </td>
        </tr>
      </tbody>
      <ModalConfirm
        show={showModalConfirm}
        onHide={setShowModalConfirm}
        deleteSomething={deleteProductCarrito}
        message="Esta seguro de eliminar este producto?"
      />
    </Table>
  );
};
export default TableOrderDetail;
