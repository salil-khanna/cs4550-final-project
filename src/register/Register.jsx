import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Container, Form, Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useMediaQuery } from 'react-responsive';
import './Register.css';
import RegisterStatue from '../img/register_statue.jpeg';
import RedirectToProfile from '../utils/RedirectToProfile';
import { useLocation } from 'react-router-dom';
import AppContext from '../AppContext';

const Register = () => {
  const user_id = localStorage.getItem('user_id');
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };


  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const isLargeScreen = useMediaQuery({ minWidth: 992 });
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    secretQuestion: '',
    secretAnswer: '',
    aboutMe: '',
    favoriteArtStyle: '',
  });

  const [matchingPassword, setMatchingPassword] = useState('');

  const secretQuestions = [
    'What was the name of your first pet?',
    'What was your childhood nickname?',
    'In what city did your parents meet?',
    'What is the name of your favorite book?',
    'What city did you go to elementary school in?',
    'What is your favorite movie?',
    'What is your mother\'s maiden name?',
    'What shoe size do you wear?',
  ];

  const artStyles = [
    'Abstract',
    'Impressionism',
    'Cubism',
    'Surrealism',
    'Pop Art',
    'Modernism',
    'Art Deco',
    'Minimalism',
    'Street Art',
  ];

  const isPasswordValid = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasNonAlphaNumeric = /[\W_]/.test(password);
  
    return hasUpperCase && hasLowerCase && hasNumber && hasNonAlphaNumeric;
  };

  // const missingValues = (password) => {
  //   const missingUppercase = !(/[A-Z]/.test(password)) ? ' uppercase letter;' : '';
  //   const missingLowercase = !(/[a-z]/.test(password)) ? ' lowercase letter;' : '';
  //   const missingNumber = !(/\d/.test(password)) ? ' number;' : '';
  //   const missingNonAlphaNumeric = !(/[\W_]/.test(password)) ? ' non-alphanumeric character;' : '';

  //   return missingUppercase + missingLowercase + missingNumber + missingNonAlphaNumeric;
  // }

   const getMissingCriteria = (password) => {
    return {
      uppercase: !/[A-Z]/.test(password),
      lowercase: !/[a-z]/.test(password),
      number: !/\d/.test(password),
      nonAlphaNumeric: !/[\W_]/.test(password),
    };
  };

  const missingCriteria = getMissingCriteria(formData.password);

  const renderCriteria = () => {
    return (
      <>
        Your password must have at least 
        {' '}
        <span style={{ color: missingCriteria.uppercase ? 'red' : 'inherit' }}>
          one uppercase character
        </span>
        {', '}
        <span style={{ color: missingCriteria.lowercase ? 'red' : 'inherit' }}>
          one lowercase character
        </span>
        {', '}
        <span style={{ color: missingCriteria.number ? 'red' : 'inherit' }}>
          one number
        </span>
        {', and '}
        <span style={{ color: missingCriteria.nonAlphaNumeric ? 'red' : 'inherit' }}>
          one non-alphanumeric character
        </span>
        .
      </>
    );
  };

  const handleSelectFocus = (e) => {
    e.target.firstChild.setAttribute('disabled', 'true');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const [showModal, setShowModal] = useState(false);

  const handleModCodeChange = (e) => {
    setFormData({ ...formData, modCode: e.target.value });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const [mod, setMod] = useState(false);

  const toastId = React.useRef(null);
  const notify = () => toastId.current = toast.loading("Please wait...");
  const updateLoading = () => toast.update(toastId.current);
  const updateFinishLoading = (text, messageType) => toast.update(toastId.current, {render: text, autoClose: 1350, type: messageType, isLoading: false});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.username.length > 20) {
        toast.error("Username must be less than 20 characters.");
        return;
    }
    
    if (!isPasswordValid(formData.password)) {
        toast.error("Invalid password...");
        return;
    }
    if (formData.password !== matchingPassword) {
        toast.error("Passwords do not match...");
        return;
    }
    if (toast.isActive(toastId.current)) {
        updateLoading();
    } else {
        notify();
    }

    try {
        const apiLink = `${AppContext.link}/users/register`;
        const response = await axios.post(apiLink, formData);
        if (response.status === 201) {
            localStorage.setItem('user', formData.username);
            localStorage.setItem('user_id', response.data.user_id);
            const {isMod} = response.data;
            localStorage.setItem('isMod', isMod);
            const welcomeText = isMod ? 'Moderator' : 'User';
            updateFinishLoading(`${welcomeText} successfully created! Logging in...`, 'success');
            setTimeout(() => {
            if (toast.isActive(toastId.current)) {
                toast.dismiss();
                toastId.current = null;
            }
            navigate(from);
            }, 1000);
        } else {
            updateFinishLoading('Error with my coding skills woops. Registering not possible :(', 'error');
        }
    } catch (error) {
        if (!error.response) {
            updateFinishLoading('Error with server, please wait and try again.', 'error');
        } else if (error.response.status === 409) {
            updateFinishLoading('User already exists, please login or try different username.', 'warning');
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
        <Col md={isMediumScreen ? 7 : 12}>
        <h1>Register</h1>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
                <Form.Label>Username </Form.Label>
                <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter username"
                    className='fix-margin '
                    required
                    isInvalid={formData.username && formData.username.length > 20}
                />
                <Form.Control.Feedback type="invalid" className="fix-margin">
                    Username must be less than 20 characters.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    required
                    className="fix-margin "
                    isInvalid={formData.password && !isPasswordValid(formData.password)}
                />
                <Form.Text className="text-muted" >
                    {renderCriteria()}
                    {/* Your password must have at least one uppercase character, one number, and one non-alphanumeric character. */}
                </Form.Text>
                {/* <Form.Control.Feedback type="invalid" className="fix-margin">
                    { "Please enter a valid password. Missing:" + missingValues(formData.password) }
                </Form.Control.Feedback> */}
            </Form.Group>

            <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={matchingPassword}
                    onChange={(e) => { setMatchingPassword(e.target.value) }}
                    required
                    className="fix-margin "
                    isInvalid={matchingPassword && (formData.password !== matchingPassword)}
                />
                <Form.Control.Feedback type="invalid" className="fix-margin">
                    Passwords do not match.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="secretQuestion">
            <Form.Label>Secret Question</Form.Label>
            <Form.Control
                as="select"
                name="secretQuestion"
                value={formData.secretQuestion}
                onChange={handleChange}
                onFocus={handleSelectFocus}
                className='fix-margin '
                required
            >
                <option value="">Select a secret question</option>
                {secretQuestions.map((question, index) => (
                <option key={index} value={question}>
                    {question}
                </option>
                ))}
            </Form.Control>
            </Form.Group>

            <Form.Group controlId="secretAnswer">
            <Form.Label>Answer to Secret Question</Form.Label>
            <Form.Control
                type="text"
                name="secretAnswer"
                value={formData.secretAnswer}
                onChange={handleChange}
                placeholder="Enter answer"
                className='fix-margin '
                required
            />
            </Form.Group>

            <Form.Group controlId="aboutMe">
            <Form.Label>About Me</Form.Label>
            <Form.Control
                as="textarea"
                name="aboutMe"
                value={formData.aboutMe}
                onChange={handleChange}
                placeholder="About you!"
                className='fix-margin '
                required
            />
            </Form.Group>

            <Form.Group controlId="favoriteArtStyle">
            <Form.Label>Favorite Art Style</Form.Label>
            <Form.Control
                as="select"
                name="favoriteArtStyle"
                value={formData.favoriteArtStyle}
                onChange={handleChange}
                onFocus={handleSelectFocus}
                className='fix-margin'
                required
            >
                <option value="">Select your favorite art style</option>
                {artStyles.map((style, index) => (
                <option key={index} value={style}>
                    {style}
                </option>
                ))}
            </Form.Control>
            </Form.Group>

            

            <Row>
        <Col xs={12} md={6} className="d-flex justify-content-md-start justify-content-center mb-2">
          <Button variant="primary" type="submit" className="mt-2">
            Register
          </Button>
        </Col>
        <Col xs={12} md={6} className="d-flex justify-content-md-end justify-content-center mb-2">
          {mod ?
        
            <Button
            variant="danger"
            className="mt-2"
            onClick={
                () => {

                    setMod(false);
                    handleModCodeChange({ target: { value: "" } });
                }
            }
          >
              Remove Mod Permissions.
          </Button> 
          
          :
          
          <Button
            variant="secondary"
            className="mt-2"
            onClick={openModal}
          >
              Enable Moderator Permissions?
          </Button> }
        </Col>
      </Row>
        </Form>
      </Col>
      {isLargeScreen && <Col md={1}></Col>}
      {isMediumScreen && (
          <Col md={isLargeScreen ? 4 : 5}>
            <img 
            src={RegisterStatue} 
            alt="Michelangelo's David"
            className={`img-fluid ${isLargeScreen ? "mt-4" : "mt-5"}`}
            />

          </Col>
        )}
    </Row>
    }

<Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Moderator Code</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="modCode">
            <Form.Label>Mod Code</Form.Label>
            <Form.Control
              type="password"
              name="modCode"
              value={formData.modCode}
              onChange={handleModCodeChange}
              placeholder="Enter valid mod code to grant permissions."
              className="fix-margin "
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              closeModal();
              if (formData.modCode !== process.env.REACT_APP_MOD_CODE) {
                toast.error("Invalid mod code.");
                handleModCodeChange({ target: { value: "" } });
              } else {
                toast.success("Valid mod code!");
                setMod(true);
              }
            }}
          >
            Request Permissions
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Register;
