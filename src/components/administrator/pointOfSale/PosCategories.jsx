import React from 'react'
import photoDefault from '../../../assets/img/fotoDeault.webp'
const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;
const PosCategories = ( { categories, getProducts, idCategory} ) => {

  const handleSelectCategory = ( cat ) => {
    idCategory.current = cat.id;
    getProducts(cat.id)
  }

  return (
    <div className='pos-categories'>
      <h5 className='pos-title-contenedor'>Categorias</h5>
      <div className='pos-cateogories-grilla'>
      {
        categories && categories.length > 0 ?
        categories.map( (cat) => {
          return <div className='pos-category' key={cat.id} onClick={() => handleSelectCategory(cat)}> 
               <h5 className='pos-category__title'>{cat.nombre}</h5>
               {
                cat.url_image ? 
                <img src={`${APIURLIMG}${cat.url_image}`} alt="" />
                :
                <img src={photoDefault} alt="" />
               }
            </div>
        })
        :
        <h5>No existen categorias!</h5>
      }
       </div>
    </div>
  )
}

export default PosCategories