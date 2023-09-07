import React, { useContext, useEffect, useState } from "react";
import "./posWithTables.css";
import PosCategories from "./PosCategories";
import PosProducts from "./PosProducts";
import PosAcount from "./PosAcount";
import PosPay from "./PosPay";
import { APISERVICE } from "../../../services/api.services";
import { useSelector } from "react-redux";
import { Toaster} from "react-hot-toast";
import ModalCollectMoney from "./ModalCollectMoney";
import PosBarLef from "./PosBarLeft";
import ModalCustomers from "./ModalCustomers";
import ModalNotes from "./ModalNotes";
import { OrderDetailContext } from "../../../context/orderDetail";


const PosWithTables = ({
  setShowPos,
  getTables,
}) => {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [categories, setCategories] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [showModalCustomer, setShowModalCustomer] = useState(false);
  
  const [showNotes, setShowNotes] = useState(false)
  
  const categoriesStore = useSelector(store => store.categories)

  const { infoSale, tableSelected, infoCollectMoney} = useContext(OrderDetailContext)

  const collectEnabled = infoCollectMoney.totalPrice > 0;

  useEffect(() => {
    getCategories();
    getCustomers();
  }, []);


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
    const categoryFull = categoriesStore.find(category => category.id === idCategory);
    setProducts(categoryFull.productos)
  };

  return (
 
      <div className="point-of-sale-tables">
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            gap: "100px",
          }}
        >
          <h5>Nro de mesa: {tableSelected.nombre}</h5>
          <h5>Mesero: {infoSale.usuario}</h5>
        </div>

        <div className="pos-content">
          <PosBarLef
            setShow={setShowModalCustomer}
            setShowPos={setShowPos}
            setShowNotes={setShowNotes}
            getTables={getTables}
          />
          <PosAcount/>
          <PosCategories categories={categories} getProducts={getProducts}/>
          <PosProducts products={products} />
        </div>
        { collectEnabled &&
          <PosPay
            setShowModal={setShowModal}
            getTables={getTables}
            setShowPos={setShowPos}
        />
        }
        <ModalCollectMoney
          showModal={showModal}
          setShowModal={setShowModal}
        />
        <ModalCustomers
          show={showModalCustomer}
          onHide={setShowModalCustomer}
          customers={customers}
        />
        <ModalNotes show={showNotes} onHide={setShowNotes}/>
        <Toaster position="top-right" />
      </div>
  );
};
export default PosWithTables;