import React from 'react';
import { ListGroupItem, ListGroup, Card } from 'react-bootstrap';
import { Rating } from '@mui/material';

const ReviewCard = ({ review }) => {
  const { username, review: text, rating } = review;

  return (
    <ListGroup as={Card} className="review-card mt-2">
      <ListGroupItem>{username}</ListGroupItem>
      <ListGroupItem>{text}</ListGroupItem>
      <ListGroupItem>
        <Rating value={rating} precision={0.5} readOnly />
      </ListGroupItem>
    </ListGroup>
  );
};

export default ReviewCard;
