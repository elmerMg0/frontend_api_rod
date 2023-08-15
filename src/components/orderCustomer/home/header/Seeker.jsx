import search from "../../../../assets/svg/search.svg";
import { useState } from "react";


const Seeker = ({setFilters, showSearch, setShowSearch}) => {
  const [input, setInput] = useState('')

  const handleOnChange = (e) => {
    setInput(e.target.value)
    setFilters(prevState => ({
      ...prevState, category: e.target.value
    }))
  }

  const handleCleanSearch = () => {
    setFilters(prevState => ({
      ...prevState, category: ''
    }))
    if(input === ''){
      setShowSearch(false);
    }
    setInput('');
  }
  const stylesBtnClose = {
    margin: '0px',
    fontSize: '10px',
  }
  return (
    <section className={`carrito-seeker ${showSearch? "show": ''}`}>
      <div className="carrito-seeker__input contenedor">
        <img className="seeker-icon-search" src={search} alt="" />
        <input value={input} onChange={handleOnChange} type="text" placeholder="Que vas a pedir hoy?" />
        {/*< img className="seeker-icon-search" src={search} alt="" /> */}
        <p style={stylesBtnClose} className="btn-close" onClick={handleCleanSearch}></p>
      </div>
    </section>
  );
};
export default Seeker;  
