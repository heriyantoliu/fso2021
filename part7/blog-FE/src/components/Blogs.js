import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Blogs = () => {
  let blogs = useSelector((state) => state.blog)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return blogs
    .sort((a, b) => a.likes - b.likes)
    .map((blog) => (
      <div style={blogStyle} key={blog.id}>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
      </div>
    ))
}

export default Blogs
