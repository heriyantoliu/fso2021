import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import { Card, Button, Form, Col, ListGroup, Row } from 'react-bootstrap'

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
    <Card className="mt-2">
      <Card.Header as="h2">{blog.title}</Card.Header>
      <Card.Body>
        <Card.Link href={blog.url}>{blog.url}</Card.Link>
        <Card.Text className="my-2">
          likes {blog.likes}
          <Button className="mx-2" size="sm" onClick={handleAddLikes}>
            like
          </Button>
        </Card.Text>
        <Card.Text>added by {blog.user.name}</Card.Text>

        <Card.Text as="h4">Comments</Card.Text>

        <Form onSubmit={handleAddComment}>
          <Row>
            <Col sm={6}>
              <Form.Group className="mb-3" controlId="commentForm">
                <Form.Control
                  type="text"
                  placeholder="Enter comment"
                  onChange={() => setComment(event.target.value)}
                />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Button type="submit">Add Comment</Button>
            </Col>
          </Row>
        </Form>

        <ListGroup className="mt-2">
          {blog.comments.map((comment) => (
            <ListGroup.Item key={comment}>{comment}</ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  )
}

export default Blog
