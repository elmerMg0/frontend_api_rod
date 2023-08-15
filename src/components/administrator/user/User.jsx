import React, { useState, useEffect } from "react";
import { APISERVICE } from "../../../services/api.services";
import ModalCreateUser from "./ModalCreateUser";
import UserTable from "./UserTable";
import ModalConfirm from "../../global/modal/ModalConfirm";
import { Toaster, toast } from "react-hot-toast";
import SearchInput from "../../global/search/SearchInput";
import '../../../styles/administracion/user.css'
export default function User() {
  const [users, setUsers] = useState([]);
  const [pageInfo, setPageInfo] = useState(1);
  const [modalShow, setModalShow] = useState(false);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState({});
  const [userUpdate, setUserUpdate] = useState({});
  const [inputSearchUser, setInputSearchUser] = useState("");
  const [usersFilter, setusersFilter] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const messageToast = (message) => {
    toast.success(message);
  };

  const getUsers = async (pageNumber = 1) => {
    let url = "usuario/?";
    let params = `page=${pageNumber}`;
    const { success, pageInfo } = await APISERVICE.get(url, params);
    if (success) {
      setUsers(pageInfo.users);
      setPageInfo(pageInfo);
    }
  };
  const createuser = async (user, image) => {
    let url = "usuario/create-user";
    const formData = new FormData();
   
    formData.append("data", JSON.stringify(user));
    if (image) formData.append("file", user.url_image);

    const { success, message } = await APISERVICE.postWithImage(formData, url);
    if ( success ) {
      messageToast(message);
    }else{
      messageToastError(message);
    }
    //envio de imagen categoria
    getUsers();
  };

  const messageToastError = (sms) => {
    toast.error(sms)
  }

  const deleteUserModal = async (id) => {
    setShowModalConfirm(true);
    setCustomerToDelete(id);
  };

  const deleteUser = async () => {
    let url = "usuario/disable-user?";
    let params = `idUser=${customerToDelete}`;
    const {success, message} = await APISERVICE.get(url, params);
    if ( success ) {
      getUsers();
      messageToast(message);
    }else{
      messageToast(message);
    }
    setShowModalConfirm(false);
  };

  const updateUser = async (user, image) => {
    let $url = `usuario/edit-user?`;
    let $params = `id=${user.id}`;
    const data = new FormData();

    let body = {
      nombres: user.nombres,
      username: user.username,
      password: user.password,
      tipo: user.tipo,
      estado: user.estado
    };
    data.append("data", JSON.stringify(body));
    if (image) data.append("file", user.url_image);
    const {success, message} = await APISERVICE.postWithImage(data, $url, $params);
    if (success) {
      messageToast(message);
      getUsers();
      getAllUsers();
    }else{
      messageToastError(message);
    }
  };
  const getAllUsers = async () => {
    let url = "usuario/get-all-users";
    const response = await APISERVICE.get(url);
    if (response.status === 200) {
      setAllUsers(response.users);
    }
  };
  const filterUser = (user) => {
    if (user.length > 0) {
      setInputSearchUser(user);

      setusersFilter(
        allUsers.filter((res) =>
          res.nombres.toLowerCase().includes(user.toLowerCase())
        )
      );
    } else {
      setInputSearchUser("");
      setusersFilter([]);
    }
  };

  useEffect(() => {
    getUsers();
    getAllUsers();
  }, []);
  return (
    <>
      <div className="conteiner-user">
        <h3 className="title">Usuarios</h3>
        <SearchInput
          setShow={setModalShow}
          filterSomething={filterUser}
          placeHolder="Nombre de usuario"
        />
        <div>
          {usersFilter.length > 0 || inputSearchUser.length > 0 ? (
            <UserTable
              getUsers={getUsers}
              users={usersFilter}
              pageInfo={pageInfo}
              deleteUser={deleteUserModal}
              setUserUpdate={setUserUpdate}
              setModalShow={setModalShow}
            />
          ) : (
            <UserTable
              getUsers={getUsers}
              users={users}
              pageInfo={pageInfo}
              deleteUser={deleteUserModal}
              setUserUpdate={setUserUpdate}
              setModalShow={setModalShow}
            />
          )}
        </div>
        <ModalCreateUser
          show={modalShow}
          onHide={() => setModalShow(false)}
          createuser={createuser}
          userUpdate={userUpdate}
          setUserUpdate={setUserUpdate}
          updateUser={updateUser}
        />
        <ModalConfirm
          show={showModalConfirm}
          onHide={setShowModalConfirm}
          deleteSomething={deleteUser}
          message='Esta usted seguro de que quiere inabilitar este usuario?'
        />
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </>
  );
}
