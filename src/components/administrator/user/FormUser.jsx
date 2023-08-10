import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;

function FormUser({
  onHide,
  createuser,
  userUpdate,
  setUserUpdate,
  updateUser,
}) {
  const initialValues = {
    nombres: "",
    username: "",
    password: "",
    tipo: "",
    url_image: "",
    estado: "",
  };
  const [selectedImage, setSelectedImage] = useState(null);
  const [value, setValue] = useState(userUpdate ? userUpdate : initialValues);

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeImage = (event) => {
    setValue({
      ...value,
      [event.target.name]: event.target.files[0],
    });
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userUpdate.id) {
      updateUser(value, selectedImage);
      onHide();
    } else {
      createuser(value, selectedImage);
      onHide();
    }
    setUserUpdate({});
    setSelectedImage(null);
  };

  const handleCancel = () => {
    setUserUpdate({});
    onHide();
  };

  return (
    <div className="user">
      <InputGroup className="mb-3">
        <InputGroup.Text htmlFor="nombres">Nombre Completo</InputGroup.Text>
        <Form.Control
          type="text"
          id="nombres"
          name="nombres"
          value={value.nombres ? value.nombres : ""}
          onChange={handleChange}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <InputGroup.Text>Nombre de Usuario</InputGroup.Text>
        <Form.Control
          type="text"
          id="username"
          name="username"
          value={value.username ? value.username : ""}
          onChange={handleChange}
        />
      </InputGroup>
      {!userUpdate.id && (
        <InputGroup className="mb-3">
          <InputGroup.Text>Contrasena</InputGroup.Text>
          <Form.Control
            type="password"
            id="password"
            name="password"
            value={value.password ? value.password : ""}
            onChange={handleChange}
          />
        </InputGroup>
      )}
      <InputGroup className="mb-3">
        <InputGroup.Text>Tipo</InputGroup.Text>
        <Form.Select
          id="tipo"
          name="tipo"
          value={value.tipo ? value.tipo : ""}
          onChange={handleChange}
        >
          {userUpdate.id ? (
            <option selected disabled>
              {value.tipo}
            </option>
          ) : (
            <>
              <option>Administrador</option>
              <option value="administrador">Administrador</option>
              {/*  <option value="mesero">Mesero</option> */}
              <option value="cajero">Cajero</option>
            </>
          )}
        </Form.Select>
      </InputGroup>

      <InputGroup className="mb-3">
        <InputGroup.Text>Estado</InputGroup.Text>
        <Form.Select
          id="estado"
          name="estado"
          value={value.estado}
          onChange={handleChange}
        >
          <option disabled selected>
            Seleccione una opcion
          </option>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </Form.Select>
      </InputGroup>

      <InputGroup className="mb-3">
        <Form.Control
          className="form-control-file"
          type="file"
          name="url_image"
          id="foto"
          value={value.foto ? value.foto : ""}
          accept=".jpg,.png,jpng"
          onChange={handleChangeImage}
        />
      </InputGroup>
      {selectedImage ? (
        <div className="modal-category-image">
          <img src={selectedImage} alt="preview" />
        </div>
      ) : (
        <>
          {value.url_image && value.url_image.length > 0 && (
            <div className="modal-category-image">
              <img src={`${APIURLIMG}${value.url_image}`} alt="a" />
            </div>
          )}
        </>
      )}
      <hr />
      <div className="user-btns">
        <button className="btn-main-red" onClick={handleCancel}>
          Cancelar
        </button>
        <button className="btn-main" onClick={handleSubmit}>
          Confirmar
        </button>
      </div>
    </div>
  );
}

export default FormUser;
