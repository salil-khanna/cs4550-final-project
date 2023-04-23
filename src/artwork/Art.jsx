import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import ArtContent from './components/ArtContent';
import GalleryContent from './components/GalleryContent';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import AppContext from '../AppContext';

const Art = () => {
  const { art_id } = useParams();
  const user_id = localStorage.getItem('user_id') || '';
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${AppContext.link}/art/${art_id}/${user_id}`);
        const result = response.data;
        setData(result);
        setIsLoading(false);
      } catch (err) {
        toast.error("Error with server.");
        setTimeout(() => {
          navigate('/search');
        }, 1250);
      }
    };
    fetchData();
  }, [art_id, user_id, navigate]);

  if (isLoading) {
    return (<div className="d-flex justify-content-center align-items-center">
    <Spinner animation="border" />
  </div>);
  }

  return (
      <Container fluid className="art-container">
        <Row>
          <Col xs={12} md={6} className="art-left">
            <ArtContent data={data.art} />
          </Col>
          <Col xs={12} md={6} className="art-right">
            <GalleryContent art={data.art} galleryInfo={data.galleryInfo} />
          </Col>
        </Row>
      </Container>
  );
};

export default Art;
