import React, { useState } from 'react'
import * as Bootstrap from 'react-bootstrap'
import { Modal } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import TableRow from './TableRow'

const Table = ({ users, handleChange, deleteUser, selectOne, saveUser }) => {
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({ id: null, name: "", role: "", email: "" })

  const modalHandler = () => {
    setModal(!modal);
  }

  const editDetailHandler = (id, name, email, role) => {
    setModal(true);
    setFormData({
      ...formData, id: id, name: name,
      email: email, role: role
    })
  }
  const saveUserHandler = () => {
    modalHandler();
    saveUser(formData);
  }

  return (
    <div className="mx-2">
      <Bootstrap.Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <input type="checkbox" name="selectAll" onChange={handleChange} />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              user={user}
              deleteUser={deleteUser}
              selectOne={selectOne}
              editDetailHandler={editDetailHandler}
            />
          ))}
        </tbody>
      </Bootstrap.Table>
      <Modal show={modal} onHide={modalHandler}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => editDetailHandler(formData.id, e.target.value, formData.email, formData.role)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) => editDetailHandler(formData.id, formData.name, e.target.value, formData.role)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Role</Form.Label>
              <Form.Control
                style={{ textTransform: "capitalize" }}
                type="text"
                value={formData.role}
                onChange={(e) => editDetailHandler(formData.id, formData.name, formData.email, e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={modalHandler}>
            Cancel
          </Button>
          <Button variant="primary" onClick={saveUserHandler}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Table
