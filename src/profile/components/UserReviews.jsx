import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Spinner, Row, Col, Container, Card, Button } from 'react-bootstrap';
import { Rating } from '@mui/material';
import './Profile.css'
import AppContext from '../../AppContext';

const UserReviews = ({ username }) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [displayedReviewsCount, setCount] = useState(3);
  const incrementDisplayedReviewsCount = () => setCount(displayedReviewsCount + 3);

  const isMod = localStorage.getItem('isMod') === 'true';
  const user_id = localStorage.getItem('user_id')

  // write a function called delete review which calls the endpoint to delete a review, takes in the review_id and art_id
  const deleteReview = async (review_id, art_id) => {
    if (!isMod) {
      toast.error('You are not authorized to delete reviews!');
      return;
    }
    
    try {
      const response = await axios.delete(`${AppContext.link}/reviews/mod`, {
        data: {
          review_id,
          art_id,
          user_id
        },
      });
      if (response.status === 200) {
        toast.success('Review deleted!');
        setReviews(reviews.filter((review) => review.review_id !== review_id));
        setCount(displayedReviewsCount - 1);
      } else {
        toast.error('Error with deleting review...');
      }
    } catch (error) {
      toast.error('Error with deleting review...');
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${AppContext.link}/reviews/${username}`);
        setReviews(response.data.consolidatedData);
        setAverageRating(response.data.averageRating);
        setIsLoading(false);
      } catch (error) {
        toast.error('Error with fetching reviews...');
      }
    };

    fetchProfileData();
  }, [username]);

  const displayedReviews = reviews.slice(0, displayedReviewsCount);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container className="mt-2">
      <Row>
        <Col xs={12} className="text-center">
          <h3>Reviews</h3>
        </Col>
      </Row>
      {displayedReviews.length === 0 ? 
        <Row>

          <Col xs={12} className="text-center">
            <h5>No art reviewed yet!</h5>
          </Col>
        </Row>
      : 
       <><Row>
          <Col xs={12} className="text-center">
            <h4>Average Rating:</h4>
            <Rating name="read-only" value={averageRating} readOnly />
          </Col>
        </Row><Row>
            {displayedReviews.map((review) => (
              <Col key={review.review_id} xs={12} md={4} className="mb-4">
                <Card className="user-review-card" onClick={() => navigate(`/art/${review.art_id}`)}>
                  <Card.Img className="user-review-image rounded" variant="top" src={review.art.image_url} />
                  <Card.Body>
                    <Card.Title>{review.art.image_title}</Card.Title>
                    <Card.Text className="remove-margin-card-text">
                      <strong>Date Reviewed: </strong>
                      <div>
                        {review.date_time}
                      </div>
                    </Card.Text>
                    {review.review.length > 0 && <Card.Text className="remove-margin-card-text">
                      <strong>Review:</strong>
                      <div>
                        {review.review}
                      </div>
                    </Card.Text>}
                    <Card.Text>
                      <strong>Rating:</strong>
                      <div>
                        <Rating name="read-only" value={review.rating} readOnly />
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
                {isMod && (
                  <div className="text-center">
                      <Button variant="danger" onClick={() => deleteReview(review.review_id, review.art_id)} >
                        Delete User Review
                      </Button>
                      </div>
                    )}
              </Col>
            ))}
          </Row></> }
      {reviews.length > displayedReviews.length && (
        <Row>
          <Col className="text-center">
            <Button onClick={incrementDisplayedReviewsCount}>See More Reviews</Button>
          </Col>
        </Row>
      )} 
    </Container>
  );
};

export default UserReviews;
