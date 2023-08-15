import React from 'react'
import { Table } from 'react-bootstrap'
import ProductTableRow from './ProductTableRow'

const ProductTable = ({products}) => {
  return (
    <Table>
        <thead>
            <tr>
            <th>Nombre</th>
            <th>Precio Prod</th>
            <th>Precio Venta</th>
            <th>Categoria</th>
            <th>Stock</th>
            <th>Nuevo</th>
            <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            {
                products && products.length > 0 ? 
                    products.map( product => <ProductTableRow key={product.id} product={product}/>)
                :
                <tr>
                    <td style={{textAlign: 'center'}} colSpan={7}>No existen productos</td>
                </tr>
            }
        </tbody>
    </Table>
  )
}

export default ProductTable