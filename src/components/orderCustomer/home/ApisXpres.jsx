import Header from "./header/Header";
import Category from "./category/Category";
import Carrito from './carrito/Carrito'
import CategoryCard from "./categorywproducts/CategoryCard";
import { APISERVICE } from "../../../services/api.services";
import { Suspense, lazy, useEffect, useState } from "react";
import "../../../styles/global.css";
import ModalOrderDetail from "./categorywproducts/ModalOrderDetail";
import ModalSuccess from './carrito/ModalSuccess'
import { Footer } from "./footer/Footer";
import LoadingRed from "./loader/LoadingRed";

export const messages = {
  SMSSUCCES: 'Su pedido se realizo exitosamente.',
}

const ApisXpres = () => {
  const [categories, setCategories] = useState([]);
  const [categoryWithProducts, setcategoryWithProducts] = useState([]);
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [category, setCategory] = useState({});
  const [showProducts, setShowProducts] = useState(true);
  const [showModalSuccess, setShowModalSuccess] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const [messageModal, setMessageModal] = useState(messages.SMSALERT)
  const [active, setActive] = useState(true)

  useEffect(() => {
    getPeriod();
    getCategories();
    const numberPage = 1;
    getCategoriesWithProducts(numberPage);
  }, []);

  const getPeriod = async () => {
    const url = 'api/exists-period'
    const { success, message } = await APISERVICE.get(url);
    if( !success ){
      setActive(false);
      setMessageModal(message)
      setShowModalSuccess(true);
    }
  }

  const getCategories = async () => {
    const url = "api/get-categories";
    const { success, categories } = await APISERVICE.get(url);
    if (success) {
      setCategories(categories);
    }
  };

  const getCategoriesWithProducts = async () => {
    setShowLoader(true);
    let url = "api/get-category-with-products/?";
    const { success, categories } = await APISERVICE.get(url);
    if (success) {
      setcategoryWithProducts(categories);
    }
    setShowLoader(false);
  };

  return (
    <div className="body">
      { !showLoader ? 
     <div>
        {showProducts ?(
          <div style={{transition: '1s all'}}>
            <div className="pos-sticky">
              <Header setShowProducts={setShowProducts} showProducts={showProducts}/>
              <Category categories={categories} />
            </div>
            <CategoryCard
              categories={categoryWithProducts}
              setShowOrderDetail={setShowOrderDetail}
              setCategory={setCategory}
            />
            <ModalOrderDetail
              show={showOrderDetail}
              setShow={setShowOrderDetail}
              category={category}
              setCategory={setCategory}/>
            <Footer/>
          </div>
        ):
        <>
          <Header setShowProducts={setShowProducts} showProducts={showProducts}/>
          <Carrito setShowProducts={setShowProducts} setShowModalSuccess={setShowModalSuccess} setMessageModal={setMessageModal} active={active}/>
        </>  }
    </div>
    : <LoadingRed/>
      }

       <ModalSuccess show={showModalSuccess} onHide={setShowModalSuccess} message={messageModal}/>

    </div>
  );
};
export default ApisXpres;
