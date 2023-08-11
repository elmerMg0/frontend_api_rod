import search from "../../../../assets/svg/search.svg";


const Seeker = ({setFilters, showSearch}) => {


  const handleOnChange = (e) => {
    setFilters(prevState => ({
      ...prevState, category: e.target.value
    }))
  }

  return (
    <section className={`carrito-seeker ${showSearch? "show": ''}`}>
      <div className="carrito-seeker__input contenedor">
        <img className="seeker-icon-search" src={search} alt="" />
        <input onChange={handleOnChange} type="text" placeholder="Que vas a pedir hoy?" />
        <img className="seeker-icon-search" src={search} alt="" />
      </div>
    </section>
  );
};
export default Seeker;  
