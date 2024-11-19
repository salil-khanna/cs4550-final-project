import React, { useState } from 'react';
import axios from 'axios';
import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import RedirectToProfile from '../utils/RedirectToProfile';
import { useMediaQuery } from 'react-responsive';
import ForgetPasswordWave from '../img/newPassword_wave.jpeg';
import AppContext from '../AppContext';

const ForgetPassword = () => {
  const user_id = localStorage.getItem('user_id');
  const navigate = useNavigate();

    const isMediumScreen = useMediaQuery({ minWidth: 768 });
    const isLargeScreen = useMediaQuery({ minWidth: 992})
    const centerButton = isMediumScreen ? '' : 'text-center';

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    secretQuestion: '',
    secretAnswer: '',
  });

  const [updatePasswordFormData, setUpdatePasswordFormData] = useState({
    username: '',
    secretQuestion: '',
    secretAnswer: '',
    user_id: '',
    password: '',
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

  const missingCriteria = getMissingCriteria(updatePasswordFormData.password);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangePassword = (e) => {
    setUpdatePasswordFormData({...updatePasswordFormData, [e.target.name]: e.target.value })
  };


  const toastId = React.useRef(null);
  const notify = () => toastId.current = toast.loading("Please wait...");
  const updateLoading = () => toast.update(toastId.current);
  const updateFinishLoading = (text, messageType) => toast.update(toastId.current, {render: text, autoClose: 1250, type: messageType, isLoading: false});

  const handleSecretQuestionSubmit = async (e) => {
    e.preventDefault();
    if (toast.isActive(toastId.current)) {
        updateLoading();
    } else {
        notify();
    }

    try {
        const apiLink = `${AppContext.link}/users/secret-question`;
        const response = await axios.post(apiLink, formData);
        if (response.status === 200) {
          updateFinishLoading('Answer to secret question was correct! Update your password.', 'success');
          setStep(2); 
        
          setUpdatePasswordFormData({
              username: formData.username,
              user_id: response.data.user_id,
              password: '',
          });

        } else {
          updateFinishLoading('Error with my coding skills woops. Registering not possible :(', 'error');
        }
  
      } catch (error) {
        if (error.response && error.response.status === 401) {
            updateFinishLoading(error.response.data.error, 'warning'); // username does not exist || secret question and answer do not match,display from backend
        } else {
            updateFinishLoading('Error with server, please wait and try again.', 'error');
        }
      }
  };

  const handleNewPasswordSubmit = async (e) => {
    e.preventDefault();

    if (!isPasswordValid(updatePasswordFormData.password)) {
      toast.error("Invalid password...");
      return;
    }

    if (updatePasswordFormData.password !== matchingPassword) {
        toast.error("Passwords do not match...");
        return;
    }

    if (toast.isActive(toastId.current)) {
        updateLoading();
    } else {
        notify();
    }

    try {
        const apiLink = `${AppContext.link}/users/reset-password`;
        const response = await axios.put(apiLink, updatePasswordFormData);
        if (response.status === 201) {
          updateFinishLoading('Password successfully updated! Logging in...', 'success');
          localStorage.setItem('user', formData.username);
          localStorage.setItem('user_id', response.data.user_id);
          localStorage.setItem('isMod', response.data.isMod);

          setTimeout(() => {
            if (toast.isActive(toastId.current)) {
              toast.dismiss();
              toastId.current = null;
            }
            navigate('/');
          }, 1000);
        } else {
          updateFinishLoading('Error with my coding skills woops. Registering not possible :(', 'error');
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
      <Row>
        <Col md={isMediumScreen ? (isLargeScreen ? 4 : 6) : 12}>
          {step === 1 ? (
            <>
              <RedirectToProfile />
              {user_id === null && (
                <>
              <h1>Forgot Password</h1>
              <Form onSubmit={handleSecretQuestionSubmit}>
                <Form.Group controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter username"
                    className='fix-margin'
                    required
                  />
                </Form.Group>

                <Form.Group controlId="secretQuestion">
                  <Form.Label>Secret Question</Form.Label>
                  <Form.Control
                    as="select"
                    name="secretQuestion"
                    value={formData.secretQuestion}
                    onChange={handleChange}
                    className='fix-margin'
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
                    className='fix-margin'
                    placeholder='Enter answer to secret question'
                    required
                  />
                </Form.Group>

                <div className={centerButton}>
                    <Button variant="primary" type="submit" className="mt-2">
                        Next
                    </Button>
                </div>
              </Form>
              </>
              )}
            </>
          ) : (
            <>
              <h1>Reset Password</h1>
              <Form onSubmit={handleNewPasswordSubmit}>
                <Form.Group controlId="password">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={updatePasswordFormData.password}
                    onChange={handleChangePassword}
                    required
                    className="fix-margin"
                    placeholder='Enter new password'
                    isInvalid={updatePasswordFormData.password && !isPasswordValid(updatePasswordFormData.password)}
                  />
                  <Form.Text className="text-muted">
                    {/* Your password must have at least one uppercase character, one number, and one non-alphanumeric character. */}
                    {renderCriteria()}
                  </Form.Text>
                  {/* <Form.Control.Feedback type="invalid" className="fix-margin">
                    { "Please enter a valid password. Missing:" + missingValues(updatePasswordFormData.password) }
                  </Form.Control.Feedback> */}
                </Form.Group>

                <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={matchingPassword}
                        onChange={(e) => { setMatchingPassword(e.target.value) }}
                        required
                        className="fix-margin "
                        placeholder='Confirm new password'
                        isInvalid={matchingPassword && (updatePasswordFormData.password !== matchingPassword)}
                    />
                    <Form.Control.Feedback type="invalid" className="fix-margin">
                        Passwords do not match.
                    </Form.Control.Feedback>
                </Form.Group>

                <div className={centerButton}>
                    <Button variant="primary" type="submit" className="mt-2">
                        Reset!
                    </Button>
                </div>
              </Form>
            </>
          )}
        </Col>
        {isLargeScreen && <Col md={1}></Col>}
        {isMediumScreen && (
          <Col md={isLargeScreen ? 7 : 6}> 
            <img 
            src={ForgetPasswordWave} 
            alt="The japanese wave"
            className={`img-fluid ${isLargeScreen ? "mt-3" : "mt-5"}`}
            />

          </Col>
        )}
        {!isMediumScreen && (
          <Col xs={12} className="mt-4 text-center" style={{ height: '30%', maxWidth: 'none' }}>
          <img
            src={ForgetPasswordWave}
            alt="Wave"
            style={{ height: '90%', maxWidth: '90%' }}
          />
        </Col>
        )}
      </Row>
    </Container>
  );
};

export default ForgetPassword;
