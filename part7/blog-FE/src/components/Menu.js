import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import LoginForm from './LoginForm'
import { userLogout } from '../reducers/loginReducer'

const Menu = () => {
  const login = useSelector((state) => state.login)
  const dispatch = useDispatch()

  const padding = {
    paddingRight: 5,
  }

  const handleLogout = () => {
    dispatch(userLogout())
  }

  return (
    <div>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      {login === null ? (
        <LoginForm />
      ) : (
        <span>
          {login.name} logged in <button onClick={handleLogout}>logout</button>
        </span>
      )}
    </div>
  )
}

export default Menu
