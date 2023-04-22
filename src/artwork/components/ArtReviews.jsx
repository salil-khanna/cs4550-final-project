import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import ReviewCard from './ReviewCard';

const ArtReviews = ({ reviews }) => {
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
    return <p>Be the first to review!</p>;
  }

  return (
    <div>
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
