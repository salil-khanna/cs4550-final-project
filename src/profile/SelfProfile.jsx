import React, {useEffect} from 'react';
import YourProfile from './components/YourProfile';
import { Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import RedirectToLogin from '../utils/RedirectToLogin';

const SelfProfile = () => {
  const id = localStorage.getItem('id');
  const navigate = useNavigate();
  useEffect(() => {
    if (id !== null) {
      // Fetch user data from the API and update formData here
      // You can use the useState hook to set the initial formData
    }
  }, [id, navigate]);

  return (
    <Container>
      <RedirectToLogin />
      {id && (
        <Row>
          <YourProfile/>
        </Row>
      )}
    </Container>
  )
  
};

export default SelfProfile;
