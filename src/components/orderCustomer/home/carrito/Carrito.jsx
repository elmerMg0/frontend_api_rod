import TableOrderDetail from "./TableOrderDetail";
import "../../../../styles/carrito/carrito.css";
import ModalSendDetail from "./ModalSendDetail";
import { useEffect, useState } from "react";
import { APISERVICE } from "../../../../services/api.services";
import { useDispatch, useSelector } from "react-redux";
import { deleteCarritoUser } from "../../../../redux/states/carritoUser";
import { messages } from "../Main";

const Carrito = ({ setShowProducts, setShowModalSuccess, setMessageModal, active}) => {
  const [showModalUserDetail, setShowModalUserDetail] = useState(false);
  const [infoBussines, setInfoBussines] = useState({});
  const orderDetail = useSelector((store) => store.carritoUser);
  const dispatch = useDispatch();
  const [showSpinner, setShowSpinner] = useState(false)
  useEffect(() => {
    getBussinesInfo();
  }, []);

  const getBussinesInfo = async () => {
    const url = "empresa/get-company";
    const { success, data } = await APISERVICE.get(url);
    if (success) {
      setInfoBussines(data);
    }
  };

  const sendOrder = async (data, total) => {
    setShowSpinner(true);
    const infoOrder = {
      tipo_entrega: data.delivery ? "delivery" : "recojo",
      hora: data.hour === "" ? "Ahora mismo" : data.hour,
      direccion: data.address,
      descripcion_direccion: data.description,
      nombre: data.nombre,
      telefono: data.phone,
      orderDetail: orderDetail,
      tipo: "pedidoApp",
      estado: "pendiente",
      cantidadTotal: total,
      cantidadPagada: total,
      tipoPago: "efectivo",
    };
    const url = "api/create";
    const { success } = await APISERVICE.post(infoOrder, url);
    if(success){
      setMessageModal(messages.SMSSUCCES)
      setShowModalUserDetail(false);
      dispatch(deleteCarritoUser())
      setShowProducts(true);
      setShowModalSuccess(true);
    }else{

    }
    setShowSpinner(false)
  };


  return (
    <>
      <div className="contenedor">
        <h5 className="carrito-title">{orderDetail.length > 0 ? "Resumen de pedido":"Tu carrito esta vacio"}</h5>
      </div>

      {orderDetail.length > 0 ? (
        <>
          <TableOrderDetail />
          <div className="carrito-btn-continue contenedor">
            <button onClick={() => setShowModalUserDetail(true)}>
              Continuar
            </button>
          </div>
        </>
      ) : (
        <div className="carrito-btn-continue contenedor">
            <button className="carrito-btn-continue" onClick={() => setShowProducts(true)}>Ve al menú</button>
          </div>
      )}

      {showModalUserDetail && (
        <ModalSendDetail
          show={showModalUserDetail}
          setShow={setShowModalUserDetail}
          infoBussines={infoBussines}
          sendOrder={sendOrder}
          showSpinner={showSpinner}
          active={active}
          setShowModalSuccess={setShowModalSuccess}
        />
      )}
    </>
  );
};
export default Carrito;
