import React from "react";
import  edit from '../../../assets/svg/edit.svg'
const UserTableRow = ({ customer, setCustomerToEdit, setShow, deleteCustomer }) => {

  const handleEditCustomer = ()  => {
    setCustomerToEdit(customer);
    setShow(true);
  }
  /* const handleDeleteCustomer = () => {
    deleteCustomer(customer.id)
  } */

  return (
    <tr>
      <td>{customer.nombre}</td>
      <td>{customer.celular}</td>
      <td>{customer.direccion}</td>
      <td>{customer.descripcion_domicilio}</td>
      <td className="col-2" style={{textAlign: 'center'}}>
        <button className="btn-main" onClick={() => handleEditCustomer() }> <img src={edit} alt="icon-edit" /> </button>{" "}
        {/* <button className="btn-main-red" onClick={() => handleDeleteCustomer()}>
          <img src={trash} alt="icon-basura" />
        </button> */}
      </td>
    </tr>
  );
};

export default UserTableRow;
