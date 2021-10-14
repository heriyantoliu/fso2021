/* eslint-disable indent */
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INITIAL_BLOGS':
      return action.data
    case 'ADD_BLOG':
      return [...state, action.data]
    case 'LIKES_BLOG':
      return state.map((blog) =>
        blog.id === action.data.id ? action.data : blog
      )
    case 'REMOVE_BLOG':
      return state.filter((blog) => blog.id !== action.data.id)
    default:
      return state
  }
}

export const getBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INITIAL_BLOGS',
      data: blogs,
    })
  }
}

export const addBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'ADD_BLOG',
      data: newBlog,
    })
  }
}

export const likesBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blog.id, blog)
    dispatch({
      type: 'LIKES_BLOG',
      data: updatedBlog,
    })
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id)
      dispatch({
        type: 'REMOVE_BLOG',
        data: { id },
      })
    } catch (exception) {
      dispatch(
        setNotification(
          {
            text: exception.response.data.error,
            className: 'error',
          },
          5
        )
      )
    }
  }
}

export default blogReducer
