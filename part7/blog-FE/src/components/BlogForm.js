import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button, Col } from 'react-bootstrap'

const BlogForm = ({ togRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleNewBlog = (event) => {
    event.preventDefault()
    dispatch(
      addBlog({
        title,
        author,
        url,
      })
    )

    dispatch(
      setNotification(
        {
          text: `a new blog ${title} by ${author} added`,
          className: 'success',
        },
        5
      )
    )

    togRef.current.toggleVisibility()

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create a new blog</h2>

      <Form onSubmit={handleNewBlog}>
        <Col sm={3}>
          <Form.Group className="mb-3" controlId="titleForm">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              onChange={() => setTitle(event.target.value)}
            />
          </Form.Group>
        </Col>
        <Col sm={3}>
          <Form.Group className="mb-3" controlId="authorForm">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter author"
              onChange={() => setAuthor(event.target.value)}
            />
          </Form.Group>
        </Col>
        <Col sm={3}>
          <Form.Group className="mb-3" controlId="urlForm">
            <Form.Label>URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter url"
              onChange={() => setUrl(event.target.value)}
            />
          </Form.Group>
        </Col>

        <Button id="create-blog-button" type="submit" className="mb-2">
          create
        </Button>
      </Form>
    </div>
  )
}

export default BlogForm
