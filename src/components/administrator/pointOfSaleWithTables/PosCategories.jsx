import React, { useRef } from 'react'
const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;
import imgDefault from '../../../assets/img/fotoDeault.webp'

const PosCategories = ( { categories, getProducts } ) => {

  const categoryRef = useRef()
  const handleSelectCategory = ( cat ) => {
    getProducts(cat.id)
    categoryRef.current = cat.id
  }

  return (
    <div className='pos-categories'>
      <h5 className='pos-title-contenedor'>Categorias</h5>
      <div className='pos-cateogories-grilla'>
      {
        categories && categories.length > 0 ?
        categories.map( (cat) => {
          return <div className={`pos-category ${categoryRef.current === cat.id ? 'flag-category': ''}`} key={cat.id} onClick={() => handleSelectCategory(cat)}> 
               <h5 className='pos-category__title'>{cat.nombre}</h5>
               {
                  cat.url_image ? 
                  <img src={`${APIURLIMG}${cat.url_image}`} alt="" />
                  :
                  <img src={imgDefault} alt="" />
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