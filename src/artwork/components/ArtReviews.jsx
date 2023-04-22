import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import ReviewCard from './ReviewCard';
import { Rating } from '@mui/material';

const ArtReviews = ({ reviews, averageRating }) => {
  const [numReviewsShown, setNumReviewsShown] = useState(4)
  const [displayedReviews, setDisplayedReviews] = useState([]); 

  const loadMoreReviews = () => {
    const newIndex = displayedReviews.length + 3;
    setNumReviewsShown(newIndex);
    setDisplayedReviews(reviews.slice(0, newIndex));
  };

  useEffect(() => {
    setDisplayedReviews(reviews.slice(0, numReviewsShown));
    }, [reviews, numReviewsShown, setDisplayedReviews]);

  if (reviews.length === 0) {
    return (
        <div className="text-center mt-3">
          <p className="mb-0"><strong className="h4">Be the first to review!</strong></p>
        </div>
      );
  }

  return (
    <div>
      <div className="text-center mt-3">
          <p className="mb-0"><strong className="h4">Average Rating:</strong></p>
            <Rating value={averageRating} precision={0.5} readOnly />
        </div>
      {displayedReviews.map((review) => (
        <ReviewCard key={review.review_id} review={review} />
      ))}
      {reviews.length > displayedReviews.length && (
        <Button onClick={loadMoreReviews}>See more</Button>
      )}
    </div>
  );
};

export default ArtReviews;
