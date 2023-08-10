import { Table } from "react-bootstrap";
import OrderTableRow from "./OrderTableRow";

const OrderTable = ({ sales, getSaleDetailSample, updateState }) => {
  return (
    <Table>
      <thead className="head-table">
        <tr>
          <th style={{borderTopLeftRadius: "10px"}}>Numero de pedido</th>
          <th>Nombre</th>
          <th>Cantidad Total</th>
          <th>Estado</th>
          <th>Hora</th>
          <th>Tipo Entrega</th>
          <th style={{borderTopRightRadius: "10px"}}>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {sales && sales.length > 0
          ? sales.map((sale) => {
              return (
                <OrderTableRow
                  sale={sale}
                  getSaleDetailSample={getSaleDetailSample}
                  updateState={updateState}
                />
              );
            })
          : <tr><td colSpan={7}>No hay pedidos</td></tr>}
      </tbody>
    </Table>
  );
};
export default OrderTable;
