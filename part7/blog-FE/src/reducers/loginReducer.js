/* eslint-disable indent */
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_LOGIN':
      return action.data
    case 'SET_LOGOUT':
      return null
    default:
      return state
  }
}

export const userLogin = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      dispatch(setUser())
    } catch (error) {
      dispatch(
        setNotification(
          { text: 'wrong username or password', className: 'error' },
          5
        )
      )
    }
  }
}

export const setUser = () => {
  return async (dispatch) => {
    const loggedUser = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch({
        type: 'SET_LOGIN',
        data: user,
      })
      blogService.setToken(user.token)
    }
  }
}

export const userLogout = () => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_LOGOUT',
    })
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken('')
  }
}

export default loginReducer
