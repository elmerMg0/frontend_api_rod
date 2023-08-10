import React from "react";
import edit from "../../../assets/svg/edit.svg";
import trash from "../../../assets/svg/trash.svg";
import defaultPhoto from '../../../assets/img/fotoDeault.webp'
const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;
const CategoryTableRow = ({
  category,
  setCategoryToEdit,
  setShow,
  deleteCategory,
}) => {

  const handleEditcategory = () => {
    setCategoryToEdit(category);
    setShow(true);
  };
  const handleDeletecategory = () => {
    deleteCategory(category.id);
  };

  return (
    <tr>
      <td>{category.nombre}</td>
      <td>{category.descripcion}</td>
      <td className="row-table-img">
      {
            category.url_image ? 
            <img
            src={`${APIURLIMG}${category.url_image}`}
            alt="foto categoria"
          />
            :
            <img src={defaultPhoto} alt='foto categoria'/>
          }
      </td>
      <td className="category-state">
          {category.estado === "Activo" ? (
            <button className="btn-main-green">{category.estado}</button>
          ) : (
            <button className="btn-main-red">{category.estado}</button>
          )}
        </td>

      <td className="col-2" style={{ textAlign: "center" }}>
        <button className="btn-main" onClick={() => handleEditcategory()}>
          {" "}
          <img src={edit} alt="icon-edit" />{" "}
        </button>{" "}
        <button className="btn-main-red" onClick={() => handleDeletecategory()}>
          <img src={trash} alt="icon-basura" />
        </button>
      </td>
    </tr>
  );
};

export default CategoryTableRow;
