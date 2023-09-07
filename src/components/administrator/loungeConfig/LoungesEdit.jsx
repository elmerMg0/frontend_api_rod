import React from "react";
import { EditIcon, TablesIcon } from "../../icons/Icons";
const LoungesEdit = ({
  setShowModal,
  lounges,
  setLoungeInfo,
  getTables,
  getLounge,
  loungeInfo,
}) => {
  const handleGetTables = (lounge) => {
    setLoungeInfo(lounge);
    getTables(lounge.id);
  };

  const handleEdit = (idLounge) => {
    getLounge(idLounge);
  };
  return (
    <aside className="lounge-aside">
      <h5>Salones</h5>
      {lounges?.length > 0
        ? lounges.map((lounge) => (
            <div key={lounge.id} className="lounge-aside__item">
              <h5 className={loungeInfo.id === lounge.id ? "flag" : ""}>
                {lounge.nombre}
              </h5>
              <div className="d-flex gap-1">
                <button
                  className="btn-main-green"
                  onClick={() => handleGetTables(lounge)}
                >
                  {" "}
                  <TablesIcon/>
                </button>
                <button
                  className="btn-main"
                  onClick={() => handleEdit(lounge.id)}
                >
                  {" "}
                  <EditIcon color='#ffffff'/>
                </button>
              </div>
            </div>
          ))
        : "No existen salones"}
      <button className="btn-main" onClick={() => setShowModal(true)}>
        Nuevo
      </button>
    </aside>
  );
};

export default LoungesEdit;
