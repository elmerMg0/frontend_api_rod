import edit from "../../../assets/svg/edit.svg";
import trash from "../../../assets/svg/trash.svg";
import defaultPhoto from "../../../assets/img/fotoDeault.webp";
const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;
export default function UserTableRow({
  user,
  deleteUser,
  setUserUpdate,
  setModalShow,
}) {
  return (
    <>
      <tr>
        <td className="col-5">{user.nombres}</td>
        <td className="col-4">{user.tipo}</td>
        <td className="img-user-row">
          <div style={{ width: "55px" }}>
            {user.url_image ? (
              <img src={`${APIURLIMG}${user.url_image}`} alt="foto user" />
            ) : (
              <img src={defaultPhoto} alt="foto default"/>
            )}
          </div>
        </td>
        <td className="user-state">
          {user.estado === "Activo" ? (
            <button className="btn-main-green">{user.estado}</button>
          ) : (
            <button className="btn-main-red">{user.estado}</button>
          )}
        </td>
        <td className="col-2 text-center">
          <button
            className="btn-main"
            onClick={() => {
              setModalShow(true);
              setUserUpdate(user);
            }}
          >
            <img src={edit} alt="icon-edit" />{" "}
          </button>{" "}
          <button onClick={() => deleteUser(user.id)} className="btn-main-red">
            <img src={trash} alt="icon-basura" />
          </button>
        </td>
      </tr>
    </>
  );
}
