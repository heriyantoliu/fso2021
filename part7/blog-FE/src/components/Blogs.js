import React from 'react'
import { useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

const Blogs = () => {
  let blogs = useSelector((state) => state.blog)

  return (
    <ListGroup>
      {blogs
        .sort((a, b) => a.likes - b.likes)
        .map((blog) => (
          <ListGroup.Item key={blog.id} href={`blogs/${blog.id}`} action={true}>
            {blog.title} {blog.author}
          </ListGroup.Item>
        ))}
    </ListGroup>
  )
}

export default Blogs
