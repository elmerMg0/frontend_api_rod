import React, { useEffect, useState } from "react";
import ProductTable from "./ProductTable";
import { APISERVICE } from "../../../services/api.services";
import ProductModal from "./ProductModal";
import ModalConfirm from "../../global/modal/ModalConfirm";
import { Toaster, toast } from "react-hot-toast";
import "../../../styles/administracion/productCrud.css";
import SearchInput from "../../global/search/SearchInput";

const CategoryCrud = () => {
  const [products, setProducts] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [show, setShow] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [productToEdit, setProductToEdit] = useState({});
  const [productToDelete, setProductToDelete] = useState({});
  const [productsAll, setProductsAll] = useState([]);
  const [productsFilter, setProductsFilter] = useState([]);
  const [inputSearchProduct, setInputSearchProduct] = useState("");
  const [categories, setCategories] = useState([]);
  const [varieties, setVarieties] = useState([]);
  /* Custom hoock */
  

  useEffect(() => {
    getProducts();
    getProductsAll();
    getCategories();
  }, []);

  const getProducts = async (pageNumber = 1) => {
    let url = "producto/?";
    let params = `page=${pageNumber}`;
    const {success, pageInfo, products} = await APISERVICE.get(url, params);
    if ( success ) {
      setPageInfo(pageInfo);
      setProducts(products);
    }
  };

  const getProductsAll = async () => {
    let url = "producto/products";
    const {success, products} = await APISERVICE.get(url);
    if ( success ) {
      setProductsAll(products);
    }
  };

  const getCategories = async () => {
    let url = "categoria/categories?";
    const { success, categories } = await APISERVICE.get(url);
    if (success ) {
      setCategories(categories);
    }
  };

  const createNewProduct = async (product, image) => {
    let url = "producto/create/?";
    const formData = new FormData();
    formData.append("data", JSON.stringify(product));
    if (image) formData.append("file", product.url_image);
    let params = `idCategory=${product.categoria_id}`;
    const { success, message } = await APISERVICE.postWithImage(formData, url, params);
    if ( success ) {
      messageToast(message);
      getProducts();
      getProductsAll();
    }else{
      messageToastError(message);
    }
  };

  const messageToast = (message) => {
    toast.success(message);
  };

  const messageToastError = (message) => {
    toast.error(message);
  };

  const updateProduct = async (product, image) => {
    console.log(product)
    let $url = `producto/update?`;
    let $params = `idProduct=${product.id}`;
    const fd = new FormData();
    fd.append("data", JSON.stringify(product));
    if (image) fd.append("file", product.url_image);
    const {success, message} = await APISERVICE.postWithImage(fd, $url, $params);
    if (success) {
      messageToast(message);
      setProductToEdit({});
      getProducts();
      getProductsAll();
    }else{
      messageToastError(message);
    }
  };

  const deleteProduct = async (id) => {
    setShowModalConfirm(true);
    setProductToDelete(id);
  };

  const deleteProductToServer = async () => {
    let url = "producto/disable-product?";
    let params = `idProduct=${productToDelete}`;
    const {message, success} = await APISERVICE.delete(url, params);
    if ( success ) {
      getProducts();
      messageToast(message);
      setProductToEdit(null)
    }
    setShowModalConfirm(false);
  };

  const filterproducts = (product) => {
    if (product.length > 0) {
      setInputSearchProduct(product);

      setProductsFilter(
        productsAll.filter((cus) =>
          cus.nombre.toLowerCase().includes(product.toLowerCase())
        )
      );
    } else {
      setInputSearchProduct("");
      setProductsFilter([]);
    }
  };

  return (
    <div className="product">
      <h3 className="title">Productos</h3>
      <SearchInput
        setShow={setShow}
        filterSomething={filterproducts}
        placeHolder="Nombre de producto"
      />
      {productsFilter.length > 0 || inputSearchProduct.length > 0 ? (
        <ProductTable
          products={productsFilter}
          pageInfo={pageInfo}
          getProducts={getProducts}
          setProductToEdit={setProductToEdit}
          setShow={setShow}
          deleteProduct={deleteProduct}
        />
      ) : (
        <>
          <ProductTable
            products={products}
            pageInfo={pageInfo}
            getProducts={getProducts}
            setProductToEdit={setProductToEdit}
            setShow={setShow}
            deleteProduct={deleteProduct}
          />
        </>
      )}
      <ProductModal
        show={show}
        setShow={setShow}
        create={createNewProduct}
        productToEdit={productToEdit}
        setProductToEdit={setProductToEdit}
        updateProduct={updateProduct}
        categories={categories}
        varietiesProduct={varieties}
        setVarietiesProduct={setVarieties}
        deleteProduct={deleteProduct}
      />
      <ModalConfirm
        show={showModalConfirm}
        onHide={setShowModalConfirm}
        deleteSomething={deleteProductToServer}
      />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default CategoryCrud;
