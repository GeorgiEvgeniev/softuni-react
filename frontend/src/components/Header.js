import {Container, Nav, Navbar} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import catlogo from '../catlogo.png'

export const Header = () => {
  const {isAuthenticated} = useContext(AuthContext);
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/"><img src={catlogo} alt="Cat Logo" id='cat-logo' /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/catalog">Catalog</Nav.Link>

          {isAuthenticated && (
            <>
              <Nav.Link as={Link} to="/add">Add a cat</Nav.Link>
              <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
          </>
          )}

          {!isAuthenticated && (
            <>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
            </>
          )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}