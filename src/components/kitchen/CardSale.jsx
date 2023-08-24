import React from 'react'
import './kitchen.css'
import TableProduct from './TableProduct'
export const CardSale = ({ sale, serve }) => {
  
  const hasNote = sale.nota?.length > 0; 
  const handleServe = (idSale) => {
    serve(idSale)
  }

  return (
    <div className='card-sale'>
        <div className='card-sale__header'>
            <div className='card-sale__header-info'>
                <p>Mesa: {sale.nroMesa} </p>
                <p>Moso: {sale.username} {}</p>
                <p>hora: {sale.fecha} </p>
            </div>
            <div className='card-sale__header-nro'>
                <h1>
                    {sale.numero_pedido}
                </h1> 
            </div>
        </div>
        <div className='card-sale__body'>
            {
                sale.detalleVentas.length > 0 && 
                <TableProduct detalleVentas={sale.detalleVentas.filter(detail => detail.producto.tipo === 'comida')}/>
            }
        </div>
        {
                hasNote && <p><strong>NOTA:</strong> {sale.nota}</p>
        }
        <div className='card-sale__footer'>
            <button className='btn-main-green' onClick={() => handleServe(sale.id)}>Despachar</button>
            {/* Si hay nota */}
          {/*   <button className='btn-main-green' onClick={handlePrint}>Imprimir</button> */}
        </div>
    </div>
  )
}
