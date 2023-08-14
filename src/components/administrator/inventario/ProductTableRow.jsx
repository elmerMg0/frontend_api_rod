import React, { useContext, useState } from 'react'
import { Form } from 'react-bootstrap'
import { MyContext } from './Inventary'

const ProductTableRow = ({product}) => {
  const { setProductsToEdit, productsToEdit, createInventary} = useContext(MyContext);
  const [newStock, setNewStock] = useState(0)
  const handleCreateInventary = () => {
    createInventary(product, newStock);
  }
  const handleRemoveProduct = () => {
    setProductsToEdit([...productsToEdit.filter (prod => prod.id !== product.id)]);
  }

  const handleSetStock = (e) => {
    setProductsToEdit([...productsToEdit.map( prod => {

      if(prod.id === product.id){
        prod.newStock = e.target.value
      }
      return prod;
    })])
    setNewStock(e.target.value);
  }
  return (
    <tr>
        <td>{product.nombre}</td>
        <td>{product.precio_venta}</td>
        <td>{product.precio_compra}</td>
        <td>{product.nombre_categoria}</td>
        <td>{product.stock}</td>
        <td> <Form.Control type="number" min={1} value={newStock} name="newStock" onChange={(e) => handleSetStock(e)} /> </td>
        <td style={{whiteSpace:'nowrap' }}>
        {/*   <button className='btn-main' onClick={handleCreateInventary}>Guardar</button>{" "} */}
          <button className='btn-main-red' onClick={handleRemoveProduct}>Quitar</button>        
        </td>
    </tr>
  )
}

export default ProductTableRow