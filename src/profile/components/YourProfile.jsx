import React from 'react';
import { Col, Container, Dropdown } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import FormContent from './FormContent';
import styles from './YourProfile.module.css'

const YourProfile = () => {
  
  const isMediumScreen = useMediaQuery({ minWidth: 768 });
  
  return (
    <Col md={isMediumScreen ? 6 : 12}>
        {isMediumScreen ? (
          <>
            <h4 className={styles.removeMargin}>Your Profile</h4>
            <FormContent />
          </>
        ) : (
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic" className={styles["horizontal-dropdown-menu"]} >
              Update Your Profile
            </Dropdown.Toggle>
            <Dropdown.Menu className={styles["horizontal-dropdown-menu"]}>
              <Container>
                <FormContent />
              </Container>
            </Dropdown.Menu>
          </Dropdown>
        )}
    </Col>
  );
  
  
  
};

export default YourProfile;
