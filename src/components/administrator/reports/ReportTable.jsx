import { useState } from "react";
import { Table} from "react-bootstrap";
import ReportTableRow from "./ReportTableRow";
import Paginador from "./../../global/paginador/Paginator";
import { Toaster, toast } from "react-hot-toast";

const initialState = {
  fechaInicio: "",
  fechaFin: "",
  usuarioId: "",
};

const ReportTable = ({
  salesByDay,
  getSalesByDay,
  users,
  pageInfoUsers,
  setInfoSeeker,
  infoPagination,
}) => {
  const [infoSearchSales, setInfoSearchSales] = useState(initialState);

  const handleSearch = () => {
    if (isValid()) {
      const pageNumber = 1;
      setInfoSeeker(infoSearchSales);
      getSalesByDay(pageNumber, infoSearchSales);
      //handleToastSuccess('Registro Cargado')
    }
  };
  const isValid = () => {
    if (infoSearchSales.fechaInicio === "") {
      handleToast(`Fecha Inicio vacia`);
      return false;
    }
    if (infoSearchSales.fechaFin === "") {
      handleToast(`Fecha Fin vacia`);
      return false;
    }
    if (infoSearchSales.usuarioId === "") {
      handleToast(`Selecione un usuario`);
      return false;
    }
    return true;
  };
  const handleOnChange = (e) => {
    setInfoSearchSales({ ...infoSearchSales, [e.target.name]: e.target.value });
  };

  const handleToast = (sms) => {
    toast.error(sms);
  };
 /*  const handleToastSuccess = (sms) => {
    toast.success(sms);
  }; */
  return (
    <div>
      <div className="report-header-seekers">
        <div className="d-flex flex-column">
          <label htmlFor="">Fecha Inicio</label>
          <input
            name="fechaInicio"
            value={infoSearchSales.fechaInicio}
            type="date"
            onChange={handleOnChange}
          />
        </div>
        <div className="d-flex flex-column">
          <label htmlFor="">Fecha Fin</label>
          <input
            name="fechaFin"
            value={infoSearchSales.fechaFin}
            type="date"
            onChange={handleOnChange}
          />
        </div>
        <div className="d-flex flex-column">
          <label htmlFor="">Usuario</label>
          <select
            className="report-header-select"
            name="usuarioId"
            id="usuarioId"
            value={infoSearchSales.usuarioId}
            onChange={handleOnChange}
          >
            <option value="">Seleccione un usuario</option>
            {users &&
              users.length > 0 &&
              users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.nombres}
                </option>
              ))}
            <option value="todos">Todos</option>
          </select>
        </div>
        <div className="d-flex flex-column justify-content-end">
          <button className="btn-main" on onClick={handleSearch}>
            Buscar
          </button>
        </div>
      </div>
      <Table>
        <thead className="head-table">
          <tr>
            {/* <th>Id</th> */}
            <th className="borTopLeftRa">Fecha</th>
            <th>Usuario</th>
            <th className="borTopRightRa" style={{textAlign:'center'}}>Cantidad Total</th>
          </tr>
        </thead>
        <tbody>
          {salesByDay && salesByDay.length > 0 ? (
            salesByDay.map((sale) => (
              <ReportTableRow key={sale.id + sale.cantidad} sale={sale} />
            ))
          ) : (
            <tr>
              <td style={{textAlign: 'center'}} colSpan={3}>No existen registros!</td>
            </tr>
          )}
          {salesByDay.length > 0 && (
            <tr>
              <td colSpan={3}>
                <Paginador pageInfo={infoPagination} getData={getSalesByDay} />
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <Toaster position="top-right" />
    </div>
  );
};
export default ReportTable;
