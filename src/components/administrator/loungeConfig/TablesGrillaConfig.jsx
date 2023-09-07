import React from "react";
//const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;
const  APIULRIMG = 'http://localhost:8080/upload/'
const TablesGrillaConfig = ({ tables, loungeInfo, setTableToEdit, setShowModalTable}) => {
  if(Object.keys(loungeInfo).length === 0 || (loungeInfo.nro_columnas * loungeInfo.nro_filas) !== tables.length)return;

  const handleChangeState = (table) => {
    setTableToEdit(table);
    setShowModalTable(true);
  }

  const styleTables = {
    backgroundImage: `url(${APIULRIMG}${loungeInfo.url_image})`,
    gridTemplateColumns: `repeat(${loungeInfo.nro_columnas}, 1fr)`,
    gridTemplateRows: `repeat(${loungeInfo.nro_filas}, 1fr)`,
  }

  return (
    <div
    className="tables"
    style={styleTables}
    >
      {tables?.length > 0
        ? tables.map((table) => {
            let styles = ''
            if(table.habilitado) styles = 'table-card__enabled'
            return (
              <div
                key={table.id}
                className={`table-card ${styles}`}
                onClick={() => handleChangeState(table)}
              >
                {table.nombre}
              </div>
            );
          })
        : "No existen mesas"}
    </div>
  );
};

export default TablesGrillaConfig;
