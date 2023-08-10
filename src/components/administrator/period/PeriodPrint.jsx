import { forwardRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const date = new Date().toLocaleDateString();

const PeriodPrint = forwardRef(({infoPeriod, fullCount}, ref) => {
  const username = useSelector((store) => store.user.username);
  const [hour, setHour] = useState(null);

  useEffect(() => {
    let hourCurrently = new Date().toLocaleTimeString();
    setHour(hourCurrently);
  }, []);

  return (
    <section ref={ref}>
      {Object.keys(infoPeriod).length > 0 && (
        <>
          <div>
            <p>Usuario: {username}</p>
            <h5>Corte de caja</h5>
            <p>{infoPeriod.fecha_inicio}</p>
            <p>Desde: {`${infoPeriod.fechaInicio.slice(0, 19)}`} </p>
            <p>Hasta: {`${date} ${hour}`}</p>
            <p></p>
          </div>
          <div>
            <p>{`Apertura de Caja: ${infoPeriod.cajaInicial}`}</p>
            <p>{`Ventas Efectivo: ${infoPeriod.totalSaleCash}`}</p>
            <p>{`Ventas Tarjeta: ${infoPeriod.totalSaleCard}`}</p>
            <p>{`Ventas Transferencia: ${infoPeriod.totalSaleTransfer}`}</p>
            <p>{`Ventas App: ${infoPeriod.totalSaleApp}`}</p>
          </div>
          <div>
            <p>{`Total Ventas: ${infoPeriod.totalSale}`}</p>
            <p>{`Total calculado: ${
              infoPeriod.totalSale + infoPeriod.cajaInicial
            }`}</p>
            <p>{`Total contado: ${fullCount}`}</p>
            <p>{`Diferencia: ${
              fullCount - (infoPeriod.totalSale + infoPeriod.cajaInicial)
            }`}</p>
          </div>
        </>
      )}
    </section>
  );
});
export default PeriodPrint;
