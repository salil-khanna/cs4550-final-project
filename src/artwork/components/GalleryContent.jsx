import React, { useState } from 'react'
import ReviewForm from './ReviewForm'
import ArtReviews from './ArtReviews'

const GalleryContent = ({art, galleryInfo}) => {
  const [reviews, setReviews] = useState(galleryInfo.reviews)
  const [averageRating, setAverageRating] = useState(galleryInfo.averageRating)

  return (
    <>
        <ReviewForm art={art} reviews={reviews} setReviews={setReviews} bookmarked={galleryInfo.isBookmarked} setAverageRating={setAverageRating}
        />
        <ArtReviews reviews={reviews} setReviews={setReviews} averageRating={averageRating} artId={art.art_info.id}/>
    </>
  )
}

export default GalleryContent