import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import api from '../services/api';

const LikeUnlikeButton = ({ postId, initialLikes }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async () => {
    try {
      const response = await api.post(`/blog/posts/${postId}/like/`);
      setLikes(response.data.likes);
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <button 
      onClick={handleLike} 
      className={`flex items-center space-x-1 text-sm font-medium ${
        isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
      } transition duration-300`}
    >
      {isLiked ? <FaHeart /> : <FaRegHeart />}
      <span>{likes}</span>
    </button>
  );
};

LikeUnlikeButton.propTypes = {
  postId: PropTypes.number.isRequired,
  initialLikes: PropTypes.number.isRequired,
};

export default LikeUnlikeButton;
