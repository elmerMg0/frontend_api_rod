import logo from "../../../../assets/img/logo.webp";
import imgCarrito from "../../../../assets/svg/shopCar.svg";
import search2 from "../../../../assets/svg/searchGris.svg";
import "../../../../styles/carrito/header.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { Search } from '../../../global/icons/Icons'

import Seeker from "./Seeker";
const Header = ({ setShowProducts, showProducts, setShowSearch, showSearch, setFilters }) => {
  const [totalOrders, setTotalOrders] = useState(0);
  const orderDetail = useSelector((store) => store.carritoUser);

  useEffect(() => {
    setTotalOrders(orderDetail.length);
  }, [orderDetail]);

  const handleShowCarrito = () => {
    setShowProducts(false);
  };

  const toggleSearch = () => {
    setShowSearch((prevState) => !prevState);
    
  };
  return (
    <section>
      <header className="bg-header">
       {/*  <Search onClick={toggleSearch}/> */}
        <img src={search2} onClick={toggleSearch} />

        <div className="bg-header__img">
          <img
            src={logo}
            alt="logo apis ya"
            onClick={() => setShowProducts(true)}
          />
        </div>
        <div className="bg-header__shopicon" onClick={handleShowCarrito}>
          <img src={imgCarrito} alt="icon shop car" />
          <p>{totalOrders}</p>
        </div>
      </header>
       <Seeker setFilters={setFilters} showSearch={showSearch} />
    </section>
  );
};

export default Header;
