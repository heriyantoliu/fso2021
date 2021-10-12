import React from 'react';
import Togglable from './Togglable';

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <span>
        {blog.title} {blog.author}
      </span>
      <Togglable buttonLabel="view">
        <div>{blog.url}</div>
        <div>
          likes {blog.likes} <button>likes</button>
        </div>
        <div>{blog.author}</div>
      </Togglable>
    </div>
  );
};

export default Blog;
