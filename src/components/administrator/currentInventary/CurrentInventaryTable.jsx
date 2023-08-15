import React from "react";
import { Table } from "react-bootstrap";
import Paginator from "../../global/paginador/Paginator";
import CurrentInventaryTableRow from "./CurrentInventaryTableRow";
const CurrentInventaryTable = ({ inventaries, pageInfo, getInventaries }) => {
  return (
    <Table>
      <thead >
        <tr className="">
          <th>id</th>
          <th>Nombre</th>
          {/*   <th>Categoria</th> */}
          <th>Precio venta</th>
          <th>Precio compra</th>
          <th>Total</th>
          <th>Stock</th>
          <th>Diferencia</th>
        </tr>
      </thead>
      <tbody>
        {inventaries && inventaries.length > 0 ? (
          inventaries.map((inventary) => (
            <CurrentInventaryTableRow key={inventary.id} inventary={inventary} />
          ))
        ) : (
          <tr>
            <td style={{ textAlign: "center" }} colSpan={7}>
              No existen productos
            </td>
          </tr>
        )}
        <tr>
          <td colSpan={7}>
            {inventaries && inventaries.length > 0 && (
              <Paginator pageInfo={pageInfo} getData={getInventaries} />
            )}
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default CurrentInventaryTable;
