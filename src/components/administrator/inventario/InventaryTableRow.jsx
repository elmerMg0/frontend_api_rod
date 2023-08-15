import React, { useEffect } from 'react'

const InventaryTableRow = ({inventary}) => {

  return (
    <tr>
        <td>{inventary.fecha}</td>
        <td>{inventary.producto.nombre}</td>
        <td>{inventary.producto.precio_compra}</td>
        <td>{inventary.producto.precio_compra}</td>
        <td>{inventary.stock}</td>
        <td>{inventary.nuevo_stock}</td>
        <td>{inventary.total}</td>
    </tr>
  )
}

export default InventaryTableRow