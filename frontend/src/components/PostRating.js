import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa';
import { ratePost } from '../services/api';

const PostRating = ({ postId, initialRating }) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(null);
  const [hasRated, setHasRated] = useState(false);

  const handleRating = async (ratingValue) => {
    if (hasRated) return;

    try {
      const response = await ratePost(postId, ratingValue);
      setRating(response.data.new_rating);
      setHasRated(true);
    } catch (error) {
      console.error('Error rating post:', error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex">
        {[...Array(5)].map((star, i) => {
          const ratingValue = i + 1;
          return (
            <label key={i}>
              <input
                type="radio"
                name="rating"
                className="hidden"
                value={ratingValue}
                onClick={() => handleRating(ratingValue)}
              />
              <FaStar
                className="cursor-pointer transition duration-200 ease-in-out"
                color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                size={24}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          );
        })}
      </div>
      <p className="text-sm text-gray-600 mt-1">
        {hasRated ? 'Thank you for rating!' : 'Rate this post'}
      </p>
    </div>
  );
};

PostRating.propTypes = {
  postId: PropTypes.number.isRequired,
  initialRating: PropTypes.number.isRequired,
};

export default PostRating;
