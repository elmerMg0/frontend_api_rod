import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import user from "../../../assets/svg/user.svg";
import chevronDown from "../../../assets/svg/chevronDown.svg";
import { resetUser, UserKey } from "../../../redux/states/user";
import { clearLocalStorage } from "../../../utilities/localStorage.utility";
import { useNavigate } from "react-router-dom";
import { PublicRoutes } from "../../../models/routes";
import "../../../styles/administracion/header.css";
import { APISERVICE } from "../../../services/api.services";
import defaultPhoto from "../../../assets/img/fotoDeault.webp";
const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;
const Header = () => {
  const { username } = useSelector((store) => store.user);
  const [show, setShow] = useState(false);
  const [company, setCompany] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  return (
    <div className="header">
      <div className="header-logo">
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
        <h5>Hola, {username} </h5>
        <img src={user} alt="user-icon" />
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
  );
};

export default Header;
