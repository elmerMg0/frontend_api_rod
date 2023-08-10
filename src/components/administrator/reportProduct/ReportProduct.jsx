import React, { useEffect, useState } from "react";
import "../../../styles/administracion/reportProduct.css";
import TableReportProduct from "./TableReportProduct";
import { APISERVICE } from "../../../services/api.services";
import { useReactToPrint } from "react-to-print";

const date = new Date();
const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
const month =
  date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
const dateCurrently = date.getFullYear() + "-" + month + "-" + day;

const ReportProduct = () => {
  const [reportsProduct, setReportsProduct] = useState([]);
  const [dateSelected, setDateSelected] = useState(dateCurrently);
  const [total, setTotal] = useState(0)

  useEffect(() => {
    getReportsByProduct();
  }, []);

  const getReportsByProduct = async () => {
    const url = "venta/get-products-sale-by-day";
    const body = {
      fecha: dateSelected,
    };
    const { success, reports } = await APISERVICE.post(body, url);
    if (success) {
      setTotal(reports.reduce( (ac, val) => ac + Number(val.total_dinero), 0));
      setReportsProduct(reports);
    } else {
    }
  };

  const componentRef = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <section className="report-product">
      <section className="report-product__header">
        <h3 style={{ marginBottom: "20px" }}>Reportes de Producto</h3>
        <div className="report-header-seekers">
          <input
            type="date"
            value={dateSelected}
            name="dateSelected"
            onChange={(e) => setDateSelected(e.target.value)}
          />
          <button className="btn-main" onClick={() => getReportsByProduct()}>
            Buscar
          </button>
          <button className="btn-main-green" onClick={handlePrint}>
            Imprimir
          </button>
        </div>
      </section>

      <TableReportProduct
        ref={componentRef}
        reportsProduct={reportsProduct}
        date={dateSelected}
        total={total}
      />
    </section>
  );
};
export default ReportProduct;
