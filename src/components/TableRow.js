import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function TableRow({ user, deleteUser, selectOne, editDetailHandler }) {

  return (
    <tr key={user.id}>
      <td>
        <input
          type="checkbox"
          checked={user.selected}
          onChange={() => selectOne(user.id)}
        ></input>
      </td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td style={{ textTransform: 'capitalize' }}>{user.role}</td>
      <td>
        <FontAwesomeIcon
          className="px-2"
          icon="fa-solid fa-pen-to-square"
          onClick={() => editDetailHandler(user.id, user.name, user.email, user.role)}
        />
        <FontAwesomeIcon
          className="px-2"
          icon="fa-solid fa-trash-can"
          onClick={() => deleteUser(user.id)}
        />
      </td>
    </tr>
  )
}

export default TableRow
