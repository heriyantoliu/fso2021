import React, { useState, useEffect } from 'react'
import userService from '../services/users'

const UsersList = () => {
  const [users, setUsers] = useState()
  useEffect(() => {
    userService.getAll().then((response) => {
      setUsers(response)
    })
  }, [])

  if (!users) {
    return <div></div>
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
              <td>{user.name}</td> <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersList
