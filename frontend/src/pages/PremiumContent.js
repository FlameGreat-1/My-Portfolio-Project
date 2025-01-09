
import React, { useState, useEffect } from 'react';
import { getPremiumContent } from '../services/api';


const PremiumContent = () => {
  const [premiumPosts, setPremiumPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPremiumContent = async () => {
      try {
        const response = await getPremiumContent();
        setPremiumPosts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load premium content. Please try again.');
        setLoading(false);
      }
    };

    fetchPremiumContent();
  }, []);

  if (loading) return <div>Loading premium content...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="premium-content">
      <h1>Premium Content</h1>
      {premiumPosts.length === 0 ? (
        <p>No premium content available at the moment.</p>
      ) : (
        <div className="premium-posts">
          {premiumPosts.map(post => (
            <div key={post.id} className="premium-post">
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <a href={`/blog/post/${post.slug}`}>Read more</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PremiumContent;
