import React from "react";
import defaultPhoto from '../../../assets/img/fotoDeault.webp'
const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;
const PosProducts = ({ products, addProductOrder }) => {
  const handleAddProduct = (prod) => {
    addProductOrder(prod);
  };

  return (
    <div className="pos-products">
      <h5 className="pos-title-contenedor">Productos</h5>
      <div className="pos-products-flex">
        {products && products.length > 0 ? (
          products.map((prod) => {
            return (
              <div
                key={prod.id}
                className="pos-product"
                onClick={() => handleAddProduct(prod)}
              >
                {
                  prod.url_image ? 
                  <img src={`${APIURLIMG}${prod.url_image}`} alt="foto de producto" />
                  :
                  <img src={defaultPhoto} alt="" />
                }
                <h5>
                  {" "}
                  <span>Bs. </span>
                  {prod.precio_venta}
                </h5>
                <p>{prod.nombre}</p>
              </div>
            );
          })
        ) : (
          <h5>No existen productos aun!</h5>
        )}
      </div>
    </div>
  );
};

export default PosProducts;
