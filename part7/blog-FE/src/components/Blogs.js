import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const Blogs = () => {
  let blogs = useSelector((state) => state.blog)

  return blogs
    .sort((a, b) => a.likes - b.likes)
    .map((blog) => <Blog key={blog.id} blog={blog} />)
}

export default Blogs
