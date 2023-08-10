import home from '../../../../assets/svg/home.svg'
import searchGris from '../../../../assets/svg/searchGris.svg'
import apps from '../../../../assets/svg/apps.svg'
import shopCar from '../../../../assets/svg/shopCar.svg'
const Navigation = () => {
  return (
    <nav className='carrito-navigation'>
        <ul>
          <li>
            <img src={home} alt="" />
            <p>Inicio</p>
          </li>
          <li>
            <img src={searchGris} alt="" />
            <p>Buscar</p>
          </li>
          <li>
          <img src={apps} alt="" />
            <p>Categorias</p>
          </li>
          <li>
          <img src={searchGris} alt="" />
            <p>Marcas</p>
          </li>
          <li>
          <img src={shopCar} alt="" />
            <p>Carrito</p>
          </li>
        </ul>
    </nav>
  )
}
export default Navigation