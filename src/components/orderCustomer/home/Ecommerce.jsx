import Header from "./header/Header";
import Category from "./category/Category";
import Carrito from "./carrito/Carrito";
import CategoryCard from "./categorywproducts/CategoryCard";
import { Suspense, lazy, useEffect, useState } from "react";
import "../../../styles/global.css";
import ModalOrderDetail from "./categorywproducts/ModalOrderDetail";
import ModalSuccess from "./carrito/ModalSuccess";
import { Footer } from "./footer/Footer";
import LoadingRed from "./loader/LoadingRed";
import Seeker from "./header/Seeker";
import { APISERVICE } from "../../../services/api.services";
export const messages = {
  SMSSUCCES: "Su pedido se realizo exitosamente.",
  SMSERROR: 'Ocurrio un error'
};

const Ecommerce = () => {
  const [categories, setCategories] = useState([]);
  const [categoryWithProducts, setcategoryWithProducts] = useState([]);
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [category, setCategory] = useState({});
  const [showProducts, setShowProducts] = useState(true);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [messageModal, setMessageModal] = useState(messages.SMSALERT);
  const [active, setActive] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [filters, setFilters] = useState({ category: "all" });

  useEffect(() => {
    getPeriod();
    getCategories();
    const numberPage = 1;
    getCategoriesWithProducts(numberPage);
  }, []);

  const getPeriod = async () => {
    const url = "api/exists-period";
    const { success, message } = await APISERVICE.get(url);
    if (!success) {
      setActive(false);
      setMessageModal(message);
      setShowModalSuccess(true);
    }
  };

  const getCategories = async () => {
    const url = "api/get-categories";
    const { success, categories } = await APISERVICE.get(url);
    if (success) {
      setCategories(categories);
    }
  };

  const getCategoriesWithProducts = async () => {
    try {
      setShowLoader(true);
      let url = "api/get-category-with-products/?";
      const { success, categories } = await APISERVICE.get(url);
      if (success) {
        setcategoryWithProducts(categories);
      }
    } catch (error) {
      
    } finally {
      setShowLoader(false);
    }
  };

  const categoriesWithProductsFilter = (categoryWithProducts) => {
    return categoryWithProducts.filter((category) => 
      filters.category === 'all' || category.nombre.toLowerCase().includes(filters.category.toLowerCase())
    );
  };

  const categorieFilter = categoriesWithProductsFilter(categoryWithProducts)


  const header = <Header
    setShowProducts={setShowProducts} 
     showProducts={showProducts}
     setShowSearch={setShowSearch}
     showSearch={showSearch}
     setFilters={setFilters}
   />

  return (
    <div className="body">
      {!showLoader ? (
        <div>
        
          {showProducts ? (
            <div style={{ transition: "1s all" }}>
              <div className="pos-sticky">
                {header}
               <Category categories={categories} />
              </div>
              <CategoryCard
                categories={categorieFilter}
                setShowOrderDetail={setShowOrderDetail}
                setCategory={setCategory}
              />
            </div>
          ) : (
            <>
              {header}
              <Carrito
                setShowProducts={setShowProducts}
                setShowModalSuccess={setShowModalSuccess}
                setMessageModal={setMessageModal}
                active={active}
              />
            </>
          )}

          <ModalOrderDetail
            show={showOrderDetail}
            setShow={setShowOrderDetail}
            category={category}
            setCategory={setCategory}
          />
          <ModalSuccess
            show={showModalSuccess}
            onHide={setShowModalSuccess}
            message={messageModal}
          />
          <Footer />
        </div>
      ) : (
        <LoadingRed />
      )}
    </div>
  );
};
export default Ecommerce;
