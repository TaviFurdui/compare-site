import React from 'react';
import './RatingStars.css';

const RatingStars = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  const renderStar = (star, index) => {
    const filledClass = star <= rating ? 'filled' : '';
    const halfFilledClass = star - 0.5 <= rating && rating < star ? 'half-filled' : '';

    return (
      <span key={index} className={`${filledClass} ${halfFilledClass}`}>
        &#9733;
      </span>
    );
  };

  return <div className="rating-stars">{stars.map((star, index) => renderStar(star, index))}</div>;
};

export default RatingStars;