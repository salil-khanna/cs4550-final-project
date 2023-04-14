import React from 'react';
import YourProfile from './components/YourProfile';
import { Container, Row } from 'react-bootstrap';
import RedirectToLogin from '../utils/RedirectToLogin';
import OtherUsersAndArtContent from './components/OtherUsersAndArtContent';

const SelfProfile = () => {
  const id = localStorage.getItem('id');

  return (
    <Container>
      <RedirectToLogin />
      {id && (
        <Row>
          <YourProfile/>
          <OtherUsersAndArtContent />
        </Row>
      )}
    </Container>
  )
  
};

export default SelfProfile;
