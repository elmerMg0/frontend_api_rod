import React, { useEffect, useState } from "react";
import CategoryTable from "./CategoryTable";
import { APISERVICE } from "../../../services/api.services";
import CategoryModal from "./CategoryModal";
import ModalConfirm from "../../global/modal/ModalConfirm";
import { Toaster, toast} from "react-hot-toast";
import  '../../../styles/administracion/categoryCrud.css'
import SearchInput from "../../global/search/SearchInput";
const CategoryCrud = () => {
  const [categories, setcategories] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [show, setShow] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState({});
  const [categoryToDelete, setCategoryToDelete] = useState({});
  const [categoriesAll, setCategoriesAll] = useState([]);
  const [categoriesFilter, setCategoriesFilter] = useState([]);
  const [inputSearchCategory, setInputSearchCategory] = useState("");

  useEffect(() => {
    getCategories();
    getCategoriesAll();
  }, []);

  const getCategories = async (pageNumber = 1) => {
    let url = "categoria/?";
    let params = `page=${pageNumber}`;
    const {success, pageInfo} = await APISERVICE.get(url, params);
    if (success) {
      setPageInfo(pageInfo);
      setcategories(pageInfo.categories);
    }
  };

  const getCategoriesAll = async () => {
    let url = "categoria/categories";
    const {success, categories} = await APISERVICE.get(url);
    if ( success ) {
      setCategoriesAll(categories);
    }
  };

  const createNewCategory = async (category, image) => {
    //envio de info en body
    let url = "categoria/create";
    const formData = new FormData();
    let data = {
      nombre: category.nombre,
      descripcion: category.descripcion,
      estado: category.estado,
      cortesia: category.cortesia === 'Activo' ? 1 : 0,
    }
    formData.append('data',JSON.stringify(data))
    if(image)formData.append('file', category.url_image) 

    const {success, message} = await APISERVICE.postWithImage(formData, url);
    if ( success ) {
      messageToast(message)
      getCategories();
    }else{
      messageToastError(message)
    }
  };

  const messageToast = ( message ) =>{
    toast.success(message)
  }
  const messageToastError = ( message ) =>{
    toast.error(message)
  }

  const updateCategory = async (category, image) => {
    let $url = `categoria/update?`;
    let $params = `idCategory=${category.id}`;

    const fd = new FormData()
    
    let body = {
      nombre: category.nombre,
      descripcion: category.descripcion,
      estado: category.estado,
      cortesia: category.cortesia === 'Activo' ? 1 : 0,
    }
    fd.append('data', JSON.stringify(body));
    if(image)fd.append('file', category.url_image) 
    const { success, message } = await APISERVICE.postWithImage(fd, $url, $params);
    if ( success ) {
      messageToast(message)
      getCategories();
      getCategoriesAll();
    }else{
      messageToastError(message)
    }
  };

  const deleteCategory = async (id) => {
    setShowModalConfirm(true);
    setCategoryToDelete(id);
  };

  const deleteCategoryToServer = async () => {
    let url = "categoria/disable-category?";
    let params = `idCategory=${categoryToDelete}`
    const { success, message } = await APISERVICE.delete(url, params);
    if ( success ) {
      messageToast(message)
      getCategories();
    }else{
      messageToastError(message)
    }
    setShowModalConfirm(false);
  };

  const filtercategories = (category) => {
    if(category.length > 0){
      setInputSearchCategory(category);
      
      setCategoriesFilter(
        categoriesAll.filter((cus) =>
        cus.nombre.toLowerCase().includes(category.toLowerCase())
        )
        );
      }else{
        setInputSearchCategory('');
        setCategoriesFilter([])
    }
  };

  return (
    <div className="category">
      <h3 className="title">Categorias</h3>
      <SearchInput setShow={setShow} filterSomething={filtercategories} placeHolder='Nombre de categoria' />
      {categoriesFilter.length > 0 || inputSearchCategory.length > 0? (
        <CategoryTable
          categories={categoriesFilter}
          pageInfo={pageInfo}
          getCategories={getCategories}
          setCategoryToEdit={setCategoryToEdit}
          setShow={setShow}
          deleteCategory={deleteCategory}
        />
      ) : (
        <>
         <CategoryTable
              categories={categories}
              pageInfo={pageInfo}
              getCategories={getCategories}
              setCategoryToEdit={setCategoryToEdit}
               setShow={setShow}
              deleteCategory={deleteCategory}
            />
        </>
      )}
        <CategoryModal
        show={show}
        setShow={setShow}
        create={createNewCategory}
        categoryToEdit={categoryToEdit}
        setCategoryToEdit={setCategoryToEdit}
        updateCategory={updateCategory}
      />
      <ModalConfirm
        show={showModalConfirm}
        onHide={setShowModalConfirm}
        deleteSomething={deleteCategoryToServer}
        message='Esta usted seguro de que quiere inabilitar esta categoria?'
      />
        <Toaster
      position="top-right"
      reverseOrder={false}
     />
    </div>
  );
};

export default CategoryCrud;
