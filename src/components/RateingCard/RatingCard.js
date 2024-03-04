import React from 'react'
import Rating from '@mui/material/Rating';
import "../css/ratingCard.css"
const RatingCard = ({rating,name,describe}) => {
  return (
    <div className='ratingCard'>
        <p><b>{name}</b></p>
        <Rating name="half-rating-read" defaultValue={4.5} precision={rating} readOnly />
        <div className='describe'>
            <p>
                {describe}
            </p>
        </div>
    </div>
  )
}

export default RatingCard