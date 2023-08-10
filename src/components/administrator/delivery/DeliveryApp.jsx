import { useEffect, useState } from "react";
import "../../../styles/administracion/delivery.css";
import OrderTable from "./OrderTable";
import { useSelector } from "react-redux";
import { APISERVICE } from "../../../services/api.services";
import PdfOrder from "./PdfOrder";
import ModalOrderDetail from "./ModalOrderDetail";

export const typesShow = {
  MODAL: 'modal',
  PDF: 'pdf'
}
export const typeTicketExists = {
  COCINA: 'cocina',
  DELIVERY: 'delivery'
}

const DeliveryApp = () => {
  const user = useSelector((store) => store.user);
  const [sales, setSales] = useState([]);
  const [saleInfoModal, setSaleInfoModal] = useState([]);
  const [saleProducts, setSaleProducts] = useState([]);
  const [showModalPdf, setShowModalPdf] = useState(false);
  const [showOrderDetail, setShowOrderDetail] = useState(false)
  const [typeTicket, setTypeTicket] = useState(typeTicketExists.COCINA)

  useEffect(() => {
    getDeliverySale();
  }, []);

  const getDeliverySale = async () => {
    const url = "venta/get-sale-detail-all/?";
    if (user.periodUser.id !== null) {
      const params = `idPeriod=${user.periodUser.id}&idUser=${user.id}`;
      const { success, sales } = await APISERVICE.get(url, params);
      if (success) {
        setSales(sales);
      }else{
        setSales([]);
      }
    }
  };
  /* Obtiene los productos de la venta */
  const getSaleDetailSample = async (idSale, type ) => {
    const url = "detalle-venta/get-sale-detail/?";
    const params = `idSale=${idSale}`;
    const { success, saleInfo, products } = await APISERVICE.get(url, params);
    if (success) {
      setSaleInfoModal(saleInfo);
      setSaleProducts(products);
    }
    type === typesShow.PDF ? setShowModalPdf(true): setShowOrderDetail(true) 
  };
  /* Cambiar estado de pendiente a enviado, y con esos cambiar btn confirmar a cobrar */
  const updateState = async (state, idSale) => {
    const url = "venta/update-state?";
    const params = `state=${state}&idSale=${idSale}`;
    const { success } = await APISERVICE.get(url, params);
    if (success) {
      getDeliverySale();
    }
  };

  return (
    <section className="delivery">
      <div className="delivery-header">
        <h3 style={{marginBottom: '15px'}}>Pedidos</h3> 
        <button className="btn-main" onClick={() => getDeliverySale()}>Actualizar</button>
      </div>
      <OrderTable
        sales={sales}
        getSaleDetailSample={getSaleDetailSample}
        updateState={updateState}
      />
      {showModalPdf && (
        <PdfOrder
          infoSale={saleInfoModal}
          setShowViewer={setShowModalPdf}
          items={saleProducts}
          updateState={updateState}
          typeTicket={typeTicket}
        />
      )}
      <ModalOrderDetail show={showOrderDetail} 
          saleInfo={saleInfoModal}
          products={saleProducts}
          setShowModal={setShowOrderDetail}
          getSaleDetailSample={getSaleDetailSample}
          setTypeTicket={setTypeTicket}/>
    </section>
  );
};
export default DeliveryApp;
