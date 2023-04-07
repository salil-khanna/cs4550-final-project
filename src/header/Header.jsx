import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  return (
    <Container fluid className="header">
      <Row className="align-items-center">
        <Col xs={12} md={6} className="d-flex justify-content-center justify-content-md-start logo-text-container">
          <div className="d-flex align-items-center">
            <Image src="logo512.png" alt="GalleryGrade Logo" className="header-logo" roundedCircle />
            <h3 className="header-text">GalleryGrade</h3>
          </div>
        </Col>
        <Col xs={12} md={6} className="d-flex justify-content-center justify-content-md-end buttons-container">
          <Button size="sm" className="login-btn" onClick={() => navigate('/login')}>
            Log in
          </Button>
          <Button size="sm" className="register-btn" onClick={() => navigate('/register')}>
            Register
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
