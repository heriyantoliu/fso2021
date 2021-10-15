import React, { useState, useEffect } from 'react'
import userService from '../services/users'

const User = ({ id }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    userService.getUser(id).then((user) => setUser(user))
  }, [])

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h4>added blogs</h4>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
