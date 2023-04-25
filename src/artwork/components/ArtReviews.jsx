import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import ReviewCard from './ReviewCard';
import { Rating } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';
import AppContext from '../../AppContext';

const ArtReviews = ({ reviews, averageRating, artId, setReviews, setAverageRating }) => {
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


  const isMod = localStorage.getItem('isMod') === 'true';
  const user_id = localStorage.getItem('user_id')

  // write a function called delete review which calls the endpoint to delete a review, takes in the review_id and art_id
  const deleteReview = async (review_id, rating) => {
    if (!isMod) {
      toast.error('You are not authorized to delete reviews!');
      return;
    }

    try {
      const response = await axios.delete(`${AppContext.link}/reviews/mod`, {
        data: {
          review_id,
          art_id: artId,
          user_id
        },
      });
      if (response.status === 200) {
        toast.success('Review deleted!');
        setReviews(reviews.filter((review) => review.review_id !== review_id));
        setNumReviewsShown(numReviewsShown - 1);
        // setAverageRating to the new average rating after deleting the review, account for when there is only 1 review left
        if (reviews.length === 0) {
          setAverageRating(0);
        } else {
          setAverageRating((averageRating * reviews.length - rating) / (reviews.length - 1));
        }
      } else {
        toast.error('Error with deleting review...');
      }
    } catch (error) {
      toast.error('Error with deleting review...');
    }
  };

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
        <ReviewCard key={review.review_id} review={review} isMod={isMod} deleteReview={deleteReview}/>
      ))}
      {reviews.length > displayedReviews.length && (
        <Button onClick={loadMoreReviews}>See more</Button>
      )}
    </div>
  );
};

export default ArtReviews;
