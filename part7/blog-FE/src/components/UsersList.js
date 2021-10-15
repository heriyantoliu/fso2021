import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import userService from '../services/users'

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
      <table>
        <tbody>
          <tr>
            <td />
            <td>
              <strong>blogs created</strong>
            </td>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersList
