import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'

const TableProduct = ({detalleVentas}) => {
  return (
    <Table>
        <thead>
            <tr>
                <th>Cant.</th>
                <th>Producto</th>
            </tr>
        </thead>
        <tbody>
            {
            detalleVentas.map(prod => <tr key={prod.id}>
                <td>{prod.cantidad}</td>
                <td>{prod.producto.nombre}</td>
            </tr>)
            }
        </tbody>
    </Table>
  ) 
}

export default TableProduct