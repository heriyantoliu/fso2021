import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import userService from '../services/users'
import { ListGroup } from 'react-bootstrap'

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
      <ListGroup>
        {user.blogs.map((blog) => (
          <ListGroup.Item key={blog.id} href={`/blogs/${blog.id}`} action>
            {blog.title}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default User
