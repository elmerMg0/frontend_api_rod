import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import  editBlack from '../../../assets/svg/editBlack.svg'
const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;
const initialValues = {
  nombre: "",
  email: "",
  phone: "",
  celular: "",
  horario_atencion: '',
  direccion: '',
};
function FormUser({ company, updateCompany }) {
  const [value, setValue] = useState(initialValues);
  const [selectedImage, setSelectedImage] = useState(null);
  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeImage = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.files[0],
    });
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (event) => {
    if (!value.id) {
      updateCompany(value, 0);
    }
    updateCompany(value, value.id);
    /* event.preventDefault();
    updateCompany(value); */
  };
  useEffect(() => {
    if (company && Object.keys(company).length > 0) {
      setValue({ ...value, ...company });
    } else {
    }
  }, [company]);

  return (
    <>
      <div>
        <div className="bussiness-logo">
          {selectedImage ? (
            <img src={selectedImage} alt="foto empresa"/>
          ) : (
            value.image_url && <img src={`${APIURLIMG}${value.image_url}`} alt="foto empresa"/>
          )}
          <label htmlFor='image'> <img src={editBlack} alt="" /> </label>
        </div>
        <Form.Group>
          <Form.Control
            type="file"
            id="image"
            name="image"
            /* value={value.image} */
            onChange={handleChangeImage}
            accept=".jpg, .png, .jpng, .webp"
            hidden
          />
        </Form.Group>
      </div>
      <div className="bussiness-form">
        <Form.Group>
          <Form.Label htmlFor="nombre">Nombre Company</Form.Label>
          <Form.Control
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Nombre empresa"
            value={value.nombre}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            id="email"
            placeholder='E-mail'
            name="email"
            value={value.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Telefono</Form.Label>
          <Form.Control
            type="number"
            id="phone"
            placeholder='Telefono'
            name="phone"
            value={value.phone}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Celular</Form.Label>
          <Form.Control
            type="number"
            id="phone"
            placeholder='Celular'
            name="celular"
            value={value.celular}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Dirección</Form.Label>
          <Form.Control
            type="text"
            id="direccion"
            placeholder='direccion'
            name="direccion"
            value={value.direccion}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Horario de Atención</Form.Label>
          <Form.Control
            type="text"
            id="horario_atencion"
            placeholder='horario'
            name="horario_atencion"
            value={value.horario_atencion}
            onChange={handleChange}
          />
        </Form.Group>
      </div>
      <button className="btn-new" onClick={handleSubmit}>
        Guardar
      </button>
    </>
  );
}

export default FormUser;
