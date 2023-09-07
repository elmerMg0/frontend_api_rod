import React, { useEffect, useState } from 'react'
import { Form, InputGroup, Modal } from 'react-bootstrap'
const initialState = {
  nombre: '',
  nro_filas: 0,
  nro_columnas: 0,
  estado: true,
}

const ModalForm = ({show, onHide, createLounge, loungeToEdit, updateLounge, setLoungeToEdit}) => {
  const [infoLounge, setInfoLounge] = useState(initialState)
  const [ image, setImage] = useState();
  useEffect(() => {
    setInfoLounge({...infoLounge,...loungeToEdit})
  },[loungeToEdit])

  const handleCancel = () => {
    onHide(false);
    setInfoLounge(initialState)
    setLoungeToEdit({})
  }
  const handleSend  = () => {
    const body = {...infoLounge, 'estado': infoLounge.estado === 'true' ? 1: 0}
    if(!infoLounge.id){
      createLounge(body, image);
    }else{
      updateLounge(body, body.id, image);
    }
  }

  const handleOnChangeFile = (e) => {
    setImage(e.target.files[0])
  } 

  const handleOnChange = (e) => {
    setInfoLounge({...infoLounge, [e.target.name]: e.target.value})
  }
  return (
    <Modal show={show} centered>
      <Modal.Header>
        <h5>Nuevo Salon</h5>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className='mb-2'>
          <InputGroup.Text>Nombre</InputGroup.Text>
          <Form.Control type='text' placeholder='nombre' value={infoLounge.nombre} name='nombre' onChange={handleOnChange}/>
        </InputGroup>

        <InputGroup className='mb-2'>
          <InputGroup.Text>Numero de filas</InputGroup.Text>
          <Form.Control type='text' placeholder='numero de filas'  value={infoLounge.nro_filas} name='nro_filas' onChange={handleOnChange}/>
        </InputGroup>

        <InputGroup className='mb-2'>
          <InputGroup.Text>Numero de columnas</InputGroup.Text>
          <Form.Control type='text' placeholder='numero de columnas'  value={infoLounge.nro_columnas} name='nro_columnas' onChange={handleOnChange}/>
        </InputGroup>

        <Form.Select  name='estado' onChange={handleOnChange} className='mb-2'>
          <option value=""> Selecione una opcion</option>
          <option value={true}>Habilitado</option>
          <option value={false}>Inabilitado</option>
        </Form.Select>

        <Form.Control
          type='file'
          onChange={handleOnChangeFile}
          name='imagen'
          accept=".jpg, .png, .jpng, .webp"
        />

      </Modal.Body>
      <Modal.Footer>
        <button className='btn-main-red' onClick={handleCancel}>Cancelar</button>
        <button className='btn-main' onClick={handleSend}>Enviar</button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalForm;