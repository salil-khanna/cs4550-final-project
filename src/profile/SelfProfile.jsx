import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { toast } from 'react-toastify';
import axios from 'axios';

const SelfProfile = () => {
  const id = localStorage.getItem('id');
  const username = localStorage.getItem('user');
  const navigate = useNavigate();
  
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const saveButton = isMediumScreen ? '' : 'text-center';
  const [initialData, setInitialData] = useState({
    password: '',
    secretQuestion: '',
    secretAnswer: '',
    aboutMe: '',
    favoriteArtStyle: '',
  });


  const [formData, setFormData] = useState({
    password: '',
    secretQuestion: '',
    secretAnswer: '',
    aboutMe: '',
    favoriteArtStyle: '',
  });

  useEffect(() => {
    if (id === null) {
      navigate('/login');
    } else {
      // Fetch user data from the API and update formData here
      // You can use the useState hook to set the initial formData
    }
  }, [id, navigate]);

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

  const missingValues = (password) => {
    const missingUppercase = !(/[A-Z]/.test(password)) ? ' uppercase letter;' : '';
    const missingLowercase = !(/[a-z]/.test(password)) ? ' lowercase letter;' : '';
    const missingNumber = !(/\d/.test(password)) ? ' number;' : '';
    const missingNonAlphaNumeric = !(/[\W_]/.test(password)) ? ' non-alphanumeric character;' : '';

    return missingUppercase + missingLowercase + missingNumber + missingNonAlphaNumeric;
  }

  const handleSelectFocus = (e) => {
    e.target.firstChild.setAttribute('disabled', 'true');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sameData = (initialData, formData) => {
    return initialData.password === formData.password &&
      initialData.secretQuestion === formData.secretQuestion &&
      initialData.secretAnswer === formData.secretAnswer &&
      initialData.aboutMe === formData.aboutMe &&
      initialData.favoriteArtStyle === formData.favoriteArtStyle;
  };

  const toastId = React.useRef(null);
  const notify = () => toastId.current = toast.loading("Please wait...");
  const updateLoading = () => toast.update(toastId.current);
  const updateFinishLoading = (text, messageType) => toast.update(toastId.current, {render: text, autoClose: 1250, type: messageType, isLoading: false});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sameData(initialData, formData)) {
      toast.error("No changes made to save...");
      return;
    }

    if (!isPasswordValid(formData.password)) {
      toast.error("Invalid password...");
      return;
    }

    if (toast.isActive(toastId.current)) {
        updateLoading();
    } else {
        notify();
    }

    try {
      const data = {
        "id": 12345,
        "value": "abc-def-ghi"
      }
      const response = await axios.put('https://8yv8y.mocklab.io/saveProfile', data);
    //   const response = await axios.post('OUR_API_LINK', formData);
      if (response.status === 201) {
        updateFinishLoading('Profile updates saved!', 'success');
      } else {
        updateFinishLoading('Error with my coding skills woops. Saving not possible :(', 'error');
      }

    } catch (error) {
        updateFinishLoading('Error with server, please wait and try again.', 'error');
    };
  };

  return (
    <Container>
      {id && (
        <Row>
          <Col md={isMediumScreen ? 6 : 12}>
          <h1>Your Profile</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={username}
                readOnly
                className="fix-margin bg-gray text-dark"
              />
            </Form.Group>

            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="fix-margin "
                    isInvalid={formData.password && !isPasswordValid(formData.password)}
                />
                <Form.Text className="text-muted" >
                    Your password must have at least one uppercase character, one number, and one non-alphanumeric character.
                </Form.Text>
                <Form.Control.Feedback type="invalid" className="fix-margin">
                    { "Please enter a valid password. Missing:" + missingValues(formData.password) }
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
            
            <div className={saveButton}>
                <Button variant="primary" type="submit" className="mt-2">
                Save
                </Button>
            </div>
          </Form>
          </Col>
          {isMediumScreen && (
          <Col md={6}>
            <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/David_%28Michelangelo%29_01.jpg/1200px-David_%28Michelangelo%29_01.jpg"
            alt="Michelangelo's David"
            className="img-fluid mt-3"
            />

          </Col>
        )}


        </Row>
      )}
    </Container>
  );
};

export default SelfProfile;
