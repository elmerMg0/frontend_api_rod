export const TableReportProductRow = ({ prod }) => {
  return (
    <tr>
      <td>{prod.nombre_producto}</td>
      <td>{prod.cantidad_vendida}</td>
      <td>{prod.total_dinero}</td>
    </tr>
  );
};
