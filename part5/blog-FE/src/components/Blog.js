import React from 'react';
import Togglable from './Togglable';

const Blog = ({ blog, addLikes }) => {
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
      </Togglable>
    </div>
  );
};

export default Blog;
