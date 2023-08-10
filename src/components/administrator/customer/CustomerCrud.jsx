import React, { useEffect, useState } from "react";
import CustomerTable from "./CustomerTable";
import { APISERVICE } from "../../../services/api.services";
import CustomerModal from "./CustomerModal";
import ModalConfirm from "../../global/modal/ModalConfirm";
import { Toaster, toast } from "react-hot-toast";
import SearchInput from "../../global/search/SearchInput";
import '../../../styles/administracion/customerCrud.css'

const UserCrud = () => {
  const [customers, setCustomers] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [show, setShow] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [customerToEdit, setCustomerToEdit] = useState({});
  const [customerToDelete, setCustomerToDelete] = useState({});
  const [customersAll, setCustomersAll] = useState([]);
  const [customersFilter, setCustomersFilter] = useState([]);
  const [inputSearchCustomer, setInputSearchCustomer] = useState("");

  useEffect(() => {
    getCustomers();
    getCustomersAll();
  }, []);

  const getCustomers = async (pageNumber = 1) => {
    let url = "cliente/?";
    let params = `page=${pageNumber}`;
    const {success, pageInfo} = await APISERVICE.get(url, params);
    if ( success ) {
      setPageInfo(pageInfo);
      setCustomers(pageInfo.customers);
    }
  };

  const getCustomersAll = async () => {
    let url = "cliente/customers";
    const {success, customers} = await APISERVICE.get(url);
    if (success) {
      setCustomersAll(customers);
    }
  };

  const createNewCustomer = async (customer) => {
    let url = "cliente/create";
    const {success, message} = await APISERVICE.post(customer, url);
    if (success) {
      messageToast(message);
      getCustomers();
    }else{
      messageToastError(message);
    }
  };

  const messageToast = (message) => {
    toast.success(message);
  };
  const messageToastError = (message) => {
    toast.error(message);
  };

  const updateCustomer = async (customer) => {
    let $url = `cliente/update?`;
    let $params = `idCustomer=${customer.id}`;
    const {success, message} = await APISERVICE.post(customer, $url, $params);
    if ( success ) {
      messageToast(message);
      getCustomers();
      getCustomersAll();
    }else{
      messageToastError(message)
    }
  };

  const deleteCustomer = async (id) => {
    setShowModalConfirm(true);
    setCustomerToDelete(id);
  };

  const deleteCustomerToServer = async () => {
    let url = "cliente/delete?";
    let params = `idCustomer=${customerToDelete}`;
    const {success, message} = await APISERVICE.delete(url, params);
    if ( success ) {
      getCustomers();
      messageToast(message);
    }else{
      messageToastError(message);
    }
    setShowModalConfirm(false);
  };

  const filterCustomers = (customer) => {
    if (customer.length > 0) {
      setInputSearchCustomer(customer);

      setCustomersFilter(
        customersAll.filter((cus) =>
          cus.nombre.toLowerCase().includes(customer.toLowerCase())
        )
      );
    } else {
      setInputSearchCustomer("");
      setCustomersFilter([]);
    }
  };

  return (
    <div className="customers">
      <h3>Clientes</h3>
      <SearchInput
        setShow={setShow}
        filterSomething={filterCustomers}
        placeHolder="Nombre de cliente"
      />
      {customersFilter.length > 0 || inputSearchCustomer.length > 0 ? (
        <CustomerTable
          customers={customersFilter}
          pageInfo={pageInfo}
          getCustomers={getCustomers}
          setCustomerToEdit={setCustomerToEdit}
          setShow={setShow}
          deleteCustomer={deleteCustomer}
        />
      ) : (
        <>
          <CustomerTable
            customers={customers}
            pageInfo={pageInfo}
            getCustomers={getCustomers}
            setCustomerToEdit={setCustomerToEdit}
            setShow={setShow}
            deleteCustomer={deleteCustomer}
          />
        </>
      )}

      <CustomerModal
        show={show}
        setShow={setShow}
        create={createNewCustomer}
        customerToEdit={customerToEdit}
        setCustomerToEdit={setCustomerToEdit}
        updateCustomer={updateCustomer}
      />
      <ModalConfirm
        show={showModalConfirm}
        onHide={setShowModalConfirm}
        deleteSomething={deleteCustomerToServer}
        message='Esta usted seguro de que quiere eliminar este usuario?'
      />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default UserCrud;
