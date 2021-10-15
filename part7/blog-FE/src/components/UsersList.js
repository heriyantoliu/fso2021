import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import userService from '../services/users'
import { Table } from 'react-bootstrap'

const UsersList = () => {
  const [users, setUsers] = useState()
  useEffect(() => {
    userService.getAll().then((response) => {
      setUsers(response)
    })
  }, [])

  if (!users) {
    return null
  }

  return (
    <div>
      <Table striped hover={true}>
        <thead>
          <tr>
            <th />
            <th>
              <strong>blogs created</strong>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default UsersList
