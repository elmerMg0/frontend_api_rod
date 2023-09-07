import React, { useState } from "react";
import historyProducts from "../../../assets/svg/historyProducts.svg";
import { useDispatch, useSelector } from "react-redux";
import { createView } from "../../../redux/states/dashboard";
import '../../../styles/administracion/navigation.css'
import { BottleIcon, BurgerIcon, Bussines, CategoryIcon, CustomerIcon, PeriodIcon, PosIcon, ProductsIcon, ReportIcon, SeetingsIcon, TablesIcon, TicketIcon, TrolleyIcon, UsersIcon } from "../../icons/Icons";
import { NavigationLink } from './NavigationLink'
import { listNavigation } from "../../../utilities/constans";


const Navigation = ({showNavigation, toggleNavigation}) => {
  const dispatch = useDispatch();
  const view = useSelector((store) => store.dashboard);
  const userRole = useSelector((store) => store.user.role);
 /*  const [navigationWidth, setNavigationWidth] = useState(widthNavigation.max); */
  const [navigationLeft, setNavigationLeft] = useState(false);

  const nameNavigationList = Object.values(listNavigation);

  const handleOnClick = (view) => {
    window.localStorage.setItem("view", view);
    dispatch(createView(view));
  };

  const changeView = (view) => {
    window.localStorage.setItem("view", view);
    dispatch(createView(view));
  };
  const companyLink = (
    <li className={view === "company" ? "bg-link" : ""}>
      <div
        onClick={() => handleOnClick("company")}
        className="navigation__content"
      >
        {/* <img src={bussines} alt="svgImg" /> */}
        <Bussines/>
        <button className="navigation__link">
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
        {/* <img src={users} alt="svgImg" /> */}
        <UsersIcon/>
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
        {/* <img src={customer} alt="svgImg" /> */}
        <CustomerIcon/>
        <button className="navigation__link" href="">
          Clientes
        </button>
      </div>
    </li>
  );

  const userDelivery = (
    <li className={view === "userDelivery" ? "bg-link" : ""}>
      <div
        onClick={() => handleOnClick("userDelivery")}
        className="navigation__content"
      >
        <CustomerIcon/>
        {/* <img src={customer} alt="svgImg" /> */}
        <button className="navigation__link" href="">
          Delivery
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
     {/*    <img src={product} alt="svgImg" /> */}
     <ProductsIcon/>
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
        {/* <img src={category} alt="svgImg" /> */}
        <CategoryIcon/>
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
        {/* <img src={trolley} alt="svgImg" /> */}
        <TrolleyIcon/>
        <button className="navigation__link" href="">
          App
        </button>
      </div>
    </li>
  );

  const posLink = (
    <li className={view === "pos" ? "bg-link" : ""}>
      <div onClick={() => handleOnClick("pos")} className="navigation__content">
        {/* <img src={pos} alt="svgImg" /> */}
        <PosIcon/>
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
     {/*    <img src={report} alt="svgImg" /> */}
        <ReportIcon/>
        <button className="navigation__link" href="">
          Reportes
        </button>
      </div>
    </li>
  );

  const loungesConfig = (
    <li className={view === "loungesConfig" ? "bg-link" : ""}>
      <div
        onClick={() => handleOnClick("loungesConfig")}
        className="navigation__content"
      >
        {/* <img src={nur} alt="svgImg" /> */}
        <button className="navigation__link" href="">
          Conf. Salones
        </button>
      </div>
    </li>
  );

  const lounges = (
    <li className={view === "lounges" ? "bg-link" : ""}>
      <div
        onClick={() => handleOnClick("lounges")}
        className="navigation__content"
      >
        <TablesIcon/>
        <button className="navigation__link" href="">
          Salones
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
        <TicketIcon/>
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
        <PeriodIcon/>
        <button className="navigation__link" href="">
          Periodo
        </button>
      </div>
    </li>
  );

  const detailPeriodLink = (
    <li className={view === "detailPeriod" ? "bg-link" : ""}>
      <div
        onClick={() => handleOnClick("detailPeriod")}
        className="navigation__content"
      >
        <PeriodIcon/>
        <button className="navigation__link" href="">
          Detalle Period
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
        <BottleIcon/>
        <button className="navigation__link" href="">
          Inventarios
        </button>
      </div>
    </li>
  );

  const currentnventaryLink = (
    <li className={view === "currentInventary" ? "bg-link" : ""}>
      <div
        onClick={() => handleOnClick("currentInventary")}
        className="navigation__content"
      >
        <img src={historyProducts} alt="svgImg" />
        <button className="navigation__link" href="">
          Inventarios Actual
        </button>
      </div>
    </li>
  );
  
  /* const printerLink = (
    <li className={view === "printer" ? "bg-link" : ""}>
      <div
        onClick={() => handleOnClick("printer")}
        className="navigation__content"
      >
        <img src={printer} alt="svgImg" />
        <button className="navigation__link" href="">
          Impresoras
        </button>
      </div>
    </li>
  ); */

  const printSpoolerLink = (
    <li className={view === "printSpooler" ? "bg-link" : ""}>
      <div
        onClick={() => handleOnClick("printSpooler")}
        className="navigation__content"
      >
        <SeetingsIcon/>
        <button className="navigation__link" href="">
          Cola imp.
        </button>
      </div>
    </li>
  );



  const expenseLink = (
    <li className={view === "expenseLink" ? "bg-link" : ""}>
      <div
        onClick={() => handleOnClick("expense")}
        className="navigation__content"
      >
        <SeetingsIcon/>
        <button className="navigation__link" href="">
          Gastos
        </button>
      </div>
    </li>
  );

/*   const navigationLink = (viewDashboard, Icon, name) => {
    return (
      <li className={view === viewDashboard ? "bg-link" : ""}>
      <div
        onClick={() => handleOnClick(viewDashboard)}
        className="navigation__content"
      >
        {iconsNavigation[viewDashboard]}
        <button className="navigation__link" href="">
          {name}
        </button>
      </div>
    </li>
    )
  } */

  return (
    <div
      className={`navigation ${showNavigation ? "show-navigation": ''}`}
      style={{ transition: "1s ease all" }}
    >
      <div className="burgericon" onClick={toggleNavigation}>
        <BurgerIcon/>
      </div>
      <div className="navigation__links">
        <ul>
          {
            nameNavigationList.map( (nav) => <NavigationLink key={nav.name} value={nav} changeView={changeView}/> ) 
          }
       {/*    {userRole.administrador && <NavigationLink viewDashboard='expense' name='Gastos' changeView={changeView}/>} */}
   {/*        {userRole.administrador && companyLink}
          {userRole.administrador && usersLink}
          {userRole.administrador && customerLink}
          {userRole.administrador && userDelivery}
          {userRole.administrador && productsLink}
          {userRole.administrador && categoriesLink}
          {appLink}
          {userRole.administrador && reportsLink}
          {userRole.administrador && detailPeriodLink}
          {userRole.administrador && reportProductLink }
          {userRole.administrador && loungesConfig}
          {lounges}
          {ticketLink}
          {userRole.administrador && inventaryLink}
          {userRole.administrador && currentnventaryLink}
          {userRole.administrador && printerLink}
          {userRole.administrador && printSpoolerLink}
          {expenseLink}
          {periodLink} */}
   
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
