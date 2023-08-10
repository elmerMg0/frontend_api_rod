import React, { useState, useEffect } from "react";
import { Form, FormGroup } from "react-bootstrap";
import { useSelector } from "react-redux";

const BoxOpening = ( {openBox} ) => {
  const username = useSelector((store) => store.user.username);
  const [initialAmount, setInitialAmount] = useState(0);
  const [dateCurrently] = useState(
    new Date().toLocaleDateString()
  );
  const [currentTime ,setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenBox = () => {
    openBox( initialAmount );
  }

  return (
    <div className="box-opening">
      <h5>Apertura de Caja</h5>
      <div className="box-opening__form">
        <FormGroup>
          <label htmlFor="usuario">Usuario</label>
          <Form.Control value={username} readOnly id='usuario'/>
        </FormGroup>
        <FormGroup>
          <label htmlFor="montoInicial">Monto Inicial</label>
          <Form.Control
            id='montoInicial'
            value={initialAmount}
            placeholder="Bs 100"
            onChange={(e) => setInitialAmount(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="fecha">Fecha</label>
          <Form.Control value={dateCurrently} readOnly id='fecha' />
        </FormGroup>

        <FormGroup>
          <label htmlFor="hora">Hora</label>
          <Form.Control
            type="text"
            value={new Date().toLocaleTimeString()}
            readOnly
            id='hora'
          />
        </FormGroup>
        <div>
           {/*  <button className="btn-main-green">Regresar</button>{" "}  */}
            <button className="btn-main-green" onClick={handleOpenBox}>Abrir caja</button> 
        </div>
      </div>
    </div>
  );
};

export default BoxOpening;
