import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Form, InputGroup } from "react-bootstrap";
const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;
const initialState = {
  nombre: "",
  precio_venta: "",
  precio_compra: "",
  descripcion: "",
  estado: '',
  categoria_id: '',
  url_image: "",
  cortesia: '',
  tipo: ''
};

const ProductModal = ({
  show,
  setShow,
  create,
  productToEdit,
  setProductToEdit,
  updateProduct,
  categories,
}) => {
  const [product, setProduct] = useState(initialState);
  const [selectedImage, setSelectedImage] = useState(null);
  
  useEffect(() => {
    if(Object.keys(productToEdit).length === 0){
      setProduct(initialState)
    }else{
      setProduct({...productToEdit});
    }
 
  }, [show]);

  const handleConfirm = () => {
    const cortesia = product.cortesia === 'Activo' ? 1: 0;
    if (!product.id) {
      create({...product, cortesia: cortesia}, selectedImage);
    } else {
      updateProduct({...product, cortesia: cortesia}, selectedImage);
    }
    setShow(false);
    setProductToEdit({});
    setSelectedImage(null);
    ([]);
  };
  const handleOnChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancel = () => {
    setProductToEdit({});
    setShow(false);
    setProduct(initialState)
  };

  const handleImageChange = (event) => {
    setProduct({
      ...product,
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

  return (
    <Modal show={show} size="md" centered backdrop>
      <Modal.Header>
        <Modal.Title>
          {
            product.id ? 
            <h5>Editar Producto</h5>
            :
            <h5>Crear nuevo producto</h5>
          }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-1">
          <InputGroup.Text>Nombre</InputGroup.Text>
          <Form.Control
            placeholder="Nombre"
            type="text"
            onChange={handleOnChange}
            name="nombre"
            value={product.nombre}
            required
          />
        </InputGroup>
        <InputGroup className="mb-1">
          <InputGroup.Text>Precio de venta</InputGroup.Text>
          <Form.Control
            placeholder="Precio de venta"
            type="number"
            onChange={handleOnChange}
            name="precio_venta"
            value={product.precio_venta}
          />
        </InputGroup>
        <InputGroup className="mb-1">
          <InputGroup.Text>Precio de compra</InputGroup.Text>
          <Form.Control
            placeholder="Precio de compra"
            type="text"
            onChange={handleOnChange}
            name="precio_compra"
            value={product.precio_compra}
          />
        </InputGroup>
        <InputGroup className="mb-1">
          <InputGroup.Text>Descripción</InputGroup.Text>
          <Form.Control
            placeholder="Descripción"
            type="text"
            onChange={handleOnChange}
            name="descripcion"
            value={product.descripcion}
          />
        </InputGroup>
        
        <InputGroup className="mb-1">
          <InputGroup.Text>Estado</InputGroup.Text>
          <Form.Select
            value={product.estado}
            name="estado"
            id='estado'
            onChange={handleOnChange}
          >
            <option selected >Seleccione una opción</option>
            <option value='Activo'>Activo</option>
            <option value='Inactivo'>Inactivo</option>
            
          </Form.Select>
        </InputGroup>

        <InputGroup className="mb-1">
          <InputGroup.Text>Categoria</InputGroup.Text>
          <Form.Select
            name="categoria_id"
            id='categoria_id'coonst
            onChange={handleOnChange}
          >{
            product.id ? 
            <option selected>{product.nombre_categoria}</option>
            :
            <option selected>Seleccione una opción</option>
          }
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </Form.Select>
        </InputGroup>

        <InputGroup className="mb-1">
          <InputGroup.Text>Cortesia</InputGroup.Text>
          <Form.Select
            name="cortesia"
            id='cortesia'
            onChange={handleOnChange}
          >
            {
              product.id ?
              <option selected > {product.cortesia ? 'Activo': 'Inactivo'} </option>
              :
              <option selected > Seleccione una opción</option>

            }
            <option value='Activo'>Activo</option>
            <option value='Inactivo'>Inactivo</option>
            
          </Form.Select>
        </InputGroup>

        <InputGroup className="mb-1">
          <InputGroup.Text>Tipo</InputGroup.Text>
          <Form.Select
            value={product.tipo}
            name="tipo"
            id='tipo'
            onChange={handleOnChange}
          >
            <option selected >Seleccione una opción</option>
            <option value='comida'>Comida</option>
            <option value='bebida'>bebida</option>
            
          </Form.Select>
        </InputGroup>



        <InputGroup className="mb-1">
          <Form.Control
            placeholder="pique.jpg"
            type="file"
            onChange={handleImageChange}
            name="url_image"
            /*  value={product.url_image} */
            accept='.jpg,.png,.jpng,.jpeg,.webp'
          />
        </InputGroup>
        {selectedImage ? (
          <div className="modal-product-image">
            <img src={selectedImage} alt="preview" />
          </div>
        ) : (
          <>
            {product.url_image && product.url_image.length > 0 && (
              <div className="modal-product-image">
                <img
                  src={`${APIURLIMG}${product.url_image}`}
                  alt="foto producto"
                />
              </div>
            )}
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
      <button onClick={() => handleCancel()} className="btn-main">
          Cancelar
        </button>
       {/*  {product.id && (
          <button
            className="btn-main-red"
            onClick={() => handleDeleteProduct()}
          >setProductToEdit
            Eliminar
          </button>
        )} */}
        
        <button onClick={handleConfirm} className="btn-main-green">
          Guardar
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;
