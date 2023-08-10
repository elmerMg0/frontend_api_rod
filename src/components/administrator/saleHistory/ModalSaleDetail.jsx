import { Modal, Table } from "react-bootstrap";

const ModalSaleDetail = ({ show, saleInfo, products, setShowModal, setShowPdfOrder,getSaleDetailSample}) => {

  const handlePrint = () =>{
    /* getSaleDetailSample(saleInfo.id) */
    setShowPdfOrder(true);
    setShowModal(false);
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
          <p>Pagado: {saleInfo.cantidad_cancelada}</p>
          {/* <p>Vuelto: </p> */}
          <p>TIpo de pago: {saleInfo.tipo_pago}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn-main" onClick={handlePrint}>Imprimir</button>
        <button className="btn-main-red" onClick={() => setShowModal(false)}>
          Cerrar
        </button>
      </Modal.Footer>
    </Modal>
  );
};
export default ModalSaleDetail;
