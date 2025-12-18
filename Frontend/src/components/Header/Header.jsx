import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './Header.css';

const Header = ({ activePage, setActivePage }) => {
  return (
    <Navbar bg="light" expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand href="#home" className="navbar-brand-custom">
          Для моей любимой ❤️
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link 
              href="#home" 
              className={`nav-link-custom ${activePage === 'home' ? 'active' : ''}`}
              onClick={() => setActivePage('home')}
            >
              Главная
            </Nav.Link>
            <Nav.Link 
              href="#gallery"
              className={`nav-link-custom ${activePage === 'gallery' ? 'active' : ''}`}
              onClick={() => setActivePage('gallery')}
            >
              Наша галерея
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;