import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useMediaQuery } from 'react-responsive';
import './Login.css';
import LoginPainting from '../img/login_painting.jpeg';
import RedirectToProfile from '../utils/RedirectToProfile';

const Login = () => {
  const user_id = localStorage.getItem('user_id');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const loginButton = isMediumScreen ? '' : 'text-center';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toastId = React.useRef(null);
  const notify = () => toastId.current = toast.loading("Please wait...");
  const updateLoading = () => toast.update(toastId.current);
  const updateFinishLoading = (text, messageType) => toast.update(toastId.current, {render: text, autoClose: 1250, type: messageType, isLoading: false});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (toast.isActive(toastId.current)) {
      updateLoading();
    } else {
        notify();
    }
    try {
      const apiLink = "http://localhost:8080/users/login";
      const response = await axios.post(apiLink, formData);
      if (response.status === 200) {
        localStorage.setItem('user', formData.username);
        localStorage.setItem('user_id', response.data.user_id);
        updateFinishLoading(`Welcome ${formData.username}!`, "success");

        setTimeout(() => {
          navigate('/');
        }, 400);
      } else {
        updateFinishLoading('Error with my coding skills woops. Login not possible :(', 'error');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        updateFinishLoading(error.response.data.error, 'warning');
      } else {
        updateFinishLoading('Error with server, please wait and try again.', 'error');
      }
    }
  };

  return (
    <Container>
      <RedirectToProfile />
      {user_id === null && 
      <Row>
        {isMediumScreen && (
          <Col md={4}>
            <img
              src={LoginPainting}
              alt="Mona Lisa"
              className="img-fluid"
            />
          </Col>
        )}
        <Col md={isMediumScreen ? 5 : 12}>
          <h1>Login</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
                className="fix-margin"
                required
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="fix-margin"
                required
              />
            </Form.Group>
            <div className={loginButton}>
              <Link to="/forget-password" className="d-block">
                Forgot password?
              </Link>
              <Button variant="primary" type="submit" className='mt-3'>
                Login
              </Button>
            </div>
          </Form>
        </Col>
        {!isMediumScreen && (
          <Col xs={12} className="mt-4 text-center" style={{ height: '30%', maxWidth: 'none' }}>
          <img
            src={LoginPainting}
            alt="Mona Lisa"
            style={{ height: '45%', maxWidth: '45%' }}
          />
        </Col>
        )}
      </Row>
      }
    </Container>
  );
};

export default Login;
