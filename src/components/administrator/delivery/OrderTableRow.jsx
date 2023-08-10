import { saleState } from "../saleHistory/TableHistoryRow";
import { typesShow } from "./DeliveryApp";

const OrderTableRow = ({ sale, getSaleDetailSample, updateState}) => {

    const handleConfirm = (id, type) => {
        getSaleDetailSample(id, type)
    }

    const handleCollectMoney = () => {
      updateState(saleState.PAGADO, sale.id);
    }
  return (
    <tr>
      <td>{sale.numero_pedido}</td>
      <td>{sale.nombre}</td>
      <td>Bs. {sale.cantidad_total}</td>
      <td className="history-state"> 
        {sale.estado === saleState.PAGADO && <button className="btn-main-green">{sale.estado}</button>}
        {sale.estado === saleState.CANCELADO && <button className="btn-main-red">{sale.estado}</button>}
        {sale.estado === saleState.PENDIENTE && <button className="btn-main-yellow">{sale.estado}</button>}
        {sale.estado === saleState.ENVIADO && <button className="btn-main-send">{sale.estado}</button>}
      </td>
      <td>{sale.hora}</td>
      <td>{sale.tipo_entrega}</td>
      <td>
        <button  className="btn-main" onClick={() => handleConfirm(sale.id,  typesShow.MODAL)}>Ver</button>{" "}
        {
          sale.estado === saleState.ENVIADO ? 
          <button style={{minWidth: '100px'}} className="btn-main" onClick={handleCollectMoney}>Cobrar</button>
          :
          <button  style={{minWidth: '100px'}} className="btn-main-green" onClick={() => handleConfirm(sale.id, typesShow.PDF) }>Confirmar</button>
        }
      </td>
    </tr>
  );
};
export default OrderTableRow;
