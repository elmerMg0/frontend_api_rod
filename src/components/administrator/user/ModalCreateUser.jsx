import React from 'react'
import { Modal } from 'react-bootstrap'
import FormUser from './FormUser'

export default function ModalCreateUser({show,onHide,createuser,userUpdate,setUserUpdate,updateUser}) {
    
  return (
      <>
          <Modal
              show = {show}
              size="lg-sm"
              aria-labelledby="contained-modal-title-vcenter"
              centered
          >
              <Modal.Header >
                  <Modal.Title  id = "contained-modal-title-vcenter">
                      <h5> Crear Usuario</h5>
                  </Modal.Title>
              </Modal.Header>
              <Modal.Body className='ms-3 me-3'>
                  <FormUser
                     onHide = {onHide}
                     createuser = {createuser}
                     userUpdate = {userUpdate}
                     setUserUpdate = {setUserUpdate}
                     updateUser = {updateUser}
                     
                  />
              </Modal.Body>

          </Modal>
      </>
  )
}
