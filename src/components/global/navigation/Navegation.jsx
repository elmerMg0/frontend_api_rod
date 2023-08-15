import React, { useState } from "react";
import bussines from "../../../assets/svg/bussines.svg";
import { Bussines, CategoryIcon, HistoryProductsIcon, PeriodIcon, PosIcon, ReportIcon, TicketIcon, TrolleyIcon, UsersIcon } from "../../icon/Icons";
import customer from "../../../assets/svg/customer.svg";
import users from "../../../assets/svg/users.svg";
import product from "../../../assets/svg/product.svg";
import { ProductsIcon } from "../../icon/Icons";
import category from "../../../assets/svg/category.svg";
import pos from "../../../assets/svg/pos.svg";
import report from "../../../assets/svg/report.svg";
import historyProducts from "../../../assets/svg/historyProducts.svg";
import arrowLeft from "../../../assets/svg/arrowLeft.svg";
import arrowRigth from "../../../assets/svg/arrowRigth.svg";
import { useDispatch, useSelector } from "react-redux";
import { createView } from "../../../redux/states/dashboard";
import period from '../../../assets/svg/period.svg';
import ticket from "./../../../assets/svg/ticket.svg";
import trolley from "./../../../assets/svg/trolley.svg";
import '../../../styles/administracion/navigation.css'
import { CurrentInventary } from "../../icon/Icons";
const widthNavigation = {
    min: 65,
    max: 167
}

const Navegation = () => {
  const dispatch = useDispatch();
  const view = useSelector((store) => store.dashboard);
  const userRole = useSelector((store) => store.user.role);
  const [navigationWidth, setNavigationWidth] = useState(widthNavigation.min);
  const [navigationLeft, setNavigationLeft] = useState(false);
  const handleOnClick = (view) => {
    window.localStorage.setItem("view", view);
    dispatch(createView(view));
  };

  const handleNavigationWidth = () => {
    if (navigationWidth === widthNavigation.min) {
      setNavigationWidth(widthNavigation.max);
      setNavigationLeft(false);
    } else {
      setNavigationLeft(true);
      setNavigationWidth(widthNavigation.min);
    }
  };

  const companyLink = (
    <li className={view === "company" ? "bg-link" : ""}>
      <div
        onClick={() => handleOnClick("company")}
        className="navigation__content"
      >
        <img src={bussines} alt="svgImg" />
        {/* <Bussines/> */}
        <button className="navigation__link" to="/">
          Empresa
        </button>
      </div>
    </li>
  );

  const usersLink = (
    <li className={view === "user" ? "bg-link" : ""}>
      <div
        onClick={() => handleOnClick("user")}
        className="navigation__content"
      >
        <img src={users} alt="svgImg" />
       {/*  <UsersIcon/> */}
        <button className="navigation__link" href="">
          Usuarios
        </button>
      </div>
    </li>
  );


  const customerLink = (
    <li className={view === "customer" ? "bg-link" : ""}>
      <div
        onClick={() => handleOnClick("customer")}
        className="navigation__content"
      >
        <img src={customer} alt="svgImg" />
        <button className="navigation__link" href="">
          Clientes
        </button>
      </div>
    </li>
  );

  const productsLink = (
    <li className={view === "product" ? "bg-link" : ""}>
      <div
        onClick={() => handleOnClick("product")}
        className="navigation__content"
      >
        <img src={product} alt="svgImg" />
        {/* <ProductsIcon/> */}
        <button className="navigation__link" href="">
          Productos
        </button>
      </div>
    </li>
  );

  const categoriesLink = (
    <li className={view === "category" ? "bg-link" : ""}>
      <div
        onClick={() => handleOnClick("category")}
        className="navigation__content"
      >
        <img src={category} alt="svgImg" />
       {/*  <CategoryIcon/> */}
        <button className="navigation__link" href="">
          Categorias
        </button>
      </div>
    </li>
  );

  const appLink = (
    <li className={view === "orderApp" ? "bg-link" : ""}>
      <div
        onClick={() => handleOnClick("orderApp")}
        className="navigation__content"
      >
        <img src={trolley} alt="svgImg" />
       {/* <TrolleyIcon/> */}
        <button className="navigation__link" href="">
          App
        </button>
      </div>
    </li>
  );

  const posLink = (
    <li className={view === "pos" ? "bg-link" : ""}>
      <div onClick={() => handleOnClick("pos")} className="navigation__content">
        <img src={pos} alt="svgImg" />
        {/* <PosIcon/> */}
        <button className="navigation__link" href="">
          Pos
        </button>
      </div>
    </li>
  );

  const reportsLink = (
    <li className={view === "report" ? "bg-link" : ""}>
      <div
        onClick={() => handleOnClick("report")}
        className="navigation__content"
      >
        <img src={report} alt="svgImg" />
      {/* <ReportIcon/> */}
        <button className="navigation__link" href="">
          Reportes
        </button>
      </div>
    </li>
  );

  const ticketLink = (
    <li className={view === "saleHistory" ? "bg-link" : ""}>
      <div
        onClick={() => handleOnClick('saleHistory')}
        className="navigation__content"
      >
        <img src={ticket} alt="svgImg" />
        {/* <TicketIcon/> */}
        <button className="navigation__link" href="">
          Historial
        </button>
      </div>
    </li>
  );

  const periodLink = (
    <li className={view === "period" ? "bg-link" : ""}>
      <div
        onClick={() => handleOnClick("period")}
        className="navigation__content"
      >
        <img src={period} alt="svgImg" />
       {/* <PeriodIcon/> */}
        <button className="navigation__link" href="">
          Periodo
        </button>
      </div>
    </li>
  );

  const reportProductLink = (
    <li className={view === "reportProduct" ? "bg-link" : ""}>
      <div
        onClick={() => handleOnClick("reportProduct")}
        className="navigation__content"
      >
        <img src={historyProducts} alt="svgImg" />
        <button className="navigation__link" href="">
          Reporte Producto
        </button>
      </div>
    </li>
  );

  const inventaryLink = (
    <li className={view === "inventary" ? "bg-link" : ""}>
      <div
        onClick={() => handleOnClick("inventary")}
        className="navigation__content"
      >
        <img src={historyProducts} alt="svgImg" />
     {/*   <HistoryProductsIcon/> */}
        <button className="navigation__link" href="">
          Inventario
        </button>
      </div>
    </li>
  );

  const inventaryCurrentLink = (
    <li className={view === "inventaryCurrent" ? "bg-link" : ""}>
      <div
        onClick={() => handleOnClick("inventaryCurrent")}
        className="navigation__content"
      >
        <img src={historyProducts} alt="svgImg" />
        {/* <CurrentInventary/> */}
        <button className="navigation__link" href="">
          Inv. Actual
        </button>
      </div>
    </li>
  );
  return (
    <div
      className="navigation"
      style={{ width: `${navigationWidth}px`, transition: "1s ease all" }}
    >
      <div className="navigation__links">
        <ul>
          {userRole.administrador && companyLink}
          {userRole.administrador && usersLink}
          {/* {userRole.administrador && customerLink} */}
          {productsLink}
          {categoriesLink}
          {posLink}
          {appLink}
          {userRole.administrador && reportsLink}
          {userRole.administrador && reportProductLink }
          {userRole && ticketLink}
          {userRole.administrador && inventaryLink }
          {userRole.administrador && inventaryCurrentLink }
          {periodLink}
          <button
            className="btn-maxmin"
            onClick={() => handleNavigationWidth()}
          >
            {navigationLeft ? (
              <img src={arrowRigth} alt="" />
            ) : (
              <img src={arrowLeft} alt="" />
            )}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Navegation;
