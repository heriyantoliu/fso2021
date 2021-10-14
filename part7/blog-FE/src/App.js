import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Notification from './components/Notification'

import LoginForm from './components/LoginForm'
import BlogsList from './components/BlogsList'

import { getBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/loginReducer'

const App = () => {
  const login = useSelector((state) => state.login)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBlogs())
  }, [])

  useEffect(() => {
    dispatch(setUser())
  }, [])

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />
      {login === null ? <LoginForm /> : <BlogsList />}
    </div>
  )
}

export default App
