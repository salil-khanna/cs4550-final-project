import React, {useEffect} from 'react';
import YourProfile from './components/YourProfile';
import { Container, Row } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

const SelfProfile = () => {
  const id = localStorage.getItem('id');
  const navigate = useNavigate();
  useEffect(() => {
    if (id === null) {
      navigate('/login');
    } else {
      // Fetch user data from the API and update formData here
      // You can use the useState hook to set the initial formData
    }
  }, [id, navigate]);

  return (
    <Container>
      {id && (
        <Row>
          <YourProfile/>
          <YourProfile/>
        </Row>
      )}
    </Container>
  )
  
};

export default SelfProfile;
