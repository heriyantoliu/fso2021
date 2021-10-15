import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'
// import { useDispatch } from 'react-redux'
// import { likesBlog, removeBlog } from '../reducers/blogReducer'

const Blog = ({ id }) => {
  const [blog, setBlog] = useState(null)

  useEffect(() => {
    blogService.getBlog(id).then((blog) => setBlog(blog))
  }, [])

  if (!blog) {
    return null
  }

  // const dispatch = useDispatch()

  const handleAddLikes = () => {
    const likesBlog = {
      id: blog.id,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    }
    blogService.update(likesBlog.id, likesBlog)
    setBlog({ ...blog, likes: blog.likes + 1 })
  }

  // const handleRemove = (blog) => {
  //   const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
  //   if (result) {
  //     dispatch(removeBlog(blog.id))
  //   }
  // }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        likes {blog.likes}
        <button onClick={handleAddLikes}>like</button>
      </div>
      added by {blog.user.name}
    </div>
  )

  // return (
  //   <div id="list-blogs" style={blogStyle}>
  //     <span id="span-blog">
  //       {blog.title} {blog.author}
  //     </span>
  //     <Togglable buttonLabel="view">
  //       <div>{blog.url}</div>
  //       <div id="likes-div">
  //         likes {blog.likes}{' '}
  //         <button id="likes" className="btnLike" onClick={handleAddLikes}>
  //           likes
  //         </button>
  //       </div>
  //       <div>{blog.author}</div>
  //       <button id="remove-blog-button" onClick={() => handleRemove(blog)}>
  //         remove
  //       </button>
  //     </Togglable>
  //   </div>
  // )
}

export default Blog
