import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

    // instead of page being passed into header, useLocation() can be used to get the current page
  const location = useLocation();
  let pageName = "";
  if (location.pathname === "/") {
    pageName = "home";
  } else {
    pageName = location.pathname.split('/')[1];
  }

    
  const displayHeader = pageName !== "home";
  const buttonMd = displayHeader ? 6 : 12;
  const buttonJustify = displayHeader ? "justify-content-md-end" : "justify-content-sm-end";

  return (
    <Container fluid className="header">
      <Row className="align-items-center">
        {displayHeader && 
        <Col xs={12} md={6} className="d-flex justify-content-center justify-content-md-start logo-text-container">
            <a href="/" style={{textDecoration:'none', color: 'inherit'}}>
                <div className="d-flex align-items-center">
                    <Image src="logo512.png" alt="GalleryGrade Logo" className="header-logo" roundedCircle />
                    <h3 className="header-text">GalleryGrade</h3>
                </div>
            </a>
        </Col>
        }
        <Col xs={12} md={buttonMd} className={`d-flex justify-content-center ${buttonJustify} buttons-container`}>
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
