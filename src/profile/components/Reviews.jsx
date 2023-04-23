import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewCard from '../../utils/ReviewCard';
import { toast } from 'react-toastify';
import DisplayThree from '../../utils/DisplayThree';
import AppContext from '../../AppContext';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // get user_id and username from storage
  const user_id = localStorage.getItem('user_id');
  const username = localStorage.getItem('user');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${AppContext.link}/reviews/random/${user_id}/${username}`);
        const fixedData = response.data.map((review) => {
            review.key = review.review_id;
            return review;
          });

          setReviews(fixedData);
        setIsLoading(false);
      } catch (error) {
        toast.error('Error fetching reviews...');
      }
    };

    fetchUsers();
  }, [user_id, username]);
  

  return (
    <DisplayThree title="Reviews" data={reviews} CardComponent={ReviewCard} isLoading={isLoading}/>
  );
};

export default Reviews;
