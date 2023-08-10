import { Table } from "react-bootstrap";
import Paginator from "../../global/paginador/Paginator";
import UserTableRow from "./UserTableRow";

export default function UserTable({
  getUsers,
  users,
  pageInfo,
  deleteUser,
  setUserUpdate,
  setModalShow,
}) {
  return (
    <>
      <div>
        <Table>
          <thead className="head-table">
            <tr>
              <th style={{borderTopLeftRadius: '10px'}}>Nombre</th>
              <th>Tipo</th>
              <th>Foto</th>
              <th>Estado</th>
              <th style={{borderTopRightRadius: '10px'}} className="text-center">Accion</th>
            </tr>
          </thead>
          <tbody>
            {users && users.length > 0 ? (
              users.map((user) => (
                <UserTableRow
                  key = {user.id}
                  user = {user}
                  deleteUser = {deleteUser}
                  setUserUpdate = {setUserUpdate}
                  setModalShow = {setModalShow}
                />
              ))
            ) : (
              <tr>
                <td colSpan={5}>No existen usuarios aun!</td>
              </tr>
            )}
            <tr>
              <td colSpan={5}>
                {users.length > 0 &&
                  <Paginator pageInfo={pageInfo} getData={getUsers} />
                }
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
}
