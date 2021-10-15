import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { userLogin } from '../reducers/loginReducer'
import { Form, Button, Col } from 'react-bootstrap'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(userLogin({ username, password }))
  }

  return (
    <Form onSubmit={handleLogin}>
      <Col sm={3}>
        <Form.Group className="mb-3" controlId="loginUsernameForm">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            onChange={() => setUsername(event.target.value)}
          />
        </Form.Group>
      </Col>
      <Col sm={3}>
        <Form.Group className="mb-3" controlId="loginPasswordForm">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            onChange={() => setPassword(event.target.value)}
          />
        </Form.Group>
      </Col>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default LoginForm
