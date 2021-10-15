import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { Link } from 'react-router-dom'
import { userLogout } from '../reducers/loginReducer'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import LoginForm from './LoginForm'

const Menu = () => {
  const login = useSelector((state) => state.login)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(userLogout())
  }

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">Blogs</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-blogs" />
          <Navbar.Collapse id="navbar-blogs">
            <Nav className="me-auto">
              <Nav.Link href="/">blogs</Nav.Link>
              <Nav.Link href="/users">Users</Nav.Link>
            </Nav>
            {login !== null ? (
              <span>
                {login.name} logged in{' '}
                <Button onClick={handleLogout}>logout</Button>
              </span>
            ) : null}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {login === null ? <LoginForm /> : null}
    </div>
  )

  // return (
  //   <div>
  //     <Link style={padding} to="/">
  //       blogs
  //     </Link>
  //     <Link style={padding} to="/users">
  //       users
  //     </Link>
  //     {login === null ? (
  //       <LoginForm />
  //     ) : (
  //       <span>
  //         {login.name} logged in <button onClick={handleLogout}>logout</button>
  //       </span>
  //     )}
  //   </div>
  // )
}

export default Menu
