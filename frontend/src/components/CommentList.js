import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { FaUserCircle } from 'react-icons/fa';

const CommentList = ({ comments }) => {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3 mb-2">
            <FaUserCircle className="text-gray-400 text-2xl" />
            <div>
              <h4 className="font-semibold text-sm">{comment.author}</h4>
              <p className="text-xs text-gray-500">
                {format(new Date(comment.created_at), 'MMM d, yyyy HH:mm')}
              </p>
            </div>
          </div>
          <p className="text-gray-700 text-sm">{comment.content}</p>
        </div>
      ))}
    </div>
  );
};

CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      author: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CommentList;
