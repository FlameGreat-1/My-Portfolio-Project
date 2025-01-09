import React, { useState } from 'react';
import api from '../services/api';

const RatingComponent = ({ postId, initialRating }) => {
  const [rating, setRating] = useState(initialRating);

  const handleRating = async (newRating) => {
    try {
      const response = await api.post(`/blog/posts/${postId}/rate/`, { rating: newRating });
      setRating(response.data.new_rating);
    } catch (error) {
      console.error('Error rating post:', error);
    }
  };

  return (
    <div className="rating-component">
      <p>Current Rating: {rating.toFixed(1)}</p>
      {[1, 2, 3, 4, 5].map((star) => (
        <button key={star} onClick={() => handleRating(star)}>
          {star} ★
        </button>
      ))}
    </div>
  );
};

export default RatingComponent;
