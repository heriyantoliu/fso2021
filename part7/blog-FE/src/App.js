import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogsList from './components/BlogsList'
import UsersList from './components/UsersList'
import User from './components/User'
import Blog from './components/Blog'
import Menu from './components/Menu'

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

  const userMatch = useRouteMatch('/users/:id')
  let userID
  if (userMatch) {
    userID = userMatch.params.id
  }

  const blogMatch = useRouteMatch('/blogs/:id')
  let blogID
  if (blogMatch) {
    blogID = blogMatch.params.id
  }

  return (
    <div className="container">
      <h1>Blogs</h1>
      <Notification />
      <Menu />
      {login !== null ? (
        <Switch>
          <Route path="/users/:id">
            <User id={userID} />
          </Route>
          <Route path="/users">
            <UsersList />
          </Route>
          <Route path="/blogs/:id">
            <Blog id={blogID} />
          </Route>
          <Route path="/">
            {login === null ? <LoginForm /> : <BlogsList />}
          </Route>
        </Switch>
      ) : null}
    </div>
  )
}

export default App
