import React from 'react';
import YourProfile from './components/YourProfile';
import { Container, Row } from 'react-bootstrap';
import RedirectToLogin from '../utils/RedirectToLogin';
import OtherUsersAndArtContent from './components/OtherUsersAndArtContent';

const SelfProfile = () => {
  const user_id = localStorage.getItem('user_id');

  return (
    <Container>
      <RedirectToLogin />
      {user_id && (
        <Row>
          <YourProfile/>
          <OtherUsersAndArtContent />
        </Row>
      )}
    </Container>
  )
  
};

export default SelfProfile;
