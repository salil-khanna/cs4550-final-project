import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Spinner, Dropdown } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router';
import '../../login/Login.css'
import OtherUsersDisplay from './OtherUsers';
import { useMediaQuery } from 'react-responsive';
import styles from './YourProfile.module.css'
import UserReviews from './UserReviews';
import AppContext from '../../AppContext';



const OtherProfile = ({ username }) => {
  const [profileData, setProfileData] = useState({
    username: username,
    aboutMe: '',
    favoriteArtStyle: '',
  });

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const isMediumScreen = useMediaQuery({ minWidth: 992 });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${AppContext.link}/users/${username}`);
        setProfileData({
          username: username,
          aboutMe: response.data.aboutMe,
          favoriteArtStyle: response.data.favoriteArtStyle,
        });
        setIsLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toast.error(error.response.data.error);
        } else {
          toast.error('Error with server, redirecting to home page.');
        }
        setTimeout(() => {
          navigate('/');
        }, 1250);
      }
    };

    fetchProfileData();
  }, [username, navigate]);

  return isLoading ? (
    <div className="d-flex justify-content-center align-items-center">
      <Spinner animation="border" />
    </div>
  ) : (
    <Container>
      <Row>
        <Col xs={12} className="text-center">
          <h2>{username}'s Profile</h2>
        </Col>
      </Row>
      <Row>
        <Col xs={12} lg={6}>
          <Form>
            <Form.Group controlId="username">
              <Form.Label>Username: </Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={profileData.username}
                readOnly
                className="bg-gray text-dark fix-margin"
              />
            </Form.Group>

            <Form.Group controlId="aboutMe">
              <Form.Label>About: </Form.Label>
              <Form.Control
                as="textarea"
                name="aboutMe"
                value={profileData.aboutMe}
                readOnly
                className="bg-gray text-dark fix-margin"
              />
            </Form.Group>

            <Form.Group controlId="favoriteArtStyle">
              <Form.Label>Favorite Art Style: </Form.Label>
              <Form.Control
                type="text"
                name="favoriteArtStyle"
                value={profileData.favoriteArtStyle}
                readOnly
                className="bg-gray text-dark fix-margin"
              />
            </Form.Group>
          </Form>
        </Col>

        {isMediumScreen && <Col xs={12} lg={6} className="text-center mt-2">
          <OtherUsersDisplay remove={username}/>
        </Col> }

      </Row>
      
      {!isMediumScreen &&
      
      <Dropdown>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic" className={`${styles["horizontal-dropdown-menu"]} mt-2`} >
        Other Profiles
      </Dropdown.Toggle>
      <Dropdown.Menu className={styles["horizontal-dropdown-menu"]}>
        <Container>
        <OtherUsersDisplay remove={username}/>
        </Container>
      </Dropdown.Menu>
    </Dropdown>
    
    }
    <UserReviews username={username}/>

    </Container>
  );
};

export default OtherProfile;