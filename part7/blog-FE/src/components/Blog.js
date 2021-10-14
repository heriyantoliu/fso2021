import React from 'react'
import { useDispatch } from 'react-redux'
import Togglable from './Togglable'
import PropTypes from 'prop-types'
import { likesBlog, removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const dispatch = useDispatch()

  const handleAddLikes = () => {
    dispatch(
      likesBlog({
        id: blog.id,
        author: blog.author,
        title: blog.title,
        url: blog.url,
        likes: blog.likes + 1,
        user: blog.user.id,
      })
    )
  }

  const handleRemove = (blog) => {
    const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (result) {
      dispatch(removeBlog(blog.id))
    }
  }

  return (
    <div id="list-blogs" style={blogStyle}>
      <span id="span-blog">
        {blog.title} {blog.author}
      </span>
      <Togglable buttonLabel="view">
        <div>{blog.url}</div>
        <div id="likes-div">
          likes {blog.likes}{' '}
          <button id="likes" className="btnLike" onClick={handleAddLikes}>
            likes
          </button>
        </div>
        <div>{blog.author}</div>
        <button id="remove-blog-button" onClick={() => handleRemove(blog)}>
          remove
        </button>
      </Togglable>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
