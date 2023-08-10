import { Modal, Table } from "react-bootstrap";
import { typeTicketExists, typesShow } from "./DeliveryApp";

const ModalOrderDetail = ({ show, saleInfo, products, setShowModal, getSaleDetailSample, setTypeTicket}) => {
    
    const handlePrintTicket = () => {
        setTypeTicket(typeTicketExists.DELIVERY)
        setShowModal(false);
        getSaleDetailSample(saleInfo.id, typesShow.PDF)
    }
    
    return (
    <Modal show={show} centered>
      <Modal.Header>
        <Modal.Title>Ticket: {saleInfo.numero_pedido}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-header__text">
          <p>Cajero: {saleInfo.username}</p>
          <p>Fecha: {saleInfo.fecha}</p>
          <p>Cliente: {saleInfo.nombre}</p>
          <p>Tipo Entrega: {saleInfo.tipo_entrega}</p>

          <p>Direccion: {saleInfo.direccion}</p>
          <p>Descripcion: {saleInfo.descripcion_domicilio}</p>
          <p>hora: {saleInfo.hora}</p>
          <p>telefono: {saleInfo.telefono}</p>
        </div>
        <Table>
          <thead>
            <tr>
              <th>Cantidad</th>
              <th>Producto</th>
              <th>Importe</th>
            </tr>
          </thead>
          <tbody>
            {products && products.length > 0 ? (
              products.map((prod) => {
                return (
                  <tr key={prod.id}>
                    <td>{prod.cantidad}</td>
                    <td>{prod.nombre}</td>
                    <td>{prod.precio_venta * prod.cantidad}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>vacio</td>
              </tr>
            )}
          </tbody>
        </Table>

        <div className="modal-footer__text">
          <p>TOTAL: {saleInfo.cantidad_total}</p>
         {/*  <p>Pagado: {saleInfo.cantidad_cancelada}</p> */}
          {/* <p>Vuelto: </p> */}
          {/* <p>TIpo de pago: {saleInfo.tipo_pago}</p> */}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={handlePrintTicket} className="btn-main">Imprimir</button>
        <button className="btn-main-red" onClick={() => setShowModal(false)}>
          Cerrar
        </button>
      </Modal.Footer>
    </Modal>
  );
};
export default ModalOrderDetail;
