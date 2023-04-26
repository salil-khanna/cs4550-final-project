import './HomePage.css';
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from 'axios';
import { Card, Row, Col, Spinner } from 'react-bootstrap';
import { Rating } from '@mui/material';
import { useNavigate } from 'react-router';
import { useMediaQuery } from 'react-responsive';
import { toast } from 'react-toastify';
import AppContext from '../AppContext';

const RecentReviews = ({dropdownOpen}) => {
  const [recentReviews, setRecentReviews] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const isMedium = useMediaQuery({ query: '(min-width: 768px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 575px)' });

  useEffect(() => {
    const fetchRecentReviews = async () => {
      try {
        const response = await axios.get(`${AppContext.link}/reviews/`);
        const evenReviews = response.data.slice(0, response.data.length - (response.data.length % 2));
        setRecentReviews(evenReviews);
        setLoading(false);
      } catch (error) {
        toast.error('Error fetching recent reviews:', error);
      }
    };

    fetchRecentReviews();
  }, []);

    if (loading) { 
        return (
           <div className="mt-2">
              <Spinner animation="border" />
            </div>
          );
    }

  const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

//   only chunkArray on screen sizes medium and above

    const reviewPairs = isMedium ? chunkArray(recentReviews, 2) : chunkArray(recentReviews, 1);

  if (recentReviews.length === 0) {
    return <div>No recent reviews to display!</div>;
  }

  if (!dropdownOpen)  {
    return;
  }

  return (
    <Carousel autoPlay interval={3000} infiniteLoop showStatus={true} showThumbs={false} showIndicators={true} useKeyboardArrows={true}>
      {reviewPairs.map((pair, index) => (
        <div key={index}>
          <Row className="ms-3 me-3 mt-2">
            {pair.map((review) => (
              <Col key={review.review_id} md={6}>
                <Card className="user-review-card" onClick={() => navigate(`/art/${review.art_id}`)}>
                  <Row className="g-0">
                    <Col xs={5}>
                      <Card.Img className="user-review-image ms-2 rounded mb-2" variant="top" src={review.art.image_url} />
                    </Col>
                    <Col xs={7}>
                      <Card.Body>
                        <Card.Title>
                          { isMobile ?
                            (review.art.image_title.length > 25 ? review.art.image_title.slice(0,25) + "..." : review.art.image_title)
                          :
                          review.art.image_title
                          }
                          
                          </Card.Title>
                        <Card.Text className="remove-margin-card-text">
                          <strong>Username: </strong>
                          <div>{review.username}</div>
                        </Card.Text>
                        <Card.Text className="remove-margin-card-text">
                          <strong>Date Reviewed: </strong>
                          <div>{review.date_time}</div>
                        </Card.Text>
                        <Card.Text className="remove-margin-card-text">
                          <strong>Rating:</strong>
                          <div>
                            <Rating name="read-only" value={review.rating} readOnly />
                          </div>
                        </Card.Text>
                        {review.review.length > 0 && (
                          <Card.Text>
                            <strong>Review:</strong>
                            <div>{review.review}</div>
                          </Card.Text>
                        )}
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </Carousel>
  );
};

export default RecentReviews;
