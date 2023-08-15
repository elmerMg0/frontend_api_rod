import React from "react";
import defaultPhoto from '../../../assets/img/fotoDeault.webp'
const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;
const states = {
  ACTIVO: 'Activo',
  INACTIVO:'Inactivo'
}
const ProductTableCard = ({
  product,
  setProductToEdit,
  setShow,
}) => {
  const handleShowMore = () => {
    setProductToEdit(product);
    setShow(true);
  };

  return (
    <div className="product-card">
      <div className={product.estado === states.ACTIVO ? 'product-enable' : 'product-disable'}>
        {
            product.url_image ? 
            <img
            src={`${APIURLIMG}${product.url_image}`}
            alt="foto user"
          />
            :
            <img src={defaultPhoto} alt="foto producto"/>
          }
    
      <div className="product-card__text">
        <h5>{product.nombre}</h5>
      {/*   <h5>{product.descripcion}</h5> */}
        <h5>Bs.-{product.precio_venta}</h5>
        <button className="btn-main" onClick={() => handleShowMore()}>
          Editar
        </button>
      </div>
      </div>
    </div>
  );
};

export default ProductTableCard;
