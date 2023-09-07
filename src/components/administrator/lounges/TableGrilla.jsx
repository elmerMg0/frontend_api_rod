import React, { useContext } from "react";
import { OrderDetailContext } from "../../../context/orderDetail";
//const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;
const APIURLIMG = 'http://localhost:8080/upload/'
export const tableStates = {
  DISPONIBLE: 'disponible',
  OCUPADO: 'ocupado',
  CAMINO: 'camino'
}

const TablesGrilla = ({ tables, loungeInfo, setShowPos, loading }) => {
  if(loading) return <h5 className="content-loader title">Cargando....</h5>
  if(Object.keys(loungeInfo).length === 0 || (loungeInfo.nro_columnas * loungeInfo.nro_filas) !== tables.length)return;
  const { setTableSelected } = useContext(OrderDetailContext) 

  const handleChangeState = (table) => {
    setTableSelected(table)
    setShowPos(true);
  }

  const styleTables = {
    backgroundImage: `url(${APIURLIMG}${loungeInfo.url_image})`,
    gridTemplateColumns: `repeat(${loungeInfo.nro_columnas}, 1fr)`,
    gridTemplateRows: `repeat(${loungeInfo.nro_filas}, 1fr)`,
  }

  return (
    <div
      style={styleTables}
      className="tables"
    >
      {tables && tables.length > 0
        ? tables.map((table) => {
          let className = 'table-card '
          if(table.estado === tableStates.OCUPADO) className = className + 'table-card__disabled'
          if(table.estado === tableStates.DISPONIBLE) className = className + 'table-card__available'
            return (<div key={table.id} style={{width: '100%', height: '100%'}}>
                {
                  table.habilitado ? 
                  <div
                  key={table.id}
                  className={`${className}`}
                  onClick={() => handleChangeState(table)}
                  >
                  <h5>{table.nombre}</h5>
                </div>
                  :
                    <div
                    key={table.id}
                    className='table-card__empty'
                    >
                    </div>
                  }
                </div>
            );
          })
        : "No existen mesas"}
    </div>
  );
};

export default TablesGrilla;
