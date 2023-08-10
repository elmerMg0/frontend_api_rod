import trash from "../../../assets/svg/trash.svg";
import eyes from "../../../assets/svg/eyes.svg";

export const saleState = {
  PAGADO: 'pagado',
  CANCELADO: 'cancelado',
  PENDIENTE: 'pendiente',
  ENVIADO: 'enviado'
}

const TableHistoryRow = ({ sale, getSaleDetailSample, setShowModalConfirm, setSaleToCancel}) => {

  const handleShowSale = () => {
    getSaleDetailSample( sale.id )
  }

  const handleCancelSale = () => {
    setSaleToCancel(sale.id);
    setShowModalConfirm(true);
  }

  return (
    <tr>
      <td>{sale.numero_pedido}</td>
      <td>{ sale.fecha.slice('.', 19)}</td>
      <td>{sale.cantidad_total}</td>
      <td>{sale.username}</td>
      <td>{sale.tipo_pago}</td>
      <td>{sale.nombre}</td>
      <td className="history-state"> 
        {sale.estado === saleState.PAGADO && <button className="btn-main-green">{sale.estado}</button>}
        {sale.estado === saleState.CANCELADO && <button className="btn-main-red">{sale.estado}</button>}
        {sale.estado === saleState.PENDIENTE && <button className="btn-main-yellow">{sale.estado}</button>}
        {sale.estado === saleState.ENVIADO && <button className="btn-main-send">{sale.estado}</button>}
      </td>
      <td>
        <button className="btn-main" onClick={handleShowSale}>
          <img src={eyes} alt="" />
        </button>{" "}
        <button className="btn-main-red" onClick={handleCancelSale}>
          <img src={trash} alt="icon trash"/>
        </button>
      </td>
    </tr>
  );
};
export default TableHistoryRow;
