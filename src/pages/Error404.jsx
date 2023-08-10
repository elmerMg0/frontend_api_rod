import React from "react";
import "../styles/administracion/error404.css";

const Error404 = () => {
  return (
    <div className="error-container">
      <h1 className="error-heading">404 Error</h1>
      <p className="error-message">La página que buscas no se encuentra disponible.</p>
    </div>
  );
};

export default Error404;
