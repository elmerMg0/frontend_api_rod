import React, { useEffect, useState } from "react";
import { APISERVICE } from "../../services/api.services";
import { CardSale } from "./CardSale";

const Kitchen = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const a = setInterval(() => {
      getOrders();
    },5000)
    return (() => clearInterval(a));
  }, []);

  const getOrders = async () => {
    const url = "venta/";
    const { success, orders } = await APISERVICE.get(url);
    if (success) {
      setOrders(orders);
    }
  };

  const serve = async (idSale) => {
    const url = "venta/serve/?";
    const params = `idSale=${idSale}`;
    const { success } = await APISERVICE.get(url, params);
    if (success) {
      getOrders();
    }
  };

  return (
    <div>
      <div className="d-flex gap-2 mt-2 ">
        <h3>Cocina</h3>
        <button className="btn-main" onClick={() => getOrders()}>
          Actualizar
        </button>
      </div>
      <div className="orders-kitchen">
        {orders && orders.length > 0 ? (
          orders.map((sale) => (
            <CardSale key={sale.id} sale={sale} serve={serve} />
          ))
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default Kitchen;
