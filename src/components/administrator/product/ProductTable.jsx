import React from "react";
import ProductTableCard from "./ProductTableCard.jsx";
import Paginator from "../../global/paginador/Paginator.jsx";

const ProductTable = ({
  products,
  pageInfo,
  getProducts,
  setProductToEdit,
  setShow,
}) => {

  const hasProducts = products?.length > 0;
  return (
    <>
      <div className="container-products">
        {hasProducts ? (
          products.map((prod) => (
            <ProductTableCard
              key={prod.id}
              product={prod}
              setProductToEdit={setProductToEdit}
              setShow={setShow}
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
