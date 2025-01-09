import React, { useState, useEffect } from 'react';
import api from '../services/api';

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const response = await api.get(`/blog/posts/${postId}/comments/`);
      setComments(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load comments. Please try again.');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`/blog/posts/${postId}/comments/`, { content: newComment });
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (err) {
      setError('Failed to post comment. Please try again.');
    }
  };

  if (loading) return <div>Loading comments...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="comment-section">
      <h3>Comments</h3>
      {comments.map(comment => (
        <div key={comment.id} className="comment">
          <p>{comment.content}</p>
          <small>By {comment.author} on {new Date(comment.created_at).toLocaleString()}</small>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <textarea 
          value={newComment} 
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          required
        ></textarea>
        <button type="submit">Post Comment</button>
      </form>
    </div>
  );
};

export default CommentSection;
