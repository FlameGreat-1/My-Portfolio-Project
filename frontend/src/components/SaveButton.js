import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import api from '../services/api';

const SaveUnsaveButton = ({ postId, initialSaved }) => {
  const [isSaved, setIsSaved] = useState(initialSaved);

  const handleSave = async () => {
    try {
      const response = await api.post(`/blog/posts/${postId}/save/`);
      setIsSaved(response.data.saved);
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  return (
    <button 
      onClick={handleSave} 
      className={`flex items-center space-x-1 text-sm font-medium ${
        isSaved ? 'text-blue-500' : 'text-gray-500 hover:text-blue-500'
      } transition duration-300`}
    >
      {isSaved ? <FaBookmark /> : <FaRegBookmark />}
      <span>{isSaved ? 'Saved' : 'Save'}</span>
    </button>
  );
};

SaveUnsaveButton.propTypes = {
  postId: PropTypes.number.isRequired,
  initialSaved: PropTypes.bool.isRequired,
};

export default SaveUnsaveButton;
