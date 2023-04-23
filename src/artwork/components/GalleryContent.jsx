import React, { useState } from 'react'
import ReviewForm from './ReviewForm'
import ArtReviews from './ArtReviews'

const GalleryContent = ({art, galleryInfo}) => {
  const [reviews, setReviews] = useState(galleryInfo.reviews)
  const [averageRating, setAverageRating] = useState(galleryInfo.averageRating)

  return (
    <>
        <ReviewForm art={art} reviews={reviews} setReviews={setReviews} bookmarked={galleryInfo.isBookmarked}
        averageRating={averageRating} setAverageRating={setAverageRating}
        />
        <ArtReviews reviews={reviews} averageRating={averageRating}/>
    </>
  )
}

export default GalleryContent