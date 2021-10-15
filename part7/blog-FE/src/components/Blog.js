import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'
// import { useDispatch } from 'react-redux'
// import { likesBlog, removeBlog } from '../reducers/blogReducer'

const Blog = ({ id }) => {
  const [blog, setBlog] = useState(null)
  const [comment, setComment] = useState('')

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

  const handleAddComment = (event) => {
    event.preventDefault()

    const updatedBlog = {
      ...blog,
      comments: blog.comments.concat(comment),
      user: blog.user.id,
    }

    blogService.update(updatedBlog.id, updatedBlog)
    setBlog({ ...blog, comments: updatedBlog.comments })
    setComment('')
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        likes {blog.likes}
        <button onClick={handleAddLikes}>like</button>
      </div>
      added by {blog.user.name}
      <h3>comments</h3>
      <form onSubmit={handleAddComment}>
        <input
          value={comment}
          onChange={() => setComment(event.target.value)}
        />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
