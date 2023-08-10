import logoApi from '../../../../assets/img/logoAPi.jpeg'
import imgCarrito from '../../../../assets/svg/shopCar.svg'
import search from '../../../../assets/svg/searchGris.svg'
import '../../../../styles/carrito/header.css'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useState } from 'react'
import arrowLeft from '../../../../assets/svg/arrowLeft.svg'
const Header = ( {setShowProducts, showProducts} ) => {
  const [totalOrders, setTotalOrders] = useState(0) 
  const orderDetail = useSelector(store => store.carritoUser);

  useEffect(()=> {
    setTotalOrders  (orderDetail.length);
  },[orderDetail])

  const handleShowCarrito = () => {
    setShowProducts(!showProducts)
  }
  return (
        <div className='bg-header'>
          <div>
            { !showProducts &&  <img src={arrowLeft} alt="icon shop car" onClick={() => setShowProducts(true)}/> }
          </div>
          <div className='bg-header__img'>
            <img src={logoApi} alt='logo api xpress' onClick={() => setShowProducts(true)}/>
          </div>
          <div className='bg-header__shopicon' onClick={handleShowCarrito}>
            <img src={imgCarrito} alt="icon shop car"/>
            <p>{totalOrders}</p>
          </div>
        </div>
  );
};

export default Header;
