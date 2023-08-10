import React, { useEffect, useState } from "react";
import "../../../styles/administracion/pointOfSale.css";
import PosCategories from "./PosCategories";
import PosProducts from "./PosProducts";
import PosAcount from "./PosAcount";
import PosPay from "./PosPay";
import { APISERVICE } from "../../../services/api.services";
import { useSelector, useDispatch } from "react-redux";
import { updateCarrito, deleteCarrito } from "../../../redux/states/carrito";
import { Toaster, toast } from "react-hot-toast";
import "jspdf-autotable";
import ModalCollectMoney from "./ModalCollectMoney";
import ViewerPrint from "./ViewerPrint";
import ModalBeginPeriod from "./ModalBeginPeriod";
import PosBarLef from "./PosBarLeft";
import ModalCustomers from "./ModalCustomers";

/* const detailSale = {
  totalPrice: 0,
  totalPaid: 0,
  payType: "",
}; */

const PointOfSale = () => {
  //const PosProducts = lazy(() => import('./PosProducts'));
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const orderDetail = useSelector((store) => store.carrito.orderDetail);
  const userId = useSelector((store) => store.user.id);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [payType, setPayType] = useState("");
  const [showViewer, setShowViewer] = useState(false);
  const [infoSale, setInfoSale] = useState(0);
  const [change, setChange] = useState(0);
  const [accumulateAcount, setAccumulateAcount] = useState(0);
  const user = useSelector((store) => store.user);
  const [showModalPeriod, setShowModalPeriod] = useState(false);
  const [showModalCustomer, setShowModalCustomer] = useState(false);
  const [customerSelected, setCustomerSelected] = useState('Genérico');

  useEffect(() => {
    getCategories();
    getCustomers();
    if (!user.periodUser.state) {
      setShowModalPeriod(true);
    } 
  }, []);
  useEffect(() => {
    settotalPrice();
  }, [orderDetail]);

  const getCustomers = async () => {
    let url = "cliente/customers";
    const { success, customers } = await APISERVICE.get(url);
    if (success) {
      setCustomers(customers);
    }
  };

  const getCategories = async () => {
    let url = "categoria/get-categories";
    const { success, categories } = await APISERVICE.get(url);
    if (success) {
      setCategories(categories);
    }
  };

  const getProducts = async (idCategory) => {
    let url = "categoria/get-products-by-category/?";
    let params = `idCategory=${idCategory}`;
    const { success, products } = await APISERVICE.get(url, params);
    if (success) {
      setProducts(products);
    }
  };

  const addProductOrder = (product) => {
    dispatch(updateCarrito(product));
  };

  const createSale = async (totalPaidGlobal = totalPaid) => {
    let url = "venta/create/?";
    //let params = `userId=${userId}&customerId=${customerId}`;
    let params = `userId=${userId}`;
    let body = {
      orderDetail,
      cantidadTotal: totalPrice,
      cantidadPagada: totalPaidGlobal,
      estado: "pagado",
      tipoPago: payType.length > 0 ? payType : "efectivo",
      tipo: "local",
      nombre: customerSelected,
    };

    const { success, sale } = await APISERVICE.post(body, url, params);
    if (success) {
      setShowViewer(true); //motrar PDFViever con la informacion de la venta
      setInfoSale(sale);
      toast.success("Pedido enviado correctamente");
      //generatePDF();
      setShowModal(false);
    }
  };

  const settotalPrice = () => {
    let totalPrice = orderDetail.reduce(
      (ac, prod) => ac + prod.cantidad * prod.precio_venta,
      0
    );
    setTotalPrice(totalPrice);
    setTotalPaid(totalPrice);
  };

  const cleanCarrito = () => {
    dispatch(deleteCarrito());
    setTotalPaid(0);
    setPayType("");
    setAccumulateAcount(0);
    setChange(0);
    setCustomerSelected('Genérico');
  };

  return (
    <div className="point-of-sale">
      <div className="pos-content">
        <PosBarLef setShow={setShowModalCustomer} />
        <PosAcount totalPrice={totalPrice} accumulate={accumulateAcount} customer={customerSelected}/>
        <PosCategories categories={categories} getProducts={getProducts} />
        <PosProducts products={products} addProductOrder={addProductOrder} />
      </div>
      <PosPay
        createSale={createSale}
        totalPrice={totalPrice}
        totalPaid={totalPaid}
        setTotalPaid={setTotalPaid}
        setShowModal={setShowModal}
        accumulate={accumulateAcount}
        setAccumulate={setAccumulateAcount}
      />
      <ModalCollectMoney
        showModal={showModal}
        totalPrice={totalPrice}
        setShowModal={setShowModal}
        createSale={createSale}
        setPayType={setPayType}
        totalPaid={totalPaid}
        setTotalPaid={setTotalPaid}
        change={change}
        setChange={setChange}
      />
      <Toaster position="top-right" />
      {showViewer && (
        <ViewerPrint
          infoSale={infoSale}
          setShowViewer={setShowViewer}
          cleanCarrito={cleanCarrito}
          customer={customerSelected}
        />
      )}
      <ModalBeginPeriod show={showModalPeriod} />
      <ModalCustomers
        show={showModalCustomer}
        onHide={setShowModalCustomer}
        customers={customers}
        setCustomer={setCustomerSelected}
      />
    </div>
  );
};

export default PointOfSale;
