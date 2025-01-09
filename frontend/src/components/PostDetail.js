import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import PollList from './PollList';
import ChallengeForm from './ChallengeForm';
import CodeSnippet from './CodeSnippet';
import ResourceList from './ResourceList';
import LikeUnlikeButton from './LikeButton';
import SaveUnsaveButton from './SaveButton';
import PostRating from './PostRating';
import GuestPostRequestForm from './GuestPostRequestForm';

const PostDetail = ({ post }) => {
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [showGuestPostForm, setShowGuestPostForm] = useState(false);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden max-w-4xl mx-auto">
      <img 
        src={post.image_url || '/img/default-post-image.jpg'} 
        alt={post.title} 
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
          <time dateTime={post.publish}>{new Date(post.publish).toLocaleDateString()}</time>
          <span>{post.author}</span>
        </div>
        <div 
          className="prose max-w-none mb-6" 
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span key={tag} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="flex justify-between items-center mb-6">
          <LikeUnlikeButton postId={post.id} initialLikes={post.likes_count} />
          <SaveUnsaveButton postId={post.id} initialSaved={post.is_saved} />
        </div>
        <div className="mb-6">
          <PostRating postId={post.id} initialRating={post.rating} />
        </div>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Code Snippets</h2>
          <CodeSnippet postId={post.id} />
        </div>
        {post.resources && post.resources.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Resources</h2>
            <ResourceList resources={post.resources} />
          </div>
        )}
        {post.polls && post.polls.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Polls</h2>
            <PollList polls={post.polls} />
          </div>
        )}
        {post.challenges && post.challenges.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Challenges</h2>
            {post.challenges.map((challenge) => (
              <ChallengeForm key={challenge.id} challenge={challenge} />
            ))}
          </div>
        )}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Comments</h2>
          {post.comments && post.comments.length > 0 ? (
            <CommentList comments={post.comments} />
          ) : (
            <p className="text-gray-600">No comments yet. Be the first to comment!</p>
          )}
          <button
            onClick={() => setShowCommentForm(!showCommentForm)}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            {showCommentForm ? 'Cancel' : 'Add a Comment'}
          </button>
          {showCommentForm && <CommentForm postId={post.id} />}
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Submit a Guest Post</h2>
          <button
            onClick={() => setShowGuestPostForm(!showGuestPostForm)}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            {showGuestPostForm ? 'Cancel' : 'Submit Guest Post Request'}
          </button>
          {showGuestPostForm && <GuestPostRequestForm />}
        </div>
      </div>
    </article>
  );
};

PostDetail.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    image_url: PropTypes.string,
    publish: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    resources: PropTypes.arrayOf(PropTypes.object),
    polls: PropTypes.arrayOf(PropTypes.object),
    challenges: PropTypes.arrayOf(PropTypes.object),
    comments: PropTypes.arrayOf(PropTypes.object),
    likes_count: PropTypes.number,
    is_saved: PropTypes.bool,
    rating: PropTypes.number,
  }),
};

export default PostDetail;
