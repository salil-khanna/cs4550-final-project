import React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { Rating } from '@mui/material';
import './DisplayThree.css';

const ReviewCard = ({ bit, cutOff }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/art/${bit.art_id}`);
  };

  const splitTitle = (title, maxLength) => {
    if (title.length <= maxLength) {
      return <>{title}</>;
    }
  
    const words = title.split(' ');
    let firstLine = '';
    let currentLength = 0;
  
    for (const word of words) {
      if (currentLength + word.length <= cutOff) {
        firstLine += `${word} `;
        currentLength += word.length + 1;
      } else {
        break;
      }
    }
  
    const remainingTitle = title.slice(currentLength).trim();
    const secondLine = remainingTitle.length > 16 ? `${remainingTitle.slice(0, 16)}...` : remainingTitle;
  
    return (
      <>
        <p className="remove-margin-title">{firstLine.trim()}</p>
        <p>{secondLine}</p>
      </>
    );
  };
   

  return (
    <Card className="display-three-card text-center m-2" onClick={handleClick}>
      <Card.Body>
        <Card.Img
          className="mx-auto d-block img-fluid"
          variant="top"
          src={bit.art.image_url}
          alt={bit.art.image_title}
        />
        <div className="title-container">
        <Card.Title className="mt-2">
            <div>
                {splitTitle(bit.art.image_title, cutOff)}
            </div>
        </Card.Title>

        </div>
        <Card.Text className="remove-margin-title">
            <strong>Rating:</strong>
            <div>
                <Rating value={bit.rating} precision={0.5} readOnly />
            </div>
        </Card.Text>
        <Card.Text>
            <strong>Date:</strong> {bit.date_time}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ReviewCard;
