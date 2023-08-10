import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const initialState = {
  fechaInicio: "",
  fechaFin: "",
  usuarioId: "",
};

const SeekerSales = ({ getSaleDetails, users, setInfoSeeker }) => {
  const [infoSearchSales, setInfoSearchSales] = useState(initialState);

  const handleOnChange = (e) => {
    setInfoSearchSales({ ...infoSearchSales, [e.target.name]: e.target.value });
    //setInfoSeeker(infoSearchSales);
  };

  const handleSearch = () => {
    if(isValidDate()){
        const pageNumber = 1;
        setInfoSeeker(infoSearchSales);
        getSaleDetails(pageNumber, infoSearchSales);
    }
  };

  const isValidDate = () => {
    if(infoSearchSales.fechaInicio === ''){
        messageToast('Fecha inicio vacia')
        return false;
    }
    if(infoSearchSales.fechaFin === ''){
        messageToast('Fecha fin vacia')
        return false;
    }else{
        if( infoSearchSales.fechaInicio > infoSearchSales.fechaFin){
            messageToast('Fecha fin incorrecta!')
            return false;
        }
    }
    if(infoSearchSales.usuarioId === ''){
        messageToast('Selecione un usuario.')
        return false;
    }
    return true;
  }
  const messageToast = (sms) => {
    toast.error(sms)
  }

  return (
    <div className="report-header-seekers">
      <div className="d-flex flex-column">
        <label htmlFor="">Fecha Inicio</label>
        <input
          name="fechaInicio"
          value={infoSearchSales.fechaInicio}
          type="date"
          onChange={handleOnChange}
        />
      </div>
      <div className="d-flex flex-column">
        <label htmlFor="">Fecha Fin</label>
        <input
          name="fechaFin"
          value={infoSearchSales.fechaFin}
          type="date"
          onChange={handleOnChange}
        />
      </div>
      <div className="d-flex flex-column">
        <label htmlFor="">Usuario</label>
        <select
          className="report-header-select"
          name="usuarioId"
          value={infoSearchSales.usuarioId}
          onChange={handleOnChange}
        >
          <option value=''>Seleccione un usuario</option>
          {users &&
            users.length > 0 &&
            users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.nombres}
              </option>
            ))}
          <option value="todos">Todos</option>
        </select>
      </div>
      <div className="d-flex flex-column justify-content-end">
        <button className="btn-new" on onClick={handleSearch}>
          Buscar
        </button>
      </div>
      <Toaster position="top-right"/>
    </div>
  );
};
export default SeekerSales;
