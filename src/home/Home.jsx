import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';
import './HomePage.css';
import Header from '../header/Header';

const Home = () => {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search`, { state: { searchText } });
  };

  return (
    <Container className="home-page">
      <Header />
      <div className="logo-and-search">
        <Row className="text-center">
          <Col className="d-flex justify-content-center align-items-center">
            <Image src="logo512.png" alt="GalleryGrade Logo" className="logo" roundedCircle />
            <h1 className="gallery-grade-text">GalleryGrade</h1>
          </Col>
        </Row>
        <div className="shorten">
          <form onSubmit={handleSearchSubmit} className="row mt-2 search-row">
            <div className="col-10">
              <input
                type="text"
                className="form-control mt-4"
                placeholder="Search for art!"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <div className="col-2">
              <button type="submit" className="btn btn-primary mt-4">
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
