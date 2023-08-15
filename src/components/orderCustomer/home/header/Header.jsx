import logo from "../../../../assets/img/logoApisYa3.webp";
import imgCarrito from "../../../../assets/svg/shopCar.svg";
import search2 from "../../../../assets/svg/searchGris.svg";
import "../../../../styles/carrito/header.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { Search, ShopCarIcon } from '../../../global/icons/Icons'

import Seeker from "./Seeker";
const Header = ({ setShowProducts, showProducts, setShowSearch, showSearch, setFilters }) => {
  const [totalOrders, setTotalOrders] = useState(0);
  const orderDetail = useSelector((store) => store.carritoUser);

  useEffect(() => {
    setTotalOrders(orderDetail.length);
  }, [orderDetail]);

  const handleShowCarrito = () => {
    setShowProducts(prevState => !prevState);
    setShowSearch(false)
  };

  const toggleSearch = () => {
    if(!showProducts){
      setShowProducts(true);
    }
    setShowSearch((prevState) => !prevState);
    
  };
  return (
    <section>
      <header className="bg-header">
        <div  onClick={toggleSearch}>
          <Search/>
        </div>
        <div className="bg-header__img">
          <img
            src={logo}
            alt="logo apis ya"
            onClick={() => setShowProducts(true)}
          />
        </div>
        <div className="bg-header__shopicon" onClick={handleShowCarrito}>
         <ShopCarIcon/>
         <div className="bg-header__shopicon-total">
           <p >{totalOrders}</p>
         </div>
        </div>
      </header>
       <Seeker setShowSearch={setShowSearch} setFilters={setFilters} showSearch={showSearch} />
    </section>
  );
};

export default Header;
