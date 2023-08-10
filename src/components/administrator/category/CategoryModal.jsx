import React, { useState, useEffect} from "react";
import { Modal} from "react-bootstrap";
import { Form, InputGroup } from "react-bootstrap";
const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;
const initialState = {
  nombre:'',
  descripcion: '',
  url_image: '',
  estado: '',
  cortesia: ''
}

const CategoryModal = ({ show, setShow, create, categoryToEdit, setCategoryToEdit ,updateCategory}) => {

  const [category, setcategory] = useState(initialState)
  const [selectedImage, setSelectedImage] = useState(null);


  useEffect ( ( ) => {
    if(categoryToEdit && Object.keys(categoryToEdit).length !== 0){
      const stateCurrent = categoryToEdit.cortesia ? 'Activo' : 'Inactivo';
      setcategory({...categoryToEdit, 'cortesia': stateCurrent});
    }else{
      setcategory(initialState)
    }
  },[show]) 

  const handleConfirm = () => {
    setShow(false);
    if( !category.id ){
      create(category, selectedImage);
    }else{
      updateCategory(category, selectedImage);
    }
    //create(category);
    setCategoryToEdit({})
    setSelectedImage(null)
  }
  const handleOnChange = (e) => {
    setcategory({
      ...category, 
      [e.target.name]:e.target.value
    })
  }

  const handleFileChange = (e) => {
    setcategory({
      ...category, 
      [e.target.name]:e.target.files[0]
    })
  }

  const handleCancel = () => {
    setShow(false)
    setCategoryToEdit({})
  }

  const handleImageChange = (event) => {
    setcategory({
      ...category, 
      [event.target.name]:event.target.files[0]
    })
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
            category.id ? 
            <h5>Editar Categoria</h5>
            :
            <h5>Crear nueva categoria</h5>
          }
        </Modal.Title>
      </Modal.Header>
      <Modal.Body >
        <InputGroup className="mb-3">
          <InputGroup.Text>Nombre</InputGroup.Text>
          <Form.Control 
            placeholder="Nombre"
            type="text"
            onChange={handleOnChange}
            name='nombre'
            value={category.nombre}
            required
          />
        </InputGroup>
 
        <InputGroup className="mb-3">
          <InputGroup.Text>Descripción</InputGroup.Text>
          <Form.Control 
            placeholder="Descripción"
            type="text"
            onChange={handleOnChange}
            name='descripcion'
            value={category.descripcion}
          />
        </InputGroup>

      
        <InputGroup className="mb-3">
          <InputGroup.Text>Estado</InputGroup.Text>
          <Form.Select
            value={category.estado}
            name="estado"
            id='estado'
            onChange={handleOnChange}
          >
            <option selected >Seleccione una opción</option>
            <option value='Activo'>Activo</option>
            <option value='Inactivo'>Inactivo</option>
            
          </Form.Select>
        </InputGroup>

              
        <InputGroup className="mb-3">
          <InputGroup.Text>Cortesia</InputGroup.Text>
          <Form.Select
            value={category.cortesia}
            name="cortesia"
            id='cortesia'
            onChange={handleOnChange}
          >
            <option selected >Seleccione una opción</option>
            <option value='Activo'>Activo</option>
            <option value='Inactivo'>Inactivo</option>
            
          </Form.Select>
        </InputGroup>
        <InputGroup>
          <Form.Control 
            placeholder="pique.jpg"
            type="file"
            onChange={handleImageChange}
            name='url_image'
            accept='.jpg,.png,.jpng,.jpeg,.webp'
          />
        </InputGroup>
        {
          selectedImage ?
          <div className="modal-category-image">
            <img src={selectedImage} alt="preview"  />
          </div>
            :
            <>
              {
                category.url_image && category.url_image.length > 0 &&
                <div className="modal-category-image">
                  <img src={`${APIURLIMG}${category.url_image}`} alt="a" />
                </div>
                
              }
              </> 
            

         }
       {/*   {selectedImage && (
            
          )}
 */}

      </Modal.Body>
      <Modal.Footer >
        <button onClick={()=> handleCancel()} className='btn-main-red'>Cancelar</button>
        <button onClick={handleConfirm} className="btn-main">Confirmar</button>
      </Modal.Footer>
    </Modal>
  );
};

export default CategoryModal;
