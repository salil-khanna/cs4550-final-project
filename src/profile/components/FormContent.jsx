import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { toast } from 'react-toastify';
import axios from 'axios';

const FormContent = () => {
  const id = localStorage.getItem('id');
  const username = localStorage.getItem('user');
  const navigate = useNavigate();
  

  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  const saveButton = isMediumScreen ? '' : 'text-center';
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [secretAnswerHidden, setSecretAnswerHidden] = useState(true);
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
  const [matchingPassword, setMatchingPassword] = useState('');

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id !== null) {
        const apiLink = `http://localhost:8080/users/${username}/${id}`;
        axios.get(apiLink)
          .then((response) => {
            setInitialData({
              password: "",
              secretQuestion: response.data.secretQuestion,
              secretAnswer: "",
              aboutMe: response.data.aboutMe,
              favoriteArtStyle: response.data.favoriteArtStyle,
            });
            setFormData({
              password: "",
              secretQuestion: response.data.secretQuestion,
              secretAnswer: "",
              aboutMe: response.data.aboutMe,
              favoriteArtStyle: response.data.favoriteArtStyle,
            });
            setMatchingPassword("");
            setIsLoading(false);
          }).catch((error) => {
            toast.error('Error with server, redirecting to home page.');
            setTimeout(() => {
              navigate('/');
            }, 1250);
          });
        }
    
    
  }, [id, navigate, username]);

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

  const handleChangeAndRevealSecretAnswer = (event) => {
    handleChange(event); // Call the handleChange function
    setSecretAnswerHidden(false); // Call the setSecretAnswerHidden function
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

    if (!isPasswordValid(formData.password) && formData.password !== '') {
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
      const baseApiLink = 'http://localhost:8080/users/update-user-info';
      const response = await axios.put(baseApiLink, {
        username: username,
        id: id,
        password: formData.password,
        secretQuestion: formData.secretQuestion,
        secretAnswer: formData.secretAnswer,
        aboutMe: formData.aboutMe,
        favoriteArtStyle: formData.favoriteArtStyle,
      });
      
      if (response.status === 201) {
        updateFinishLoading('Profile updates saved!', 'success');
        setInitialData({
          password: formData.password,
          secretQuestion: formData.secretQuestion,
          secretAnswer: formData.secretAnswer,
          aboutMe: formData.aboutMe,
          favoriteArtStyle: formData.favoriteArtStyle,
      });
      } else {
        updateFinishLoading('Error with my coding skills woops. Saving not possible :(', 'error');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        updateFinishLoading(error.response.data.error, 'warning'); 
      } else {
          updateFinishLoading('Error with server, please wait and try again.', 'error');
      }
    };
  };

  return (isLoading ? (
    <div className="d-flex justify-content-center align-items-center">
      <Spinner animation="border" />
    </div>
  ) :(
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
                {passwordHidden ? 
                  <Form.Control
                  type="password"
                  name="password"
                  value="BLAHBLAHBLAHBLAHBLAHBLAH"
                  onChange={() => { setPasswordHidden(false) }}
                  className="fix-margin "
                  isInvalid={formData.password && !isPasswordValid(formData.password)}
              /> 
                : <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="fix-margin "
                    required
                    isInvalid={formData.password && !isPasswordValid(formData.password)}
                /> }
                <Form.Text className="text-muted" >
                    Your password must have at least one uppercase character, one number, and one non-alphanumeric character.
                </Form.Text>
                <Form.Control.Feedback type="invalid" className="fix-margin">
                    { "Please enter a valid password. Missing:" + missingValues(formData.password) }
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                {passwordHidden ? <Form.Control
                    type="password"
                    name="confirmPassword"
                    value="BLAHBLAHBLAHBLAHBLAHBLAH"
                    onChange={() => { setPasswordHidden(false) }}
                    className="fix-margin "
                    isInvalid={matchingPassword && (formData.password !== matchingPassword)}
                />
                : <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={matchingPassword}
                    onChange={(e) => { setMatchingPassword(e.target.value) }}
                    required
                    className="fix-margin "
                    isInvalid={matchingPassword && (formData.password !== matchingPassword)}
                /> }
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
                onChange={handleChangeAndRevealSecretAnswer}
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
            {secretAnswerHidden ? <Form.Control
                    type="password"
                    name="secretAnswer"
                    value="BLAHBLAHBLAHBLAHBLAHBLAH"
                    onChange={() => { setSecretAnswerHidden(false) }}
                    className="fix-margin "
                />
                :
            <Form.Control
                type="text"
                name="secretAnswer"
                value={formData.secretAnswer}
                onChange={handleChange}
                className='fix-margin '
                required
            /> }
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
            <Row>
              <Col className="d-md-flex justify-content-md-between text-center">
                <Col md="auto">
                  <Button variant="primary" className="mt-2" type="submit">
                    Save
                  </Button>
                </Col>
                <Col md="auto">
                  <Button variant="danger" className="mt-2">
                    Delete Profile
                  </Button>
                </Col>
              </Col>
            </Row>
            </div>
          </Form>
  ));
};

export default FormContent;
