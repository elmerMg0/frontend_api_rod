import customer from '../../../assets/svg/customerBlue.svg'
const PosBarLef = ({setShow}) => {
  return (
    <aside className="aside">
      <ul>
        <li onClick={() => setShow(true)}>
          <img src={customer} alt="" />
          <p>Cliente</p>
        </li>
       {/*  <li>
          <img src={customer} alt="" />
          <p>Enviar orden</p>
        </li> */}
      </ul>
    </aside>
  )
}
export default PosBarLef