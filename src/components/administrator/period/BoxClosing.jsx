import React, { useEffect, useState } from "react";
import { Form, FormGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createView } from "../../../redux/states/dashboard";
import { Toaster, toast } from "react-hot-toast";

const initialState = {
  initialAmount: 0,
  totalSaleCash: "",
  totalSaleTransfer: "",
  totalSaleCard: "",
  totalGlobal: "",
  totalSale: '',
  total: "",
  totalSaleApp: '',
  period: null,
};

const date = new Date().toLocaleDateString();

const BoxClosing = ({ closeBox, infoBoxClose, setFullCount }) => {
  const { username } = useSelector((store) => store.user);
  const [infoPeriod, setinfoPeriod] = useState(initialState);
  const [currentTime, setCurrentTime] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {

    if (infoBoxClose !== undefined && Object.keys(infoBoxClose).length > 0) {
      setinfoPeriod({...infoPeriod,...infoBoxClose});
    }
  }, [infoBoxClose]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOnChange = (e) => {
    setinfoPeriod({ ...infoPeriod, [e.target.name]: e.target.value });
    setFullCount(e.target.value);
  };

  const handleCloseBox = () => {
    //validar total sea entero
    if (infoPeriod.total > 0) {
      closeBox(infoPeriod.total);
      setinfoPeriod(initialState);
    }else{
      messageToastError('Ingrese la cantidad total!')
    }
  };

  const messageToastError = (sms) => {
    toast.error(sms)
  }

  const handleBack = () => {
    window.localStorage.setItem("view", "pos");
    dispatch(createView("pos"));
  };
  return (
    <div className="box-closing">
      <h5>Cierre de Caja</h5>
      {
        infoPeriod &&
        <div className="period-dates">
          <p>Desde: {infoPeriod.fechaInicio} </p>
          <p>
            hasta: {date} {currentTime}
          </p>
        </div>
      }
      <div className="box-opening__form">
        <FormGroup>
          <label htmlFor="username">Usuario</label>
          <Form.Control id='username' type="text" value={username} readOnly />
        </FormGroup>
        <FormGroup>
          <label htmlFor="montoInicial">Monto Inicial</label>
          <Form.Control
            type="text"
            id='montoInicial'
            value={infoPeriod.cajaInicial}
            placeholder="Bs.- 0"
            readOnly
            //onChange={(e) => setInitialAmount(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="totalEfectivo">Total Efectivo</label>
          <Form.Control
            type="text"
            placeholder="0"
            value={infoPeriod.totalSaleCash}
            readOnly
            id='totalEfectivo'
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="totalTransferencia">Total Transferencia</label>
          <Form.Control
            type="text"
            placeholder="0"
            value={infoPeriod.totalSaleTransfer}
            readOnly
            id='totalTransferencia'
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="totalTarjeta">Total Tarjeta</label>
          <Form.Control
            type="text"
            placeholder="0"
            value={infoPeriod.totalSaleCard}
            readOnly
            id='totalTarjeta'
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="totalGlobal">Total Global</label>
          <Form.Control
            type="text"
            placeholder="0"
            value={Number(infoPeriod.totalSale) + Number(infoPeriod.cajaInicial)}
            readOnly
            id='totalGlobal'
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="totalApp">Total App</label>
          <Form.Control
            type="text"
            placeholder="0"
            value={infoPeriod.totalSaleApp}
            readOnly
            id='totalApp'
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="total">Total</label>
          <Form.Control
            type="text"
            placeholder=""
            value={infoPeriod.total}
            name="total"
            id='total'
            onChange={handleOnChange}
          />
        </FormGroup>
      </div>

      <div>
        <button className="btn-main" onClick={handleBack}>
          Regresar
        </button>{" "}
        <button className="btn-main-green" onClick={handleCloseBox}>
          Cerrar caja
        </button>
      </div>
      <Toaster position="top-right"/>
    </div>
  );
};

export default BoxClosing;
