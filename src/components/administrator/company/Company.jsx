import React, { useState } from "react";
import FormCompany from "../../administrator/company/FormCompany";
import { Toaster, toast } from "react-hot-toast";
import { APISERVICE } from "../../../services/api.services";
import { useEffect } from "react";
import "../../../styles/administracion/bussines.css";
export default function Company() {
  const [company, setCompany] = useState([]);
  const messageToast = (message) => {
    toast.success(message);
  };
  const messageToastError = (message) => {
    toast.error(message);
  };

  const getCompany = async () => {
    const url = "empresa/get-company";
    const params = "";
    const { success, data } = await APISERVICE.get(url, params);
    if (success) {
      setCompany(data);
    }
  };

  const updateCompany = async (body, id) => {
    const url = "empresa/update?id=";
    const params = id;
    const fd = new FormData();
    fd.append("body", JSON.stringify(body));
    if (body.image) fd.append("image", body.image);
    const {success, message} = await APISERVICE.postWithImage(fd, url, params);
    if ( success ) {
      messageToast(message);
    }else{
      messageToastError(message)
    }
    getCompany();
  };
  useEffect(() => {
    getCompany();
  }, []);
  return (
    <div className="bussiness">
      <h3 className="title">Empresa</h3>
      <FormCompany company={company} updateCompany={updateCompany} />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
