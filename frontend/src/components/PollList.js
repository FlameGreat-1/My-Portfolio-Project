import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LikeUnlikeButton from './LikeButton';
import SaveUnsaveButton from './SaveButton';
import PostRating from './PostRating';

const PostList = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600 text-xl">No posts available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
          <Link to={`/post/${post.slug}`}>
            <img
              src={post.image || '/img/default-post-image.jpg'}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
          </Link>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">
              <Link to={`/post/${post.slug}`} className="text-blue-600 hover:text-blue-800 transition-colors duration-300">
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-600 mb-2 line-clamp-3">
              {post.content ? post.content.substring(0, 150) : 'No content available'}...
            </p>
            <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
              <time dateTime={post.date_posted}>
                {post.date_posted ? new Date(post.date_posted).toLocaleDateString() : 'Date not available'}
              </time>
              <span>{post.author || 'Unknown author'}</span>
            </div>
            {post.tags && post.tags.length > 0 && (
              <div className="mb-2 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="flex justify-between items-center mt-2">
              <LikeUnlikeButton postId={post.id} initialLikes={post.likes_count} />
              <SaveUnsaveButton postId={post.id} initialSaved={post.is_saved} />
            </div>
            <div className="mt-2">
              <PostRating postId={post.id} initialRating={post.rating} />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string,
      image: PropTypes.string,
      date_posted: PropTypes.string,
      author: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
      likes_count: PropTypes.number,
      is_saved: PropTypes.bool,
      rating: PropTypes.number,
    })
  ).isRequired,
};

export default PostList;
