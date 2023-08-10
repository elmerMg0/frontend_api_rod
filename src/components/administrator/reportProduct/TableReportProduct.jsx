import { Table } from "react-bootstrap";
import { TableReportProductRow } from "./TableReportProductRow";
import { forwardRef } from "react";

const TableReportProduct = forwardRef((props, ref) => {
  return (
    <div className="report-table">
      <Table ref={ref} className="report-product__table">
        <thead className="head-table">
          <tr>
            <th style={{ borderTopLeftRadius: "10px" }}>Nombre Producto</th>
            <th>Cantidad</th>
            <th style={{ borderTopRightRadius: "10px" }}>Total</th>
          </tr>
        </thead>
        <tbody>
          {props.reportsProduct && props.reportsProduct.length > 0 ? (
            props.reportsProduct.map((prod) => (
              <TableReportProductRow key={prod.idProduct} prod={prod} />
            ))
          ) : (
            <tr>
              <td colSpan={3}>No existen registros</td>
            </tr>
          )}
        </tbody>
        <tr>
          <td colSpan={2}>Fecha: {props.date}</td>
          <td>{props.total}</td>
        </tr>
        <tr></tr>
      </Table>
    </div>
  );
});
export default TableReportProduct;
