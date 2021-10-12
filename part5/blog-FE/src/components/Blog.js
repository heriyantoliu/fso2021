import React from 'react';
import Togglable from './Togglable';

const Blog = ({ blog, addLikes, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleAddLikes = (blog) => {
    addLikes({
      id: blog.id,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    });
  };

  const handleRemove = (blog) => {
    const result = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    );
    if (result) {
      removeBlog(blog.id);
    }
  };

  return (
    <div style={blogStyle}>
      <span>
        {blog.title} {blog.author}
      </span>
      <Togglable buttonLabel="view">
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}{' '}
          <button onClick={() => handleAddLikes(blog)}>likes</button>
        </div>
        <div>{blog.author}</div>
        <button onClick={() => handleRemove(blog)}>remove</button>
      </Togglable>
    </div>
  );
};

export default Blog;
