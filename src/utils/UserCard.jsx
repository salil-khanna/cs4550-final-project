import React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import './DisplayThree.css';

const UserCard = ({ bit }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/profile/${bit.username}`);
  };

  return (
    <Card className="user-card" onClick={handleClick}>
      <Card.Body>
        <Card.Title>{bit.username}</Card.Title>
        <Card.Text>
          <strong>About:</strong> {bit.aboutMe}
        </Card.Text>
        <Card.Text>
          <strong>Favorite Art Style:</strong> {bit.favoriteArtStyle}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default UserCard;
