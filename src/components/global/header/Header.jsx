import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import chevronDown from "../../../assets/svg/chevronDown.svg";
import { resetUser, UserKey } from "../../../redux/states/user";
import { clearLocalStorage } from "../../../utilities/localStorage.utility";
import { useNavigate } from "react-router-dom";
import { PublicRoutes } from "../../../models/routes";
import "../../../styles/administracion/header.css";
import { APISERVICE } from "../../../services/api.services";
import defaultPhoto from "../../../assets/img/fotoDeault.webp";
import { BurgerIcon, UsersIcon } from "../../icons/Icons";
import Navigation from "../navigation/Navigation";
const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;
const Header = () => {
  const { username } = useSelector((store) => store.user);
  const quantityOrders = useSelector(store => store.deliverySlice)

  const [show, setShow] = useState(false);
  const [company, setCompany] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showNavigation, setshowNavigation] = useState(false)
  const handleOpenModal = () => {
    setShow(!show);
  };

  useEffect(() => {
    getCompany();
  }, []);

  const getCompany = async () => {
    const url = "empresa/get-company";
    const params = "";
    const { success, data } = await APISERVICE.get(url, params);
    if (success) {
      setCompany(data);
    }
  };

  const handleLogOut = () => {
    dispatch(resetUser());
    clearLocalStorage(UserKey);
    navigate(`/${PublicRoutes.LOGIN}`, { replace: true });
  };
  const toggleNavigation = () => {
    setshowNavigation(!showNavigation)
  }

  return (
    <header className="">
    <Navigation showNavigation={showNavigation} toggleNavigation={toggleNavigation}/>
    <div className="header">
      <div className="header-logo">
        <div onClick={toggleNavigation}>
          <BurgerIcon/>
        </div>
        {company ? (
          <>
            <div className="header-logo__image">
              <img src={`${APIURLIMG}${company.image_url}`} alt="" />
            </div>
            <h5>{company.nombre}</h5>
          </>
        ) : (
          <>
            <div className="header-logo__image">
              <img src={defaultPhoto} alt="" />
            </div>
            <h5>Jevesoft</h5>
          </>
        )}
      </div>
      <div className="header-user">
          {
            quantityOrders.quantity > 0 &&
            <p className="total-orders">{quantityOrders.quantity}</p>
          }
        <h5>Hola, {username} </h5>
        <UsersIcon/>
        <img
          onClick={() => handleOpenModal()}
          src={chevronDown}
          alt="down-icon"
          />
        {show && (
          <div className="header-user__menu">
            <div className="header-user__text">
              <h5>Logeado como</h5>
              <h5>{username}</h5>
            </div>
            {/*    <h5 className='header-user__text'>Cerrar caja</h5> */}
            <h5 className="header-user__text" onClick={handleLogOut}>
              Cerrar Sesión
            </h5>
          </div>
        )}
      </div>
    </div>
     </header>
  );
};

export default Header;
