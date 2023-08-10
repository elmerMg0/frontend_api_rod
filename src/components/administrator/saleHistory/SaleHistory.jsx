import { useEffect, useState } from "react";
import { APISERVICE } from "../../../services/api.services";
import "../../../styles/administracion/saleHistory.css";
import TableHistory from "./TableHistory";
import SeekerSales from "./SeekerSales";
import ModalSaleDetail from "./ModalSaleDetail";
import { Toaster, toast } from "react-hot-toast";
import ModalConfirm from "../../global/modal/ModalConfirm";
import { useSelector } from "react-redux";
import PdfOrder from './PdfOrder';
const SaleHistory = () => {
  const [sales, setSales] = useState([]);
  const [salesInfo, setSalesInfo] = useState({});
  const [users, setUsers] = useState([]);
  const [saleInfoModal, setSaleInfoModal] = useState({});
  const [modalProducts, setModalProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [infoSeeker, setInfoSeeker] = useState({});
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [saleToCancel, setSaleToCancel] = useState(0)
  const user = useSelector(store => store.user);
  const [showPdfOrder, setShowPdfOrder] = useState(false);
  useEffect(() => {
    /* Tenemos period and user, traer todas las ventsa del periodo y del user*/
    getUsers();
    if(user.periodUser.state === true){
      getSaleDetailsByPeriod(1);
    }
  }, []);

  /* @params numero de pagina, volver body una vriable global(fechaIni, fechaFin, usuario) */
  const getSaleDetails = async (pageNumber, body) => {
    body = body ? body : infoSeeker;
    const url = "venta/get-sale-detail/?";
    const params = `page=${pageNumber}`;
    const { success, pageInfo, sales } = await APISERVICE.post(
      body,
      url,
      params
    );
    if (success) {
      setSales(sales);
      setSalesInfo(pageInfo);
    } else {
      setSales([]);
    }
  };

  const getSaleDetailsByPeriod = async (pageNumber) => {
    const url = "venta/get-sale-detail-by-period/?";
    if(user.periodUser.state === true){
        const body = {
          idPeriod: user.periodUser.id,
          idUser: user.id
        }
        const params = `page=${pageNumber}`;
        const { success, pageInfo, sales } = await APISERVICE.post(body, url, params);
        if (success) {
          setSales(sales);
          setSalesInfo(pageInfo);
      } else {
        setSales([]);
      }
    }
  };
  
  const getUsers = async () => {
    const url = "usuario/get-all-users";
    const { success, users } = await APISERVICE.get(url);
    if (success) {
      setUsers(users);
    }
  };

  const getSaleDetailSample = async (idSale) => {
    const url = "detalle-venta/get-sale-detail/?";
    const params = `idSale=${idSale}`;
    const { success, saleInfo, products } = await APISERVICE.get(url, params);
    if (success) {
      setSaleInfoModal(saleInfo);
      setModalProducts(products);
    }
    setShowModal(true);
  };

  const cancelSale = async() => {
    const url = "venta/cancel-sale/?";
    const params = `idSale=${saleToCancel}`;
    const {success, message} = await APISERVICE.get(url, params);
    if (success) {
      messageToast(message);
      if(user.periodUser.administrador){
        getSaleDetails();
      }else{
        getSaleDetailsByPeriod();
      }
    } else {
      messageToastError(message);
    }
    setShowModalConfirm(false);
  };

  const messageToastError = (sms) => {
    toast.success(sms);
  };


  const messageToast = (sms) => {
    toast.success(sms);
  };

  return (
    <div className="sale-history">
      <h3 style={{marginBottom: '15px'}}>Historial de Ventas</h3>
      {
        user.role.administrador &&
        <SeekerSales
        getSaleDetails={getSaleDetails}
        users={users}
        setInfoSeeker={setInfoSeeker}
        />
      }
      <TableHistory
        sales={sales}
        salesInfo={salesInfo}
        getSaleDetails={getSaleDetails}
        getSaleDetailSample={getSaleDetailSample}
        setShowModalConfirm={setShowModalConfirm}
        setSaleToCancel={setSaleToCancel}
        getSaleDetailsByPeriod={getSaleDetailsByPeriod}
      />
      <ModalSaleDetail
        saleInfo={saleInfoModal}
        products={modalProducts}
        show={showModal}
        setShowModal={setShowModal}
        setShowPdfOrder={setShowPdfOrder}
        getSaleDetailSample={getSaleDetailSample}
      />
      <ModalConfirm
        show={showModalConfirm}
        onHide={setShowModalConfirm}
        deleteSomething={cancelSale}
        message='Esta usted seguro de cancelar esta venta?'
      />{
        showPdfOrder && <PdfOrder infoSale={saleInfoModal}
         setShowViewer={setShowPdfOrder}
         items={modalProducts}
         />
      }
      <Toaster position="top-right"/>
    </div>
  );
};
export default SaleHistory;
