import React from "react";
import ProductTableCard from "./ProductTableCard.jsx";
import Paginator from "../../global/paginador/Paginator.jsx";

const ProductTable = ({
  products,
  pageInfo,
  getProducts,
  setProductToEdit,
  setShow,
  getVarieties,
}) => {
  return (
    <>
      <div className="container-products">
        {products && products.length > 0 ? (
          products.map((prod) => (
            <ProductTableCard
              key={prod.id}
              product={prod}
              setProductToEdit={setProductToEdit}
              setShow={setShow}
              getVarieties={getVarieties}
            />
          ))
        ) : (
          <p style={{textALign: 'center'}}>No existen resultados!</p>
        )}
      </div>{
        products && products.length > 0 && <Paginator pageInfo={pageInfo} getData={getProducts} />
      }
    </>
  );
};

export default ProductTable;
