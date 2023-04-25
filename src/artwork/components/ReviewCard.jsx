import React from 'react';
import { ListGroupItem, ListGroup, Card, Row, Col } from 'react-bootstrap';
import { Rating } from '@mui/material';
import './Art.css'

const ReviewCard = ({ review, isMod, deleteReview }) => {
  const { username, review: text, rating, date_time } = review;

  const isOwnReview = username === localStorage.getItem('user');
  const year = date_time.split('/')[2];
  const currentYear = new Date().getFullYear();
  const yearDisplay = currentYear.toString().slice(0, 2) === year.slice(0, 2) ? year.slice(2, 4) : year;
  const date_timeDisplay = date_time.split('/').slice(0, 2).join('/') + '/' + yearDisplay;

  const renderText = () => {
    const lines = text.split('\n');
    return lines.map((line, index) => {
      if (line.trim() === '') {
        return <br key={index} />;
      } else {
        return (
          <p key={index} className="mb-0">
            {line}
          </p>
        );
      }
    });
  };
  

  return (
    <ListGroup as={Card} className="review-card mt-2">
      <ListGroupItem>
        <Row className="align-items-center justify-content-between">
            <Col xs="auto">
                <strong>
                <a
                    href={`/profile/${username}`}
                    className="username-link"
                >
                    {username}
                    {isOwnReview && ' (you)'}
                </a>
                </strong>
            </Col>
            <Col xs="auto" className="text-right">
                <div>{date_timeDisplay}</div>
            </Col>
        </Row>
        </ListGroupItem>
      {text.length !== 0 && <ListGroupItem><strong>Review:</strong> {renderText()}</ListGroupItem> }
      <ListGroupItem>
        <strong>Rating:</strong>
        <Col className="d-flex align-items-center pl-0">
          <Rating value={rating} precision={0.5} readOnly />
        </Col>
      </ListGroupItem>
      {isMod && !isOwnReview && (
        <ListGroupItem>
          <Row className="justify-content-end">
            <Col xs="auto">
              <button
                className="btn btn-danger"
                onClick={() => deleteReview(review.review_id)}
              >
                Delete User Review
              </button>
            </Col>
          </Row>
        </ListGroupItem>
      )}

    </ListGroup>
  );
};

export default ReviewCard;
