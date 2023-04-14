import React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import './RightSide.css';

const UserCard = ({ user }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/profile/${user.username}`);
  };

  return (
    <Card className="user-card" onClick={handleClick}>
      <Card.Body>
        <Card.Title>{user.username}</Card.Title>
        <Card.Text>
          <strong>About:</strong> {user.aboutMe}
        </Card.Text>
        <Card.Text>
          <strong>Favorite Art Style:</strong> {user.favoriteArtStyle}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default UserCard;
