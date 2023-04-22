import React, { useState } from 'react';
import { Modal, Button, Form, Card, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as faBookmarkFilled } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faBookmarkRegular } from '@fortawesome/free-regular-svg-icons';
import { Rating } from '@mui/material/';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import './Art.css'


const ReviewForm = ({ art, reviews, setReviews, bookmarked, averageRating, setAverageRating }) => {
    const user_id = localStorage.getItem('user_id') || '';
    const username = localStorage.getItem('user') || '';

    // filter through reviews to see if the user has already reviewed the artwork
    const userReview = reviews.filter((review) => review.username === username);
    const userRating = userReview.length ? userReview[0].rating : 0;
    const userReviewText = userReview.length ? userReview[0].review : '';
    const titleDisplay = userReviewText ? 'Edit' : 'Write';
    const [titleDisplayState, setTitleDisplayState] = useState(titleDisplay);
    const [modalText, setModalText] = useState('review');
    const buttonDisplay = userReviewText ? 'Update' : 'Submit';
    const [buttonDisplayState, setButtonDisplayState] = useState(buttonDisplay);

    const {
        art_info: {
          id,
          title,
          image_id,
        },
        image_url,
      } = art;

  const [showModal, setShowModal] = useState(false);
  const [reviewText, setReviewText] = useState(userReviewText);
  const [rating, setRating] = useState(userRating);
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);


  const toastId = React.useRef(null);
  const notify = () => toastId.current = toast.error("Please add a rating...");
  const updateToast = () => toast.update(toastId.current);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user_id) {
      setModalText('review')
      handleShow();
      return;
    }

    if (!rating) {
        if (!toast.isActive(toastId.current)) {
            notify();
        } else {
            updateToast();
        }
        return;
    }

    try {
        // get the date and time, format it like "HH:MM MM/DD/YYYY"
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();
        // if hours > 12, subtract 12 from hours and add PM to the end otherwise AM
        const time = `${hours > 12 ? hours - 12 : hours}:${minutes} ${hours > 12 ? 'pm' : 'am'} ${month}/${day}/${year}`;


      const review = {
        art_id: id,
        user_id,
        username,
        review: reviewText,
        rating,
        image_url: `${image_url}/${image_id}/full/320,/0/default.jpg`,
        image_title: title,
        date_time: time,
      }
      await axios.post('http://localhost:8080/reviews/', review);
    // useSet reviews to update the reviews state, removing the old review and adding the new one if there is any old review
        setReviews((prevReviews) => {
            const newReviews = prevReviews.filter((prevReview) => prevReview.username !== username);
            return [review, ...newReviews];
        });
        // update the average rating, account for if the user already had a review
        if (userReview.length) {
            setAverageRating((prevRating) => {
                return (prevRating * reviews.length - userRating + rating) / reviews.length;
            });
        } else {
            setAverageRating((prevRating) => {
                return (prevRating * reviews.length + rating) / (reviews.length + 1);
            });
        }

        setTitleDisplayState('Edit');
        setButtonDisplayState('Update');
        toast.dismiss();
    } catch (error) {
      toast.error('Error with server. Please try again later.');
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!user_id) {
      setModalText('review')
      handleShow();
      return;
    }

    if (rating === 0) {
      toast.error("No review to delete...");
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/reviews/`, {
        data: {
          art_id: id,
          user_id,
          username,
        },
      });

      setReviews((prevReviews) => {
        const newReviews = prevReviews.filter((prevReview) => prevReview.username !== username);
        return newReviews;
      });

      setAverageRating((prevRating) => {
        return (prevRating * reviews.length - rating) / (reviews.length - 1);
      });

      setTitleDisplayState('Write');
      setButtonDisplayState('Submit');
      setReviewText('');
      setRating(0);
    } catch (error) {
      toast.error('Error with server. Please try again later.');
    }
  };

  const handleBookmark = async () => {
    if (!user_id) {
      setModalText('bookmark')
      handleShow();
      return;
    }

    if (!isBookmarked) {
        try {
        await axios.post('http://localhost:8080/bookmarks/', {
            art_id: id,
            user_id,
            username,
            image_url: `${image_url}/${image_id}/full/320,/0/default.jpg`,
            image_title: title,
        });
        setIsBookmarked(!isBookmarked);
        } catch (error) {
        toast.error('Error with server. Please try again later.');
        }
    } else {
        try {
        await axios.delete(`http://localhost:8080/bookmarks/`, {
            data: {
                art_id: id,
                user_id,
                username,
            },
        });
        setIsBookmarked(!isBookmarked);
        } catch (error) {
        toast.error('Error with server. Please try again later.');
        }
    }
  };

  return (
    <>
      <Card className="review-form mt-4">
        <Row className="ms-2 me-2">
          <Form onSubmit={handleSubmit}>
          <Form.Group controlId="reviewText">
            <Row className="align-items-center heading-row mt-3">
                <Col className="review-label ">
                {titleDisplayState} your review:
                </Col>
                <Col className="d-flex justify-content-end">
                {titleDisplayState === "Edit" && <Button
                    variant="danger"
                    onClick={handleDelete}
                >
                    Delete Review
                </Button> }
                </Col>
            </Row>
            <Form.Label/>
              <Form.Control
                as="textarea"
                rows={3}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                onClick={() => {
                  if (!user_id) {
                    setModalText('review')
                    setShowModal(true);
                  }
                }}
                placeholder="Leave a review!"
              />
            </Form.Group>
          </Form>
        </Row>
        <Row className="rating-row ms-2 me-2 mb-2 mt-2">
          <Col className="d-flex justify-content-start">
          <FontAwesomeIcon
              icon={isBookmarked ? faBookmarkFilled : faBookmarkRegular}
              onClick={handleBookmark}
              className="bookmark-icon"
            />
          </Col>
          <Col className="d-flex justify-content-center">
            <Rating
              value={rating}
              onChange={(event, newValue) => {
                if (!user_id) {
                  setModalText('rate')
                  setShowModal(true);
                  return;
                }
                setRating(newValue);
              }}
              size="large"
            />
          </Col>
          <Col className="d-flex justify-content-end">
            <Button variant="primary" onClick={handleSubmit}>
              {buttonDisplayState}
            </Button>
          </Col>
        </Row>
      </Card>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Log In or Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Please log in or register to {modalText} art!
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            
            <Button
                variant="primary"
                onClick={() => {
                    handleClose();
                    navigate('/login', { state: { from: location } })
                }}
            >
                Log In
            </Button>
            <Button
                variant="primary"
                onClick={() => {
                    handleClose();
                    navigate('/register', { state: { from: location } })
                }}
            >
                Register
            </Button>
        </Modal.Footer>
      </Modal>
    </>
    );
};

export default ReviewForm;
