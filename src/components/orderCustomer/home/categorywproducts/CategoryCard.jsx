import "../../../../styles/carrito/categorywproducts.css";
import photoDefault from '../../../../assets/img/fotoDeault.webp'
const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;
const CategoryCard = ({ categories, setShowOrderDetail, setCategory }) => {
  
  const hasCategory = categories?.length > 0;
  const handleOnClick = (cat) => {
    setCategory(cat);
    setShowOrderDetail(true)
  }

  return (
    <main className="contenedor">
      {hasCategory ? (
        categories.map((cat, index) => {
          return (
            <div className="category-card" key={cat.id} id={cat.id}>
              <h5>{cat.nombre}</h5>
              <div className="category-card__body">
                <div className="category-card__img">
                  {
                    cat.url_image ? 
                    <img
                    src={`${APIURLIMG}${cat.url_image}`}
                    alt="foto de categoria"
                    />
                    :
                    <img src={photoDefault}/>
                }
                    
                </div>
                <div className="category-card__footer">
                  <div>
                    <h5>{cat.nombre}</h5>
                    <p>{cat.descripcion}</p>
                  </div>
                  {/* <h5>{`${cat.productos[0].precio_venta}.00 Bs.`}</h5> */}
                  {
                      cat.productos[0] && <h5>{`${cat.productos[0].precio_venta}.00 Bs.`}</h5>
                  }
                  <div className="category-card__plus" onClick={() => handleOnClick(cat)}>+</div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p style={{textAlign: 'center'}}></p>
      )}
    </main>
  );
};
export default CategoryCard;
