import React, { useState } from 'react'
import ReviewForm from './ReviewForm'
import ArtReviews from './ArtReviews'

const GalleryContent = ({art, galleryInfo}) => {
  const [reviews, setReviews] = useState(galleryInfo.reviews)

  return (
    <>
        <ReviewForm art={art} reviews={reviews} setReviews={setReviews} bookmarked={galleryInfo.isBookmarked}/>
        <ArtReviews reviews={reviews} />
    </>
  )
}

export default GalleryContent