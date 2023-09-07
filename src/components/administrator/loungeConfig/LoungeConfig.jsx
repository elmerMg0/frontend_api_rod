import React, { useEffect, useRef, useState } from "react";
import Lounges from "./LoungesEdit";
import ModalForm from "./ModalForm";
import "./loungeConfig.css";
import TablesGrilla from "./TablesGrillaConfig";
import { APISERVICE } from "../../../services/api.services";
import { toast, Toaster } from "react-hot-toast";
import ModalEditTable from "./ModalEditTable";
const LoungeConfig = () => {
  const [showModal, setShowModal] = useState(false);
  const [tables, setTables] = useState([]);
  const [lounges, setLounges] = useState([]);
  const [loungeInfo, setLoungeInfo] = useState({});
  const [tableToEdit, setTableToEdit] = useState({});
  const [showModalTable, setShowModalTable] = useState(false);
  const [loungeToEdit, setLoungeToEdit] = useState({})

  const loungeRef = useRef()

  useEffect(() => {
    getLounges();
  }, []);

  const getTables = async (idLounge) => {
   // if(loungeRef.current === idLounge) return;
    const url = "mesa/get-tables/?";
    const params = `idLounge=${idLounge}`;
    const { success, tables } = await APISERVICE.get(url, params);
    if (success) {
      setTables(tables);
      loungeRef.current = idLounge;
    }
  };

  const getLounges = async () => {
    const url = "salon/get-lounges";
    const { success, lounges } = await APISERVICE.get(url);
    if (success) {
      setLounges(lounges);
    }
  };
  const createLounge = async ( body, image) => {
    const url = "salon/create-lounge";
    const fd = new FormData();
    fd.append('data', JSON.stringify(body))
    if(image) fd.append('file', image);

    const { success, message } = await APISERVICE.postWithImage(fd, url);
    if (success) {
      messageSuccess(message);
      getLounges();
      setShowModal(false);
    } else {
      messageError(message);
    }
  };

  const updateTable = async (idTable, body) => {
    const url = "mesa/update/?";
    const params = `idTable=${idTable}`;
    const { success, message } = await APISERVICE.post(
      body,
      url,
      params
    );
    if (success) {
      messageSuccess(message)
      getTables(loungeRef.current);
    }else{
      messageError(message);
    }
  };

  const getLounge = async (idLounge) => {
    setShowModal(true);
    const url = "salon/get-lounge/?";
    const params = `idLounge=${idLounge}`;
    const { success, lounge} = await APISERVICE.get(url, params);
    if (success) {
      setLoungeToEdit(lounge)
    }
  }

  const updateLounge = async (body, idLounge, image) => {
    const url = "salon/update?";
    const params = `idLounge=${idLounge}`
    const fd = new FormData();
    fd.append('data', JSON.stringify(body))
    if(image) fd.append('file', image);

    const { success, message } = await APISERVICE.postWithImage(fd, url, params);
    //const { success, message } = await APISERVICE.post(body, url, params);
    if (success) {
      messageSuccess(message);
      getLounges();
      setShowModal(false);
    } else {
      messageError(message);
    }
  }

  const messageSuccess = (sms) => {
    toast.success(sms);
  };
  const messageError = (sms) => toast.error(sms);

  return (
    <div className="config-tables">
      <div className="dashboard-lounges">
        <Lounges
          setShowModal={setShowModal}
          lounges={lounges}
          setLoungeInfo={setLoungeInfo}
          getTables={getTables}
          getLounge={getLounge}
          loungeInfo={loungeInfo}
        />
         
          <TablesGrilla
            tables={tables}
            loungeInfo={loungeInfo}
            setTableToEdit={setTableToEdit}
            setShowModalTable={setShowModalTable}
          />
        
      </div>
      <ModalForm
        show={showModal}
        onHide={setShowModal}
        createLounge={createLounge}
        loungeToEdit={loungeToEdit}
        updateLounge={updateLounge}
        setLoungeToEdit={setLoungeToEdit}
      />
      <ModalEditTable
        show={showModalTable}
        onHide={setShowModalTable}
        tableToEdit={tableToEdit}
        updateTable={updateTable}
      />
      <Toaster />
    </div>
  );
};

export default LoungeConfig;
