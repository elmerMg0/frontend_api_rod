import React, { useEffect } from 'react'

const CurrentInventaryTableRow = ({inventary}) => {

  return (
    <tr>
        <td>{inventary.fecha}</td>
        <td>{inventary.producto.nombre}</td>
        <td>{inventary.producto.precio_compra}</td>
        <td>{inventary.producto.precio_compra}</td>
        <td>{inventary.total}</td>
        <td>{inventary.producto.stock}</td>
        <td>{inventary.total - inventary.producto.stock}</td>
    </tr>
  )
}

export default CurrentInventaryTableRow;