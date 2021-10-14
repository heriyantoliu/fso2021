import React, { useRef } from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blogs from './Blogs'

const BlogsList = () => {
  const blogFormRef = useRef()

  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm togRef={blogFormRef} />
      </Togglable>
      <Blogs />
    </div>
  )
}

export default BlogsList
