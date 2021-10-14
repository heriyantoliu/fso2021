import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogsList from './components/BlogsList'
import UsersList from './components/UsersList'

import { getBlogs } from './reducers/blogReducer'
import { setUser, userLogout } from './reducers/loginReducer'

const App = () => {
  const login = useSelector((state) => state.login)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBlogs())
  }, [])

  useEffect(() => {
    dispatch(setUser())
  }, [])

  const handleLogout = () => {
    console.log('LOGOUT')
    dispatch(userLogout())
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />
      {login === null ? (
        <LoginForm />
      ) : (
        <div>
          <p>
            {login.name} logged in
            <br />
            <button onClick={handleLogout}>logout</button>
          </p>
          <Switch>
            <Route path="/users/:id"></Route>
            <Route path="/users">
              <UsersList />
            </Route>
            <Route path="/">
              {login === null ? <LoginForm /> : <BlogsList />}
            </Route>
          </Switch>
        </div>
      )}
    </div>
  )
}

export default App
