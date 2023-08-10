import { Table } from "react-bootstrap";
import TableHistoryRow from "./TableHistoryRow";
import Paginador from '../../global/paginador/Paginator'
import { useSelector } from "react-redux";
const TableHistory = ({ sales, salesInfo, getSaleDetails, getSaleDetailSample, setShowModalConfirm, setSaleToCancel, getSaleDetailsByPeriod}) => {

  const user = useSelector(store => store.user);

  return (
    <div>
      <Table>
        <thead className="head-table">
          <tr>
            <th className="borTopLeftRa">Id</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Usuario</th>
            <th>Tipo Pago</th>
            <th>Cliente</th>
            <th>Estado</th>
            <th className="borTopRightRa">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sales && sales.length > 0 ? (
            sales.map((sale) => {
              return <TableHistoryRow key={sale.id} sale={sale} getSaleDetailSample={getSaleDetailSample} setShowModalConfirm={setShowModalConfirm} setSaleToCancel={setSaleToCancel}/>;
            })
          ) : (
            <tr>
                <td style={{textAlign: 'center'}} colSpan={8}>No existen registros!</td>
            </tr>
          )}
          <tr>
            {
              user.role.administrador ?
               <td colSpan={8}>
              {sales && sales.length > 0 && <Paginador pageInfo={salesInfo} getData={getSaleDetails}/>} 
            </td>
            :
            <td colSpan={8}>
            {sales && sales.length > 0 && <Paginador pageInfo={salesInfo} getData={getSaleDetailsByPeriod}/>} 
          </td>
          }
          </tr>
        </tbody>
      </Table>
    </div>
  );
};
export default TableHistory;
