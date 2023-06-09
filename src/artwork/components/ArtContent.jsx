import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import './Art.css'

const ArtContent = ({ data }) => {

    const isSmallScreen = useMediaQuery({ query: '(max-width: 575.98px)' });
    const isMediumScreen = useMediaQuery({ query: '(min-width: 576px) and (max-width: 767.98px)' });

    const {
      art_info: {
        title,
        thumbnail: { alt_text },
        date_start,
        date_end,
        artist_display,
        medium_display,
        department_title,
        image_id,
      },
      image_url,
    } = data;
  
    const fullImageUrl = `${image_url}/${image_id}/full/320,/0/default.jpg`;
  
    return (
      <Container className="art-content">
        <Row>
          <Col>
            <Link to="/search" className="back-to-search">
              {'< Back to Search'}
            </Link>
            <Card
            style={{
              width: isSmallScreen ? '100%' : isMediumScreen ? '100%' : 'auto',
            }}
          >
            <Card.Img
              variant="top"
              className="mt-2 img-fluid"
              src={fullImageUrl}
              alt={alt_text}
            />
              <Card.Body>
                <Card.Title className="card-title">{title}</Card.Title>
                <Card.Text>
                  <p><strong>Artwork: </strong>{alt_text}</p>
                  <p><strong>Artist Info: </strong>{artist_display}</p>
                  <p>
                    <strong>Time Created: </strong>{date_start} - {date_end}
                  </p>
                  <p><strong>Medium: </strong>{medium_display}</p>
                  <p><strong>Department: </strong>{department_title}</p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };
  
  export default ArtContent;