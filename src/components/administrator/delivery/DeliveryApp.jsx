import { useEffect, useState } from "react";
import "../../../styles/administracion/delivery.css";
import OrderTable from "./OrderTable";
import { useDispatch, useSelector } from "react-redux";
import { APISERVICE } from "../../../services/api.services";
import PdfOrder from "./PdfOrder";
import ModalOrderDetail from "./ModalOrderDetail";
import { updateDelivery, updateQuantity } from "../../../redux/states/delivery";
import { useRef } from "react";

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
  const [isActive, setIsActive] = useState(false)
  const delivery = useSelector(store => store.deliverySlice);
  const dispatch = useDispatch();
  const setinterval = useRef(null);
/*   useEffect(() => {
    console.log(setinterval, 'useeffect')
    if(delivery.state){
      if(!setinterval.current){
        setInterval.current = setInterval(() => {
          getDeliverySale()
        },5000)
      }
    }else{

    }
  }, [delivery]); */
  useEffect(()=> {
    getDeliverySale();
  },[])
  console.log('render')
  const getDeliverySale = async () => {
    const url = "venta/get-sale-detail-all/?";
    if (user.periodUser.id !== null) {
      const params = `idPeriod=${user.periodUser.id}&idUser=${user.id}`;
      const { success, sales } = await APISERVICE.get(url, params);
      if (success) {
        setSales(sales);
        const quantitya = sales.filter(sale => sale.estado === 'pendiente').length;
        console.log(quantitya, delivery.quantity)
        if(delivery.quantity !== quantitya){
          dispatch(updateQuantity({quantity: quantitya}))
        }
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

  const handleUpdateDelivery = () => {
    if(delivery.state){
      dispatch(updateDelivery({state: false}))
      console.log(setInterval.current)
      clearInterval(setinterval.current);
      setinterval.current = null;
    }else{
      dispatch(updateDelivery({state: true}))
      setinterval.current = setInterval(() => {
        getDeliverySale()
      },5000)
    }
  }

  return (
    <section className="delivery">
      <div className="delivery-header">
        <h3 style={{marginBottom: '15px'}}>Pedidos</h3> 
        {
          delivery.state ? 
          <button className="btn-main-green" onClick={() => handleUpdateDelivery()}>{delivery.state ? 'Activo': 'Activar'}</button>
          :
          <button className="btn-main" onClick={() => handleUpdateDelivery()}>{delivery.state ? 'Activo': 'Activar'}</button>
        }
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
