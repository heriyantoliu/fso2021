import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blogs from './Blogs'
import { userLogout } from '../reducers/loginReducer'

const BlogsList = () => {
  const login = useSelector((state) => state.login)

  const dispatch = useDispatch()

  const blogFormRef = useRef()

  const handleLogout = () => {
    console.log('LOGOUT')
    dispatch(userLogout())
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>
        {login.name} logged in<button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm togRef={blogFormRef} />
      </Togglable>
      <Blogs />
    </div>
  )
}

export default BlogsList
