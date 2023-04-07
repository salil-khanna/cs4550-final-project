import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';
import './HomePage.css';
import { toast } from 'react-toastify';
import { useMediaQuery } from 'react-responsive';
import LogoHeader from '../img/logo512.png';


const Home = () => {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const toastId = React.useRef(null);
  const notify = () => toastId.current = toast.error("Search can not be empty!");
  const update = () => toast.update(toastId.current);
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchText === '') {
      if (toast.isActive(toastId.current)) {
        update();
      } else {
        notify();
      }
    } else {
      toast.dismiss();
      navigate(`/search`, { state: { searchText } });
    }
  };

  const isMobile = useMediaQuery({ query: '(max-width: 575px)' });
  const buttonMobileClass = isMobile ? 'text-center' : '';

  return (
    <Container className="home-page">
      <div className="logo-and-search">
        <Row className="text-center">
        <a href="/" style={{textDecoration:'none', color: 'inherit'}}>
          <Col className="d-flex justify-content-center align-items-center">
              <Image src={LogoHeader} alt="GalleryGrade Logo" className="logo" roundedCircle />
              <h1 className="gallery-grade-text">GalleryGrade</h1>
          </Col>
          </a>
        </Row>
        <div className="shorten">
          <form onSubmit={handleSearchSubmit} className="row mt-3 search-row">
            <div className="col-12 col-sm-9 mt-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search for art!"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <div className={`col-12 ${buttonMobileClass} col-sm-2 mt-2`}>
              <button type="submit" className="btn btn-primary">
                Search!
              </button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Home;
