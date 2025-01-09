import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createComment } from '../services/api';
import { FaPaperPlane } from 'react-icons/fa';

const CommentForm = ({ postId, onCommentAdded }) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const newComment = await createComment(postId, { content: content.trim() });
      setContent('');
      if (onCommentAdded) {
        onCommentAdded(newComment);
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      setError('Failed to submit comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <div className="relative">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows="3"
          className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          placeholder="Write a comment..."
          disabled={isSubmitting}
        ></textarea>
        <button
          type="submit"
          className="absolute right-2 bottom-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 disabled:opacity-50 transition duration-300 ease-in-out"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            'Posting...'
          ) : (
            <>
              <FaPaperPlane className="inline-block mr-1" /> Post
            </>
          )}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </form>
  );
};

CommentForm.propTypes = {
  postId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onCommentAdded: PropTypes.func,
};

export default CommentForm;
