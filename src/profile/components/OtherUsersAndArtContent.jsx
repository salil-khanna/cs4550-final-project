import React from 'react';
import { Col, Container, Dropdown } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import OtherUsers from './OtherUsers';
import Bookmarks from './Bookmarks';
import Reviews from './Reviews';
import styles from './YourProfile.module.css'

const OtherUsersAndArtContent = () => {
  
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  
  return (
    <Col md={isMediumScreen ? 6 : 12}>
        {isMediumScreen ? (
            <>
          <OtherUsers />
          <Bookmarks />
          <Reviews />
          </>
        ) : (
            <>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic" className={styles["horizontal-dropdown-menu"]} >
              Other Profiles
            </Dropdown.Toggle>
            <Dropdown.Menu className={styles["horizontal-dropdown-menu"]}>
              <Container>
                <OtherUsers />
              </Container>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic" className={styles["horizontal-dropdown-menu"]} >
              Bookmarks
            </Dropdown.Toggle>
            <Dropdown.Menu className={styles["horizontal-dropdown-menu"]}>
              <Container>
                <Bookmarks />
              </Container>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic" className={styles["horizontal-dropdown-menu"]} >
              Reviews
            </Dropdown.Toggle>
            <Dropdown.Menu className={styles["horizontal-dropdown-menu"]}>
              <Container>
                <Reviews />
              </Container>
            </Dropdown.Menu>
          </Dropdown>


          </>
        )}
    </Col>
  );
  
  
  
};

export default OtherUsersAndArtContent;
