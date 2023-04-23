import React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import './DisplayThree.css';
import { Rating } from '@mui/material';

const UserCard = ({ bit }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/profile/${bit.username}`);
  };

  return (
    <Card className="display-three-card m-2" onClick={handleClick}>
      <Card.Body>
        <Card.Title>{bit.username}</Card.Title>
        <div className="mt-3">
          <p className="mb-0"><strong>Average Rating Given:</strong></p>
            <Rating value={bit.averageRating} precision={0.5} readOnly />
        </div>
        <Card.Text>
          <strong>Favorite Art Style:</strong> {bit.favoriteArtStyle}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default UserCard;
